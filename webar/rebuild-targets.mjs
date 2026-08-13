import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { readFile, writeFile } from 'fs/promises';
import { loadImage } from 'canvas';

async function loadChunkedJpeg(parts) {
  let b64 = '';
  for (const path of parts) b64 += (await readFile(path, 'utf8')).replace(/\s+/g, '');
  return loadImage(Buffer.from(b64, 'base64'));
}

const clock = await loadChunkedJpeg([
  'webar/actual-targets/clock-0.b64','webar/actual-targets/clock-1.b64','webar/actual-targets/clock-2.b64','webar/actual-targets/clock-3a.b64','webar/actual-targets/clock-3b.b64'
]);
const drum = await loadChunkedJpeg([
  'webar/actual-targets/drum-0.b64','webar/actual-targets/drum-1.b64','webar/actual-targets/drum-2.b64'
]);

// Hammer reconstruction intentionally uses the compact CDBIA-handle target. The
// remaining hammer chunks are added separately, then this file is promoted to
// webar/compile.mjs to trigger the existing GitHub Actions compiler.
const hammerParts = [
  'webar/actual-targets/hammer-tiny-0.b64',
  'webar/actual-targets/hammer-tiny-1a.b64','webar/actual-targets/hammer-tiny-1b.b64','webar/actual-targets/hammer-tiny-1c.b64','webar/actual-targets/hammer-tiny-1d.b64'
];

console.log('Real-photo target loader staged:', clock.width, clock.height, drum.width, drum.height, hammerParts.length);
