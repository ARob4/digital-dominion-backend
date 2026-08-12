import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile } from 'fs/promises';
import { loadImage } from 'canvas';

const image = await loadImage('webar/target.png');
const compiler = new OfflineCompiler();
await compiler.compileImageTargets([image], (percent) => {
  process.stdout.write(`\rCompiling image target: ${Math.round(percent)}%`);
});
const buffer = compiler.exportData();
await writeFile('webar/target.mind', Buffer.from(buffer));
console.log(`\nWrote webar/target.mind (${buffer.byteLength || buffer.length} bytes)`);
