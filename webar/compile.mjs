import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile } from 'fs/promises';
import { loadImage } from 'canvas';

// Dual-target compiler: full-color logo + white-on-navy logo.
const colorLogo = await loadImage('webar/target-color.jpg');
const whiteLogo = await loadImage('webar/target-white-navy.jpg');

const compiler = new OfflineCompiler();
await compiler.compileImageTargets([colorLogo, whiteLogo], (percent) => {
  process.stdout.write(`\rCompiling SEBC logo targets: ${Math.round(percent)}%`);
});

const buffer = compiler.exportData();
await writeFile('webar/target.mind', Buffer.from(buffer));
console.log(`\nWrote dual-target webar/target.mind (${buffer.byteLength || buffer.length} bytes)`);
