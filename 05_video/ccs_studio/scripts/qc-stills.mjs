// Render nhanh nhiều still để QC: node scripts/qc-stills.mjs <compId> <outDir> <scale> f1 f2 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const [, , id, outDir, scale, ...frames] = process.argv;
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_CHROME || null;
const composition = await selectComposition({serveUrl, id, browserExecutable});
for (const fr of frames.length ? frames : ['0']) {
  const output = path.join(outDir, `${id}_${String(fr).padStart(4, '0')}.png`);
  await renderStill({composition, serveUrl, output, frame: Number(fr), scale: Number(scale), browserExecutable});
  console.log(output);
}
