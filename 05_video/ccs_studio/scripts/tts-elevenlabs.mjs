// Tạo giọng đọc cho một tập bằng ElevenLabs, rồi đo mốc thời gian từng cụm phụ đề
// để nét vẽ + phụ đề khớp giọng tuyệt đối.
//
//   node scripts/tts-elevenlabs.mjs ep01            # tạo các đoạn còn thiếu / đã đổi lời
//   node scripts/tts-elevenlabs.mjs ep01 --force    # tạo lại toàn bộ
//   node scripts/tts-elevenlabs.mjs ep01 --mock     # thử quy trình, không gọi API (giọng giả)
//
// Cần file .env ở thư mục gốc project (xem .env.example):
//   ELEVENLABS_API_KEY=...   ELEVENLABS_VOICE_ID=...   (tuỳ chọn) ELEVENLABS_MODEL, ELEVENLABS_SPEED
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const ep = args.find((a) => !a.startsWith('--')) ?? 'ep01';
const force = args.includes('--force');
const mock = args.includes('--mock');

// ---------- .env ----------
const env = {...process.env};
const envFile = path.join(root, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const KEY = env.ELEVENLABS_API_KEY;
const VOICE = env.ELEVENLABS_VOICE_ID;
const MODEL = env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const SPEED = Number(env.ELEVENLABS_SPEED || '1');
if (!mock && (!KEY || !VOICE || KEY.includes('dien_') || VOICE.includes('dien_'))) {
  console.error('\n❌ Thiếu ELEVENLABS_API_KEY hoặc ELEVENLABS_VOICE_ID trong file .env (xem .env.example).\n');
  process.exit(1);
}

// ---------- kịch bản ----------
const beatsPath = path.join(root, 'src/channel', ep, 'beats.json');
const {beats} = JSON.parse(readFileSync(beatsPath, 'utf8'));
const voiceDir = path.join(root, 'public', ep, 'voice');
const genDir = path.join(root, 'src/channel', ep, 'generated');
mkdirSync(voiceDir, {recursive: true});
mkdirSync(genDir, {recursive: true});
const cachePath = path.join(voiceDir, 'cache.json');
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : {};
const timingPath = path.join(genDir, 'voice-timing.json');
const timing = existsSync(timingPath) ? JSON.parse(readFileSync(timingPath, 'utf8')) : {};

const spoken = (b) => b.chunks.map((c) => c.say ?? c.text).join(' ');

const callElevenLabs = async (body) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify(body),
    });
    if (res.ok) return res.json();
    const detail = await res.text();
    if (res.status === 401) throw new Error('API key không hợp lệ (401). Kiểm tra ELEVENLABS_API_KEY.');
    if (res.status === 404) throw new Error('Không tìm thấy giọng (404). Kiểm tra ELEVENLABS_VOICE_ID.');
    if (res.status === 402 || /quota|credits/i.test(detail)) throw new Error(`Hết credit ElevenLabs: ${detail.slice(0, 200)}`);
    if (attempt === 3 || res.status < 500) throw new Error(`ElevenLabs lỗi ${res.status}: ${detail.slice(0, 300)}`);
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
};

/** Giọng giả để thử quy trình: âm sine, 0.075s mỗi ký tự, căn mốc tuyến tính. */
const mockTts = (text, outFile) => {
  const per = 0.075;
  const dur = Math.max(0.5, text.length * per);
  execFileSync('npx', ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', `sine=frequency=220:duration=${dur}`, '-ac', '1', '-ar', '44100', '-b:a', '96k', outFile]);
  const chars = [...text];
  return {
    characters: chars,
    character_start_times_seconds: chars.map((_, i) => i * per),
    character_end_times_seconds: chars.map((_, i) => (i + 1) * per),
  };
};

let made = 0;
for (let i = 0; i < beats.length; i++) {
  const b = beats[i];
  const text = spoken(b);
  const hash = createHash('sha1').update([text, VOICE, MODEL, SPEED, mock].join('|')).digest('hex').slice(0, 12);
  const outFile = path.join(voiceDir, `${b.id}.mp3`);
  if (!force && cache[b.id] === hash && existsSync(outFile) && timing[b.id]) {
    console.log(`= ${b.id} không đổi, giữ file cũ`);
    continue;
  }
  process.stdout.write(`… ${b.id}: "${text}"\n`);

  let alignment;
  if (mock) {
    alignment = mockTts(text, outFile);
  } else {
    const prev = beats[i - 1];
    const next = beats[i + 1];
    const data = await callElevenLabs({
      text,
      model_id: MODEL,
      seed: 20261023,
      previous_text: prev ? spoken(prev) : undefined,
      next_text: next ? spoken(next) : undefined,
      voice_settings: {stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true, speed: SPEED},
    });
    writeFileSync(outFile, Buffer.from(data.audio_base64, 'base64'));
    alignment = data.alignment ?? data.normalized_alignment;
  }

  // Mốc bắt đầu của từng cụm = thời điểm ký tự đầu tiên (không phải dấu cách) của cụm được đọc.
  const starts = [];
  let offset = 0;
  const chars = alignment?.characters ?? [];
  const sameLength = chars.join('') === text;
  for (const c of b.chunks) {
    const part = c.say ?? c.text;
    if (sameLength) {
      let k = offset;
      while (k < chars.length && /\s/.test(chars[k])) k++;
      starts.push(Math.round((alignment.character_start_times_seconds[k] ?? 0) * 1000) / 1000);
    } else {
      // Phòng hờ: chia theo tỉ lệ độ dài chữ nếu căn mốc không khớp ký tự.
      const total = alignment?.character_end_times_seconds?.at(-1) ?? 0;
      starts.push(Math.round((offset / text.length) * total * 1000) / 1000);
    }
    offset += part.length + 1;
  }
  timing[b.id] = starts;
  cache[b.id] = hash;
  made++;
  writeFileSync(path.join(voiceDir, `${b.id}.alignment.json`), JSON.stringify(alignment));
  writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  writeFileSync(timingPath, JSON.stringify(timing, null, 2) + '\n');
}

console.log(`\n✅ Xong: tạo mới ${made} đoạn giọng cho ${ep}. Mốc phụ đề đã ghi vào ${path.relative(root, timingPath)}.\n`);
