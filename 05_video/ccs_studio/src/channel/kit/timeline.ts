import {Anchor, Beat} from './types';

export type AssetLookup = {
  duration: (key: string) => number | null;
};

export type BeatTiming = {
  beat: Beat;
  from: number;
  durationInFrames: number;
  /** Frame tuyệt đối bắt đầu thoại. */
  speechStart: number;
  speechFrames: number;
  /** Frame tuyệt đối bắt đầu của từng cụm phụ đề. */
  chunkStarts: number[];
};

export type PageTiming = {page: string; from: number; durationInFrames: number; enterFrames: number};

/** Tốc độ đọc ước lượng khi chưa có giọng thật (âm tiết/giây). */
export const EST_SYLLABLES_PER_SEC = 4.8;
const LEAD_SEC = 0.12;
const TAIL_SEC = 0.22;
/** Số frame tờ giấy mới trượt vào, chồng lên tờ cũ. */
export const PAGE_OVERLAP = 10;

const syllables = (t: string) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

export const buildTimeline = (beats: Beat[], assets: AssetLookup, fps: number) => {
  let cursor = 0;
  const timings: BeatTiming[] = beats.map((beat) => {
    const voice = assets.duration(`voice_${beat.id}`);
    const speechFrames = Math.ceil((voice ?? syllables(beat.text) / EST_SYLLABLES_PER_SEC) * fps);
    const lead = Math.round(LEAD_SEC * fps);
    const durationInFrames = lead + speechFrames + Math.round((TAIL_SEC + (beat.holdSec ?? 0)) * fps);
    const speechStart = cursor + lead;
    let chunkStarts: number[];
    if (beat.chunks.every((c) => typeof c.at === 'number')) {
      chunkStarts = beat.chunks.map((c) => speechStart + Math.round((c.at as number) * fps));
    } else {
      const w = beat.chunks.map((c) => Math.max(1, syllables(c.text)));
      const total = w.reduce((a, b) => a + b, 0);
      let acc = 0;
      chunkStarts = w.map((x) => {
        const s = speechStart + Math.round((acc / total) * speechFrames);
        acc += x;
        return s;
      });
    }
    const t: BeatTiming = {beat, from: cursor, durationInFrames, speechStart, speechFrames, chunkStarts};
    cursor += durationInFrames;
    return t;
  });

  // Gom các beat liền nhau cùng page thành một tờ giấy.
  const pages: PageTiming[] = [];
  for (const t of timings) {
    const last = pages.at(-1);
    if (last && last.page === t.beat.page) {
      last.durationInFrames = t.from + t.durationInFrames - last.from;
    } else {
      const enter = pages.length === 0 ? 0 : PAGE_OVERLAP;
      pages.push({page: t.beat.page, from: t.from - enter, durationInFrames: t.durationInFrames + enter, enterFrames: enter});
    }
  }

  const total = cursor;
  const anchorFrame = (a: Anchor) => {
    const t = timings.find((x) => x.beat.id === a.beat);
    if (!t) throw new Error(`Không tìm thấy beat ${a.beat}`);
    const start = t.chunkStarts.at(Math.min(a.chunk, t.chunkStarts.length - 1)) ?? t.speechStart;
    return start + Math.round((a.offset ?? 0) * fps);
  };
  return {timings, pages, total, anchorFrame};
};

export type Timeline = ReturnType<typeof buildTimeline>;
