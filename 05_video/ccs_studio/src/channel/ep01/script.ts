// =============================================================
//  TẬP 01 · Series "Vẽ 1 Framework"
//  "Bạn không thiếu ý tưởng. Bạn thiếu đúng một công thức này."
//  Tệp chính: người mới làm content · Pillar: Content Nền Tảng
//
//  Lời đọc + phụ đề nằm trong beats.json (một nguồn duy nhất, script
//  tạo giọng cũng đọc file này). Mỗi beat = 1 file giọng b01…b07.
// =============================================================
import {Beat} from '../kit/types';
import data from './beats.json';
import timing from './generated/voice-timing.json';

export const EPISODE = {
  id: 'Ep01-KhongThieuYTuong',
  series: 'VẼ 1 FRAMEWORK',
  number: '#01',
};

/** Mốc bắt đầu từng cụm (giây) đo từ giọng AI — do scripts/tts-elevenlabs.mjs ghi ra. */
const measured = timing as unknown as Record<string, number[] | undefined>;

export const BEATS: Beat[] = data.beats.map((b) => {
  const at = measured[b.id];
  return {
    ...b,
    chunks: b.chunks.map((c, i) => ({text: c.text, at: at && at.length === b.chunks.length ? at[i] : undefined})),
  };
});
