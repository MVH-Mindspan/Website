#!/usr/bin/env node
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const SOURCE = resolve(repo, ".context/attachments/LogoOnlyBlack@2x.png");
const OUT_ICON = resolve(repo, "src/app/icon.png");
const OUT_APPLE = resolve(repo, "src/app/apple-icon.png");
const OUT_FAVICON = resolve(repo, "src/app/favicon.ico");
const OUT_MARK = resolve(repo, "public/brand/mark.png");

if (!existsSync(SOURCE)) {
  console.error(`Source mark not found: ${SOURCE}`);
  process.exit(1);
}

await mkdir(dirname(OUT_MARK), { recursive: true });
await copyFile(SOURCE, OUT_MARK);

async function squareTransparent(size, padFraction = 0.14) {
  const inner = Math.round(size * (1 - padFraction * 2));
  const inside = await sharp(SOURCE)
    .resize({ width: inner, height: inner, fit: "inside", withoutEnlargement: false })
    .toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: inside, gravity: "center" }])
    .png()
    .toBuffer();
}

const buf512 = await squareTransparent(512);
await writeFile(OUT_ICON, buf512);

const buf180 = await squareTransparent(180);
await writeFile(OUT_APPLE, buf180);

const ico16 = await squareTransparent(16);
const ico32 = await squareTransparent(32);
const ico48 = await squareTransparent(48);

function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirSize = 16 * count;
  const dataOffsetStart = 6 + dirSize;

  let offset = dataOffsetStart;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

const ico = buildIco([
  { size: 16, png: ico16 },
  { size: 32, png: ico32 },
  { size: 48, png: ico48 },
]);
await writeFile(OUT_FAVICON, ico);

console.log(`Wrote:
  ${OUT_ICON} (${buf512.length} bytes)
  ${OUT_APPLE} (${buf180.length} bytes)
  ${OUT_FAVICON} (${ico.length} bytes)
  ${OUT_MARK}`);
