// =============================================================
//  CONTENT CÓ SỐ · EPISODE 01 — REVISION V3 (beauty-editorial × collage)
//  Hook mới · 3 angle mới · công thức 1 SẢN PHẨM + 1 INSIGHT + 1 CÁCH KỂ · mascot "Bé Tiền Tít"
//  Voice = đoạn cũ giữ lại + pickup Speko (xem AUDIO-PATCH-REPORT.md)
// =============================================================
import React from 'react';
import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {AngleBold, AngleMyth, AngleStory} from './Angles';
import {PaperWipe} from './common';
import {EndFrame, Payoff} from './Payoff';
import {Sc0Hook} from './Sc0Hook';
import {Sc1Hook} from './Sc1Hook';
import {Sc2Product, SC2_ZOOM} from './Sc2Product';
import {Sc3Pivot} from './Sc3Pivot';
import {cue, DURATION, f, SCENE, SEG, VOICE_IDS, WIPE} from './timing';
import {Grain} from '../lab/Paper';
import {C, sfx} from '../lab/theme';

export const EP01V2 = {id: 'CCS-001-v01', duration: DURATION};

const S = SCENE;
const SFX: [string, number, number][] = [
  // HOOK (B)
  ['whoosh', 0, 0.3],
  ['paper_impact', 3, 0.5],
  ['pop', cue('hookB', 'content'), 0.3],
  ['whoosh', cue('hookB', 'co_khi'), 0.35],
  ['stamp', cue('hookB', 'sai'), 0.5],
  // SC01
  ['rip', S.sc1, 0.45],
  ['paper_impact', S.sc1 + 9, 0.5],
  ['crumple', S.sc1 + 36, 0.4],
  ['rip', cue('s1', 'cong_thuc') - 1, 0.5],
  ['pop', cue('s1', 'cong_thuc') + 5, 0.3],
  // SC02
  ['whoosh', S.sc2 - 3, 0.3],
  ['paper_impact', cue('s2', 'mau_dep'), 0.4],
  ['paper_impact', cue('s2', 'mem_moi'), 0.4],
  ['paper_impact', cue('s2', 'de_dung'), 0.4],
  ['pop', cue('s2', 'xong'), 0.3],
  ['pop', cue('s2', 'xong') + 6, 0.3],
  ['stamp', cue('s2', 'bi_tiep'), 0.55],
  ['whoosh', S.sc2 + SC2_ZOOM, 0.3],
  // SC03
  ['page_flip', S.sc3, 0.55],
  ['paper_impact', cue('p2a', 'thoi_son') + 2, 0.45],
  ['whoosh', cue('p2a', 'do'), 0.25],
  // A1
  ['rip', S.a1, 0.4],
  ['pop', S.a1 + 6, 0.25],
  ['pop', S.a1 + 12, 0.25],
  ['paper_impact', cue('p2b', 'noi_bat'), 0.35],
  ['whoosh', cue('p2b', 'son_do') - 2, 0.35],
  ['stamp', cue('p2b', 'ba_hoang') + 8, 0.45],
  ['tick', cue('p2b', 'ba_hoang') + 12, 0.4],
  ['pop', cue('p2b', 'moi_mau'), 0.3],
  ['whoosh', S.a2 - 10, 0.45],
  // A2
  ['tick', S.a2 + 8, 0.45],
  ['tick', S.a2 + 12, 0.45],
  ['tick', S.a2 + 16, 0.45],
  ['tick', S.a2 + 20, 0.4],
  ['pop', cue('p2c', 'gan_gui'), 0.3],
  ['paper_impact', cue('p2c', 'day_muon'), 0.4],
  ['pop', cue('p2c', 'phut'), 0.35],
  ['pop', cue('p2c', 'xinh'), 0.35],
  ['tick', cue('p2c', 'xinh') + 3, 0.45],
  ['whoosh', S.a3 - 9, 0.35],
  // A3
  ['paper_impact', cue('p2d', 'dinh_kien'), 0.5],
  ['rip', cue('p2d', 'ai_bao'), 0.6],
  ['pop', cue('p2d', 'ai_bao') + 10, 0.3],
  ['stamp', cue('p2d', 'chi_dep'), 0.45],
  // PAYOFF
  ['whoosh', S.pay, 0.45],
  ['paper_impact', S.pay + 22, 0.35],
  ['pop', cue('p2e', 'san_pham'), 0.3],
  ['tick', cue('p2e', 'insight'), 0.4],
  ['tick', cue('p2e', 'cach_ke'), 0.4],
  ['pop', cue('p2e', 'angle') - 6, 0.3],
  ['stamp', cue('p2e', 'angle') + 12, 0.55],
  // END
  ['rip', S.end, 0.45],
  ['pop', cue('p3', 'insight'), 0.3],
  ['pop', cue('p3', 'cach_ke'), 0.3],
  ['pop', cue('p3', 'cach_ke') + 4, 0.3],
];

const voiceRanges = VOICE_IDS.map((id) => [f(SEG[id].start), f(SEG[id].end)]);

export const Ep01v2: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.ivory}}>
    <Sequence name="SC00 · Hook mới" from={S.hook} durationInFrames={S.sc1 + WIPE}>
      <Sc0Hook variant="B" offset={SEG.hookB.start} />
    </Sequence>
    <Sequence name="SC01 · Không thiếu ý tưởng" from={S.sc1} durationInFrames={S.sc2 - S.sc1 + WIPE}>
      <PaperWipe seed="w1" dur={10}>
        <Sc1Hook />
      </PaperWipe>
    </Sequence>
    <Sequence name="SC02 · Chỉ nhìn sản phẩm" from={S.sc2} durationInFrames={S.sc3 - S.sc2}>
      <Sc2Product />
    </Sequence>
    <Sequence name="SC03 · Đổi cách nghĩ" from={S.sc3} durationInFrames={S.a1 - S.sc3 + WIPE}>
      <Sc3Pivot />
    </Sequence>
    <Sequence name="A1 · Bold statement" from={S.a1} durationInFrames={S.a2 - S.a1}>
      <PaperWipe seed="wa1" dur={10}>
        <AngleBold />
      </PaperWipe>
    </Sequence>
    <Sequence name="A2 · Relatable story" from={S.a2} durationInFrames={S.a3 - S.a2}>
      <AngleStory />
    </Sequence>
    <Sequence name="A3 · Myth busting" from={S.a3} durationInFrames={S.pay - S.a3}>
      <AngleMyth />
    </Sequence>
    <Sequence name="SC05 · Payoff" from={S.pay} durationInFrames={S.end - S.pay + WIPE}>
      <Payoff />
    </Sequence>
    <Sequence name="SC06 · End" from={S.end} durationInFrames={DURATION - S.end}>
      <PaperWipe seed="wend" dur={10}>
        <EndFrame />
      </PaperWipe>
    </Sequence>
    <Grain opacity={0.06} />

    {VOICE_IDS.map((id) => (
      <Sequence key={id} name={`Giọng ${id}`} from={f(SEG[id].start)} layout="none">
        <Audio src={staticFile(`ep01c/voice3/${id}.wav`)} volume={1} />
      </Sequence>
    ))}
    {SFX.map(([name, at, vol], i) => (
      <Sequence key={`sfx-${i}`} name={`SFX ${name}`} from={Math.max(0, at)} durationInFrames={30} layout="none">
        <Audio src={sfx(name)} volume={vol} />
      </Sequence>
    ))}
    <Audio
      src={staticFile('assets/audio/bgm.mp3')}
      trimBefore={48}
      volume={(fr) => {
        const talking = voiceRanges.some(([a, b]) => fr >= a - 4 && fr < b + 4);
        const fadeOut = Math.min(1, Math.max(0, (DURATION - fr) / 30));
        const fadeIn = Math.min(1, fr / 8);
        return (talking ? 0.055 : 0.1) * fadeOut * fadeIn;
      }}
    />
  </AbsoluteFill>
);

/** Hook preview (A hoặc B) — ~5 giây, chỉ để Channel Director chọn hook. */
export const HookPreview: React.FC<{variant: 'A' | 'B'}> = ({variant}) => {
  const id = variant === 'A' ? 'hookA' : 'hookB';
  return (
    <AbsoluteFill style={{backgroundColor: C.ivory}}>
      <Sc0Hook variant={variant} offset={0.12} />
      <Grain opacity={0.06} />
      <Sequence from={4} layout="none">
        <Audio src={staticFile(`ep01c/voice2/${id}.wav`)} />
      </Sequence>
      <Sequence from={0} durationInFrames={20} layout="none">
        <Audio src={sfx('paper_impact')} volume={0.45} />
      </Sequence>
    </AbsoluteFill>
  );
};
