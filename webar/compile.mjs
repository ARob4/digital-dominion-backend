import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile, readFile } from 'fs/promises';
import { loadImage } from 'canvas';

// Office pitch demo: compile three item-recognition targets.
// 01 FHBA recognition clock, 02 Puerto Rico mini conga, 03 CDBIA branded builder tool.
const files = [
  'product-ar/targets/impact-window.txt',
  'product-ar/targets/roofing-system.txt',
  'product-ar/targets/cdbia-builder-tool.txt'
];

const images = [];
for (const file of files) {
  const svg = await readFile(file, 'utf8');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  images.push(await loadImage(dataUri));
}

const compiler = new OfflineCompiler();
await compiler.compileImageTargets(images, (percent) => {
  process.stdout.write(`\rCompiling office item targets: ${Math.round(percent)}%`);
});

const buffer = compiler.exportData();
await writeFile('webar/target.mind', Buffer.from(buffer));
console.log(`\nWrote three-target webar/target.mind (${buffer.byteLength || buffer.length} bytes)`);
