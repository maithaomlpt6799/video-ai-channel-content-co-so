// Dòng thời gian CCS-001 v01 — dựng từ độ dài giọng thật (voice-timing-v3.json).
// Giọng Harper (Speko) của bản v2, tăng tốc thêm ×1,05 theo CEO (24/10/2026). Hook B.
import vt from './voice-timing-v3.json';
import {FPS} from '../lab/theme';

type Seg = {duration: number; cues: Record<string, number>};
const V = vt as unknown as Record<string, Seg>;

/** Khoảng lặng cũng nhanh theo giọng. */
const TEMPO = 1.05;
/** [id đoạn giọng, khoảng lặng trước đoạn (giây, ở tốc độ v2)] */
const ORDER: [string, number][] = [
  ['hookB', 0.12],
  ['s1', 0.3],
  ['s2', 0.25],
  ['s3k', 0.3],
  ['p2a', 0.15],
  ['p2b', 0.3],
  ['p2c', 0.25],
  ['p2d', 0.25],
  ['p2e', 0.35],
  ['s5bk', 0.4],
  ['p3', 0.12],
];
const END_HOLD = 1.7;

export const SEG: Record<string, {start: number; end: number; dur: number}> = {};
let t = 0;
for (const [id, lead] of ORDER) {
  t += lead / TEMPO;
  SEG[id] = {start: t, end: t + V[id].duration, dur: V[id].duration};
  t += V[id].duration;
}
export const END_SEC = t + END_HOLD;

export const f = (sec: number) => Math.round(sec * FPS);
export const cueSec = (id: string, c: string) => SEG[id].start + V[id].cues[c];
export const cue = (id: string, c: string) => f(cueSec(id, c));
export const segStart = (id: string) => f(SEG[id].start);
export const segEnd = (id: string) => f(SEG[id].end);
export const DURATION = f(END_SEC);
export const VOICE_IDS = ORDER.map(([id]) => id);

/** Ranh giới cảnh (frame tuyệt đối). */
export const SCENE = {
  hook: 0,
  sc1: segStart('s1') - 4,
  sc2: segStart('s2'),
  sc3: segStart('s3k'),
  a1: segStart('p2b') - 4,
  a2: segStart('p2c') - 4,
  a3: segStart('p2d') - 4,
  pay: segStart('p2e') - 4,
  end: cue('p3', 'insight') - 14,
};
/** Số frame chồng lấn khi chuyển cảnh bằng tờ giấy quét. */
export const WIPE = 10;
