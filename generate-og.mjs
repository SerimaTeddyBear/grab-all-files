// Regenerate og-image.png (1200x630, used by OGP/Twitter Card).
// Run from repo root:
//   npm install --no-save sharp
//   node generate-og.mjs
//   rm -rf node_modules package.json package-lock.json

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

const logoPng = readFileSync('icon-512.png');
const logoBuf = await sharp(logoPng).resize(220, 220).toBuffer();

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="50%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <g opacity="0.08">
    <circle cx="1050" cy="100" r="180" fill="#fff"/>
    <circle cx="100" cy="540" r="140" fill="#fff"/>
    <circle cx="900" cy="560" r="60" fill="#fcd34d"/>
  </g>

  <rect x="80" y="80" width="240" height="44" rx="22" fill="#fcd34d"/>
  <text x="200" y="110" text-anchor="middle" font-family="-apple-system, 'Segoe UI', sans-serif" font-size="20" font-weight="700" fill="#1e293b">14-day free trial</text>

  <text x="80" y="240" font-family="-apple-system, 'Segoe UI', 'Hiragino Sans', sans-serif" font-size="84" font-weight="800" fill="#fff" filter="url(#shadow)">Grab All Files</text>

  <text x="80" y="295" font-family="-apple-system, 'Segoe UI', 'Hiragino Sans', sans-serif" font-size="34" font-weight="500" fill="#dbeafe">ファイル一括ダウンロード</text>

  <text x="80" y="380" font-family="-apple-system, 'Segoe UI', sans-serif" font-size="28" font-weight="400" fill="#fff">
    <tspan x="80" dy="0">Bulk file downloader for</tspan>
    <tspan x="80" dy="40">Chrome and Edge</tspan>
  </text>

  <g transform="translate(80, 510)">
    <rect width="280" height="56" rx="28" fill="#fff"/>
    <text x="140" y="38" text-anchor="middle" font-family="-apple-system, 'Segoe UI', sans-serif" font-size="22" font-weight="700" fill="#2563eb">$9.99 — Lifetime license</text>
  </g>

  <text x="${W - 80}" y="${H - 40}" text-anchor="end" font-family="-apple-system, 'Segoe UI', sans-serif" font-size="18" font-weight="400" fill="#bfdbfe" opacity="0.85">serimateddybear.github.io/grab-all-files</text>
</svg>`;

const baseBuf = await sharp(Buffer.from(svg))
  .png()
  .toBuffer();

const out = await sharp(baseBuf)
  .composite([{ input: logoBuf, left: W - 220 - 80, top: 200 }])
  .png({ compressionLevel: 9, palette: false })
  .toBuffer();

writeFileSync('og-image.png', out);
console.log('Generated og-image.png:', out.length, 'bytes (' + (out.length / 1024).toFixed(1) + ' KB)');
