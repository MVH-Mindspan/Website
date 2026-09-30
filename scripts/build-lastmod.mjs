#!/usr/bin/env node
// Writes src/generated/lastmod.json: { "<route>": "YYYY-MM-DD" }, the date of
// the latest commit touching the route's page.tsx, any "@/content/..." module
// it imports (named imports from the "@/content" barrel resolve to the module
// that re-exports them), or any content module those import in turn (e.g.
// pages/medicare.ts -> clinics.ts). Type-only imports are skipped. sitemap.ts
// reads the file.
//
// With no git history (not a repo, git missing, or a shallow clone) it writes
// {} so the sitemap omits lastmod rather than publishing a wrong date.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const APP_DIR = resolve(repo, "src/app");
const CONTENT_DIR = resolve(repo, "src/content");
const OUT = resolve(repo, "src/generated/lastmod.json");

const IMPORT_RE = /import\s+(?:type\s+)?([^;]*?)\s+from\s+["']@\/content(\/[^"']*)?["']/g;
const REEXPORT_RE = /export\s+(?:type\s+)?\{([^}]*)\}\s+from\s+["'](\.[^"']+)["']/g;
// Value imports/re-exports inside a content module: "./x", "../x" or "@/content/x".
const CONTENT_DEP_RE =
  /(?:import|export)\s+(?!type\s)[^;]*?\s+from\s+["']((?:\.{1,2}\/|@\/content\/)[^"']+)["']/g;

// Paths contain "(marketing)" and "[slug]", so pathspecs must be literal.
function git(args) {
  return execFileSync("git", ["--literal-pathspecs", ...args], {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function resolveModule(base) {
  for (const candidate of [`${base}.ts`, join(base, "index.ts")]) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

// "{ a, b as c, type D }" -> ["a", "b", "D"] (side === 0) or ["a", "c", "D"] (side === 1).
function names(list, side) {
  return list
    .split(",")
    .map((s) => s.trim().replace(/^type\s+/, ""))
    .filter(Boolean)
    .map((s) => s.split(/\s+as\s+/)[side] ?? s);
}

function barrelExports(file) {
  const map = new Map();
  for (const [, list, spec] of readFileSync(file, "utf8").matchAll(REEXPORT_RE)) {
    const target = resolveModule(resolve(dirname(file), spec));
    if (target) for (const name of names(list, 1)) map.set(name, target);
  }
  return map;
}

function contentImports(pageFile) {
  const files = new Set();
  for (const [, clause, sub] of readFileSync(pageFile, "utf8").matchAll(IMPORT_RE)) {
    const mod = resolveModule(join(CONTENT_DIR, sub ?? ""));
    if (!mod) continue;
    const braces = clause.match(/\{([^}]*)\}/);
    if (!mod.endsWith("index.ts") || !braces) {
      files.add(mod);
      continue;
    }
    const exported = barrelExports(mod);
    for (const name of names(braces[1], 0)) files.add(exported.get(name) ?? mod);
  }
  return files;
}

function contentDeps(file) {
  const deps = [];
  for (const [, spec] of readFileSync(file, "utf8").matchAll(CONTENT_DEP_RE)) {
    const base = spec.startsWith("@/content/")
      ? join(CONTENT_DIR, spec.slice("@/content/".length))
      : resolve(dirname(file), spec);
    const mod = resolveModule(base);
    if (mod?.startsWith(CONTENT_DIR)) deps.push(mod);
  }
  return deps;
}

// `files` plus every content module they import, directly or indirectly,
// except those in `skip` (which are neither added nor followed).
function withContentDeps(files, skip = new Set()) {
  const seen = new Set(files);
  const queue = [...seen];
  while (queue.length) {
    for (const dep of contentDeps(queue.pop())) {
      if (seen.has(dep) || skip.has(dep)) continue;
      seen.add(dep);
      queue.push(dep);
    }
  }
  return [...seen];
}

// Every static page.tsx under src/app, keyed by route (route groups dropped).
function* staticPages(dir, segments = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isFile() && entry.name === "page.tsx") {
      yield ["/" + segments.join("/"), p];
    } else if (entry.isDirectory() && !entry.name.startsWith("[")) {
      const isGroup = entry.name.startsWith("(");
      yield* staticPages(p, isGroup ? segments : [...segments, entry.name]);
    }
  }
}

function routeSources() {
  const routes = new Map();
  for (const [route, page] of staticPages(APP_DIR)) {
    routes.set(route, withContentDeps([page, ...contentImports(page)]));
  }

  // pages/locationDetail.ts imports every locations/<slug>.ts, so each slug
  // route follows only its own file, not its siblings.
  const slugPage = resolve(APP_DIR, "(marketing)/locations/[slug]/page.tsx");
  const locationFiles = readdirSync(resolve(CONTENT_DIR, "locations"))
    .filter((file) => file.endsWith(".ts"))
    .map((file) => resolve(CONTENT_DIR, "locations", file));
  for (const file of locationFiles) {
    const slug = basename(file, ".ts");
    const siblings = new Set(locationFiles.filter((f) => f !== file));
    routes.set(
      `/locations/${slug}`,
      withContentDeps([slugPage, ...contentImports(slugPage), file], siblings),
    );
  }
  return routes;
}

function hasFullHistory() {
  try {
    return git(["rev-parse", "--is-shallow-repository"]) === "false";
  } catch {
    return false;
  }
}

const lastmod = {};
if (hasFullHistory()) {
  for (const [route, files] of [...routeSources()].sort(([a], [b]) => a.localeCompare(b))) {
    const paths = [...new Set(files)].map((f) => relative(repo, f));
    const date = git(["log", "-1", "--format=%cs", "--", ...paths]);
    if (date) lastmod[route] = date;
  }
} else {
  console.warn("[build-lastmod] No full git history (shallow clone or no git); sitemap will omit lastmod.");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(lastmod, null, 2) + "\n", "utf8");
console.log(`[build-lastmod] Wrote ${Object.keys(lastmod).length} routes → ${OUT}`);
