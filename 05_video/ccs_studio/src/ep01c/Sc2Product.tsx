// SC02 · "Ví dụ bán một thỏi son. Bạn chỉ nghĩ được: màu đẹp, mềm môi, dễ dùng. Xong, bí tiếp."
import React from 'react';
import {random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Boil, PaperWipe} from './common';
import {cue, f, SCENE, SEG} from './timing';
import {ease, onTwos, pop, shake, slam} from '../lab/fx';
import {RedStroke, Stamp, circlePath} from '../lab/Marks';
import {PaperBG} from '../lab/Paper';
import {Lipstick} from '../lab/Props';
import {Note} from '../lab/Scrap';
import {HandNote, Headline, Kicker} from '../lab/Type';
import {C} from '../lab/theme';
import {TienTit} from '../lab/TienTit';

export const SC2_LEN = SCENE.sc3 - SCENE.sc2;
const r = (abs: number) => abs - SCENE.sc2;
/** Thời điểm bắt đầu thu nhỏ trang vào một khung giấy. */
export const SC2_ZOOM = SC2_LEN - 20;
export const SC2_SCALE = 0.42;

const MAIN = [
  {text: 'MÀU ĐẸP', color: C.white, x: 90, y: 560, rot: -8, cue: 'mau_dep'},
  {text: 'MỀM MÔI', color: C.peri, x: 690, y: 650, rot: 7, cue: 'mem_moi'},
  {text: 'DỄ DÙNG', color: C.lime, x: 110, y: 880, rot: 5, cue: 'de_dung'},
];

/** Nội dung trang SC02 (nền butter) — tái sử dụng làm "bìa đóng" ở SC03. */
export const Sc2Page: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tSon = r(cue('s2', 'thoi_son'));
  const tHead = r(f(SEG.s2.start + 1.95));
  const tXong = r(cue('s2', 'xong'));
  const tBi = r(cue('s2', 'bi_tiep'));
  const drop = ease(onTwos(frame), 0, 10, -900, 0);
  const st = slam(frame, tBi);
  const sh = shake(frame, tBi, 10, 12);

  return (
    <PaperBG color={C.butter}>
      <div style={{position: 'absolute', inset: 0, translate: `${sh.x}px ${sh.y}px`}}>
        <Kicker text="VÍ DỤ · BÁN 1 THỎI SON" size={38} style={{left: 90, top: 290}} />
        <div style={{position: 'absolute', left: 90, top: 342, width: 900, height: 4, backgroundColor: C.ink}} />

        <Boil seed="sc2-lip" amp={0.5}>
          <Lipstick w={200} style={{left: 440, top: 470 + drop, rotate: '-4deg'}} />
        </Boil>
        <RedStroke d={circlePath(420, 470, 240, 650)} start={tSon} dur={12} width={9} />
        {frame >= tSon + 8 ? <HandNote text="1 thỏi son" color={C.tomato} size={60} rot={-6} style={{left: 700, top: 470}} /> : null}

        {MAIN.map((n, i) => {
          const t = r(cue('s2', n.cue));
          const s = slam(frame, t);
          return (
            <Note
              key={n.text}
              text={n.text}
              color={n.color}
              seed={`sc2-m${i}`}
              w={300}
              h={130}
              size={58}
              style={{left: n.x, top: n.y, rotate: `${n.rot}deg`, scale: String(s.scale), opacity: s.opacity}}
            />
          );
        })}

        {/* "Xong" — các ý tưởng lặp lại dán chồng lên nhau */}
        {Array.from({length: 8}).map((_, i) => {
          const t = tXong + i * 2;
          if (frame < t) return null;
          const m = MAIN[i % 3];
          const s = pop(frame, t, fps, 340);
          return (
            <Note
              key={i}
              text={m.text}
              color={m.color}
              seed={`sc2-r${i}`}
              w={250}
              h={108}
              size={48}
              style={{
                left: 80 + random(`rx${i}`) * 680,
                top: 470 + random(`ry${i}`) * 620,
                rotate: `${(random(`rr${i}`) - 0.5) * 30}deg`,
                scale: String(s),
              }}
            />
          );
        })}

        <Headline
          start={tHead}
          size={150}
          lines={[{text: 'CHỈ NHÌN VÀO'}, {text: 'SẢN PHẨM', color: C.ivory, bg: C.burgundy}]}
          style={{left: 90, top: 1170}}
        />

        {/* Bé Tiền Tít #1 · Judge "Hmm…": phát hiện ý tưởng lặp lại */}
        <TienTit pose="judge" w={210} start={tXong} style={{left: 830, top: 950 + (1 - pop(frame, tXong, fps, 260)) * 600, rotate: '6deg'}} />
        {frame >= tBi ? (
          <Stamp paper text="SAME IDEA" size={130} rot={-11} seed={5} scale={st.scale} opacity={st.opacity} style={{left: 180, top: 720}} />
        ) : null}
      </div>
    </PaperBG>
  );
};

export const Sc2Product: React.FC = () => {
  const frame = useCurrentFrame();
  const z = ease(frame, SC2_ZOOM, SC2_LEN, 0, 1);
  const scale = 1 - (1 - SC2_SCALE) * z;
  return (
    <PaperWipe seed="w2" start={0} dur={10}>
      <PaperBG color={C.ivory} grid>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            scale: String(scale),
            rotate: `${-2 * z}deg`,
            boxShadow: z > 0 ? `${14 * z}px ${20 * z}px 0 rgba(36,35,33,0.22)` : undefined,
            outline: z > 0 ? `${Math.round(14 / scale)}px solid ${C.white}` : undefined,
            overflow: 'hidden',
          }}
        >
          <Sc2Page />
        </div>
      </PaperBG>
    </PaperWipe>
  );
};
