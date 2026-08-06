/**
 * Compress oversized images in public/ in place (same filenames, so no code
 * changes needed). Safe: auto-orients from EXIF, only downscales, and only
 * overwrites a file if the re-encoded version is actually smaller.
 *
 * Run:  node scripts/optimize-images.mjs
 * Revert everything:  git checkout -- public
 */
import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const MAX_EDGE = 2000;        // cap long edge
const MIN_BYTES = 350 * 1024; // only touch files above this
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (EXTS.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

async function reencode(buf, ext) {
  let img = sharp(buf, { failOn: "none" }).rotate(); // bake EXIF orientation
  const meta = await img.metadata();
  const longEdge = Math.max(meta.width || 0, meta.height || 0);
  if (longEdge > MAX_EDGE) {
    img = img.resize({ width: meta.width >= meta.height ? MAX_EDGE : null, height: meta.height > meta.width ? MAX_EDGE : null, withoutEnlargement: true });
  }
  if (ext === ".png") return img.png({ compressionLevel: 9, effort: 8 }).toBuffer();
  if (ext === ".webp") return img.webp({ quality: 80 }).toBuffer();
  return img.jpeg({ quality: 80, mozjpeg: true }).toBuffer(); // jpg/jpeg
}

const files = await walk(PUBLIC);
let before = 0, after = 0, changed = 0, skipped = 0;

for (const f of files) {
  const orig = await stat(f);
  if (orig.size < MIN_BYTES) continue;
  const ext = path.extname(f).toLowerCase();
  try {
    const out = await reencode(await readFile(f), ext);
    if (out.length < orig.size * 0.95) {
      await writeFile(f, out);
      before += orig.size; after += out.length; changed++;
      console.log(`${(orig.size / 1048576).toFixed(2)}MB -> ${(out.length / 1048576).toFixed(2)}MB  ${path.relative(ROOT, f)}`);
    } else {
      skipped++;
    }
  } catch (e) {
    skipped++;
    console.warn("SKIP", path.relative(ROOT, f), (e.message || "").split("\n")[0]);
  }
}

console.log(`\nOptimized ${changed} files (skipped ${skipped}).`);
console.log(`Total: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB  (saved ${((before - after) / 1048576).toFixed(1)}MB, ${before ? Math.round((1 - after / before) * 100) : 0}%)`);
