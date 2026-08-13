import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile, readFile } from 'fs/promises';
import { loadImage } from 'canvas';

// Option A: one master QR launches WebAR; each booth item uses a printed placard as the tracking target.
const files = [
  'webar/placards/placard-01.svg',
  'webar/placards/placard-02.svg',
  'webar/placards/placard-03-min.svg'
];

const images = [];
for (const file of files) {
  const svg = await readFile(file, 'utf8');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  images.push(await loadImage(dataUri));
}

const compiler = new OfflineCompiler();
await compiler.compileImageTargets(images, (percent) => {
  process.stdout.write(`\rCompiling SEBC product placards: ${Math.round(percent)}%`);
});

const buffer = compiler.exportData();
await writeFile('webar/target.mind', Buffer.from(buffer));
console.log(`\nWrote three-placard webar/target.mind (${buffer.byteLength || buffer.length} bytes)`);
