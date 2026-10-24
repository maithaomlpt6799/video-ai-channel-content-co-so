// Quét thư mục public/ để biết asset nào đã có, đo thời lượng audio/video,
// rồi ghi kết quả vào src/tiktok3ce/generated/assets.json.
// Chạy: npm run assets   (tự chạy trước `npm run dev` và `npm run render`)
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseMedia} from '@remotion/media-parser';
import {nodeReader} from '@remotion/media-parser/node';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Mỗi video có một manifest riêng; kết quả quét ghi vào thư mục generated/ cạnh manifest.
const MANIFESTS = ['src/tiktok3ce/asset-manifest.json', 'src/channel/ep01/asset-manifest.json'];

for (const manifestPath of MANIFESTS) {
await scanManifest(manifestPath);
}

async function scanManifest(manifestPath) {
const manifest = JSON.parse(readFileSync(path.join(root, manifestPath), 'utf8'));
console.log(`\n=== ${manifestPath} ===`);
const found = {};
const missingRequired = [];
const missingOptional = [];

for (const asset of manifest.assets) {
  const file = asset.files.find((f) => existsSync(path.join(root, 'public', f)));
  if (!file) {
    (asset.required ? missingRequired : missingOptional).push(asset);
    continue;
  }
  const entry = {file};
  if (asset.type === 'audio' || asset.type === 'video') {
    try {
      const {durationInSeconds} = await parseMedia({
        src: path.join(root, 'public', file),
        reader: nodeReader,
        fields: {durationInSeconds: true},
        acknowledgeRemotionLicense: true,
      });
      if (typeof durationInSeconds === 'number') {
        entry.durationInSeconds = Math.round(durationInSeconds * 1000) / 1000;
      }
    } catch (err) {
      console.warn(`⚠️  Không đọc được thời lượng của ${file}: ${err.message}`);
    }
  }
  found[asset.key] = entry;
}

const outDir = path.join(root, path.dirname(manifestPath), 'generated');
mkdirSync(outDir, {recursive: true});
writeFileSync(
  path.join(outDir, 'assets.json'),
  JSON.stringify(
    {
      found,
      missingRequired: missingRequired.map((a) => a.key),
      missingOptional: missingOptional.map((a) => a.key),
    },
    null,
    2,
  ) + '\n',
);

console.log(`\n✅ Đã có ${Object.keys(found).length}/${manifest.assets.length} asset.`);
for (const [key, v] of Object.entries(found)) {
  console.log(`   • ${key.padEnd(14)} ${v.file}${v.durationInSeconds ? `  (${v.durationInSeconds}s)` : ''}`);
}
if (missingRequired.length) {
  console.log(`\n❌ Thiếu ${missingRequired.length} asset BẮT BUỘC (video đang dùng placeholder):`);
  for (const a of missingRequired) console.log(`   • public/${a.files[0]}  —  ${a.purpose}`);
}
if (missingOptional.length) {
  console.log(`\n➖ ${missingOptional.length} asset tuỳ chọn chưa có (clip lip-sync, ảnh cảnh dựng sẵn...).`);
}
console.log('');
}
