#!/usr/bin/env node
// Submits every URL in the live sitemap, plus the legacy redirect paths, to
// IndexNow (shared by Bing, Yandex, Seznam, Naver and others) so they get
// recrawled promptly. Run after a production deploy: `npm run indexnow`.
// `npm run indexnow -- --dry-run` prints the payload without POSTing.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "mindspan.co";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const dryRun = process.argv.includes("--dry-run");

const HINTS = {
  200: "OK, URLs submitted.",
  202: "Accepted; the key is still being validated.",
  400: "Bad request: invalid payload.",
  403: `Key not valid: is ${ORIGIN}/<key>.txt deployed?`,
  422: "URLs do not belong to the host, or the key does not match.",
  429: "Too many requests; try again later.",
};

// The key file is public/<key>.txt and contains only the key.
function findKey() {
  const dir = resolve(repo, "public");
  for (const file of readdirSync(dir)) {
    const match = file.match(/^([a-zA-Z0-9-]{8,128})\.txt$/);
    if (match && readFileSync(resolve(dir, file), "utf8").trim() === match[1]) {
      return match[1];
    }
  }
  throw new Error("No IndexNow key file in public/ (expected <key>.txt containing the key).");
}

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`GET ${ORIGIN}/sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) =>
    m[1].replaceAll("&amp;", "&"),
  );
}

function legacyUrls() {
  const redirects = JSON.parse(readFileSync(resolve(repo, "legacy-redirects.json"), "utf8"));
  return Object.keys(redirects).map((path) => `${ORIGIN}${path}`);
}

async function main() {
  const key = findKey();
  const urlList = [...new Set([...(await sitemapUrls()), ...legacyUrls()])].filter(
    (u) => new URL(u).host === HOST,
  );
  const payload = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    console.log(`[indexnow] Dry run: ${urlList.length} URLs, nothing sent.`);
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = (await res.text()).trim();
  console.log(`[indexnow] ${res.status} ${HINTS[res.status] ?? res.statusText} (${urlList.length} URLs)`);
  if (body) console.log(body);
  if (!res.ok) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`[indexnow] ${err.message}`);
  process.exitCode = 1;
});
