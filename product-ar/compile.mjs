import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile } from 'fs/promises';
import { loadImage } from 'canvas';

const files = [
  'product-ar/targets/impact-window.jpg',
  'product-ar/targets/roofing-system.jpg',
  'product-ar/targets/smart-controller.jpg'
];

const images = [];
for (const file of files) images.push(await loadImage(file));

const compiler = new OfflineCompiler();
await compiler.compileImageTargets(images, (percent) => {
  process.stdout.write(`\rCompiling product targets: ${Math.round(percent)}%`);
});

const buffer = compiler.exportData();
await writeFile('product-ar/target.mind', Buffer.from(buffer));
console.log(`\nWrote product-ar/target.mind (${buffer.byteLength || buffer.length} bytes)`);
