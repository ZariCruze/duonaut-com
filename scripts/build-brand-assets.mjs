// Jednorazowe generowanie zasobów statycznych marki: public/og.jpg oraz public/favicon.ico.
// Uruchomienie: node scripts/build-brand-assets.mjs
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const p = (rel) => new URL(rel, root);

// ---------- Open Graph 1200 × 630 ----------
const W = 1200;
const H = 630;

const dawn = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FCF2D9"/><stop offset=".26" stop-color="#FBF6EA"/>
      <stop offset=".48" stop-color="#FAF8F3"/><stop offset=".7" stop-color="#F1F7FA"/>
      <stop offset=".88" stop-color="#E2EFF5"/><stop offset="1" stop-color="#D3E8F0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="#F2D79B"/>
  <rect x="120" y="${Math.round(H * 0.58)}" width="${W - 240}" height="1" fill="#083B45" fill-opacity=".22"/>
</svg>`;

const wordmarkSrc = await readFile(p('src/assets/brand/duonaut-wordmark-tagline.min.svg'), 'utf8');
const wordmark = wordmarkSrc.replace('fill="currentColor"', 'fill="#412619"');
// Stała wysokość lockupu (147 px) — szerokość wynika z proporcji logotypu.
const wordmarkH = 147;
const wordmarkPng = await sharp(Buffer.from(wordmark), { density: 300 })
  .resize({ height: wordmarkH })
  .png()
  .toBuffer();
const wordmarkMeta = await sharp(wordmarkPng).metadata();
const wordmarkW = wordmarkMeta.width ?? 0;

const contourH = 150;
const contour = await sharp(await readFile(p('src/assets/sea/sea-contour.jpg')))
  .resize({ width: W, height: contourH, fit: 'cover', position: 'top' })
  .toBuffer();

await sharp(Buffer.from(dawn))
  .composite([
    {
      input: wordmarkPng,
      left: Math.round((W - wordmarkW) / 2),
      top: Math.round(H * 0.58 - 40 - (wordmarkMeta.height ?? 0)),
    },
    { input: contour, left: 0, top: H - contourH },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(p('public/og.jpg').pathname);

// ---------- favicon.ico (PNG w kontenerze ICO, 16 / 32 / 48) ----------
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => readFile(p(`public/favicon-${s}.png`))));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
await writeFile(p('public/favicon.ico'), Buffer.concat([header, ...entries, ...images]));

console.log('og.jpg i favicon.ico gotowe');
