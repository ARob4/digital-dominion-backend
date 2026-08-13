import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile, readFile } from 'fs/promises';
import { loadImage } from 'canvas';

const files=['webar/placards/placard-01.svg','webar/placards/placard-02.svg','webar/placards/placard-03-min.svg'];
const images=[];
for(const file of files){
  const svg=await readFile(file,'utf8');
  images.push(await loadImage(`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`));
}
const compiler=new OfflineCompiler();
await compiler.compileImageTargets(images,p=>process.stdout.write(`\rCompiling placards: ${Math.round(p)}%`));
const buffer=compiler.exportData();
await writeFile('webar/target.mind',Buffer.from(buffer));
console.log(`\nWrote target.mind (${buffer.byteLength||buffer.length} bytes)`);

let h=await readFile('webar/product.html','utf8');
h=h.replace('Allow camera access, then point at one of the featured items in the booth.','Allow camera access, then point at the SEBC Scan to Explore placard beside a featured item.');
h=h.replace('MOVE CLOSER AND FILL THE FRAME WITH A FEATURED ITEM','FILL THE FRAME WITH THE SEBC PRODUCT PLACARD');
h=h.replace("help.textContent='Explore the digital content while the real-world item stays visible through your camera.';","help.textContent='Placard locked. Keep the item and placard in view while the AR content floats above the display.';");
h=h.replace("status.textContent='LOOKING FOR FEATURED ITEM';","status.textContent='LOOKING FOR PRODUCT PLACARD';");
h=h.replace("help.textContent='Point at the same side of the item shown in the booth display.';","help.textContent='Point at the SEBC Scan to Explore placard beside the featured item.';");
h=h.replace('.frame{width:min(78vw,410px);height:min(64vh,520px);border:1px solid rgba(255,255,255,.7);border-radius:22px;position:relative;box-shadow:0 0 0 999px rgba(0,0,0,.12)}','.frame{width:min(66vw,340px);height:auto;aspect-ratio:5/7;border:1px solid rgba(255,255,255,.7);border-radius:22px;position:relative;box-shadow:0 0 0 999px rgba(0,0,0,.12)}');
const r=[
['position="0 .58 .03"','position="0 1.03 .03"'],['position="0 .58 .04"','position="0 1.03 .04"'],
['position="0 .50 .03"','position="0 1.03 .03"'],['position="0 .50 .04"','position="0 1.03 .04"'],
['position="0 .45 .03"','position="0 .88 .03"'],['position="0 .45 .04"','position="0 .88 .04"'],
['position="0 .37 .03"','position="0 .88 .03"'],['position="0 .37 .04"','position="0 .88 .04"'],
['position="-.31 .04 .04"','position="-.30 .74 .04"'],['position="-.31 .04 .05"','position="-.30 .74 .05"'],
['position="-.31 -.045 .05"','position="-.30 .66 .05"'],['position=".31 .04 .04"','position=".30 .74 .04"'],
['position=".31 .04 .05"','position=".30 .74 .05"'],['position=".31 -.045 .05"','position=".30 .66 .05"'],
['position="-.31 .02 .04"','position="-.30 .74 .04"'],['position="-.31 .02 .05"','position="-.30 .74 .05"'],
['position="-.31 -.065 .05"','position="-.30 .66 .05"'],['position=".31 .02 .04"','position=".30 .74 .04"'],
['position=".31 .02 .05"','position=".30 .74 .05"'],['position=".31 -.065 .05"','position=".30 .66 .05"']
];
for(const [a,b] of r)h=h.split(a).join(b);
await writeFile('webar/product.html',h);
console.log('Updated Option A placard UI.');
