// SC00 · HOOK (mới) — A: "Một thỏi son đỏ, bẻ ra được ba content angle khác nhau. Tin không?"
//                      B: "Bí ý tưởng content? Có khi bạn chỉ đang nhìn sản phẩm sai cách."
// Frame đầu đã có hình có nghĩa: son hero + vệt son, camera đẩy vào.
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {cue} from './timing';
import vt from './voice-timing-v3.json';
import {ease, easeOut, onTwos, pop, shake, slam} from '../lab/fx';
import {Stamp} from '../lab/Marks';
import {Folio, PaperBG} from '../lab/Paper';
import {Lipstick, Smear, Starburst} from '../lab/Props';
import {TornScrap} from '../lab/Scrap';
import {HandNote, Headline} from '../lab/Type';
import {C, F} from '../lab/theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Label: React.FC<{text: string; t: number; style?: React.CSSProperties; size?: number; color?: string}> = ({text, t, style, size = 76, color = C.white}) => {
  const frame = useCurrentFrame();
  const s = slam(frame, t);
  if (frame < t) return null;
  return (
    <TornScrap w={text.length * size * 0.47 + 70} h={size * 1.45} color={color} seed={`lbl-${text}`} style={{scale: String(s.scale), opacity: s.opacity, ...style}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.headline, fontSize: size, color: C.ink, letterSpacing: 1}}>
        {text}
      </div>
    </TornScrap>
  );
};

const CARDS = [
  {color: C.butter, no: '01', x: 70},
  {color: C.peri, no: '02', x: 395},
  {color: C.lime, no: '03', x: 720},
];

export const Sc0Hook: React.FC<{variant?: 'A' | 'B'; offset?: number}> = ({variant = 'A', offset = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const push = interpolate(frame, [0, 10], [1.22, 1], {...clamp, easing: (x) => 1 - (1 - x) ** 3});
  const drift = interpolate(frame, [10, 140], [1, 1.04], clamp);
  const smearIn = ease(onTwos(frame), 0, 8, 0, 1);

  if (variant === 'B') {
    const V = vt as unknown as Record<string, {cues: Record<string, number>}>;
    const at = (c: string) => Math.round((offset + V.hookB.cues[c]) * 30);
    const tSai = at('sai');
    const spin = ease(frame, at('co_khi'), at('co_khi') + 10, 8, 188);
    const sh = shake(frame, tSai, 10, 12);
    return (
      <PaperBG color={C.ivory}>
        <Folio />
        <div style={{position: 'absolute', inset: 0, scale: String(push * drift), translate: `${sh.x}px ${sh.y}px`}}>
          <Starburst w={980} color={C.butter} style={{left: 50, top: 520, rotate: `${frame * 0.2}deg`}} />
          <Smear w={1250} reveal={smearIn} style={{left: -60, top: 880, rotate: '-14deg'}} />
          <Lipstick w={290} style={{left: 395, top: 520, rotate: `${spin}deg`}} />
        </div>
        <Label text="BÍ Ý TƯỞNG?" t={3} style={{left: 90, top: 290, rotate: '-4deg'}} />
        <HandNote text="content" color={C.tomato} size={70} rot={-6} style={{left: 640, top: 300, opacity: frame >= at('content') ? 1 : 0}} />
        {frame >= tSai ? <Stamp paper text="SAI CÁCH?" size={120} rot={-10} scale={slam(frame, tSai).scale} seed={21} style={{left: 160, top: 1240}} /> : null}
      </PaperBG>
    );
  }

  const tBa = cue('hookA', 'ba') - 3;
  const tAngle = cue('hookA', 'angle');
  const tTin = cue('hookA', 'tin');
  const split = easeOut(onTwos(frame), tBa, tBa + 8, 0, 1);
  const sh = shake(frame, tBa, 8, 12);
  const wig = frame >= tTin ? Math.sin((frame - tTin) * 0.9) * 3 * Math.max(0, 1 - (frame - tTin) / 20) : 0;

  return (
    <PaperBG color={C.ivory}>
      <Folio />
      <div style={{position: 'absolute', inset: 0, scale: String(push * drift), translate: `${sh.x}px ${sh.y}px`}}>
        {/* ba thẻ màu bung ra phía sau */}
        {CARDS.map((c, i) => {
          const p = pop(frame, tBa + i * 2, fps, 240);
          if (frame < tBa) return null;
          return (
            <TornScrap
              key={c.no}
              w={290}
              h={760}
              color={c.color}
              seed={`hk-${i}`}
              style={{left: c.x, top: 520, rotate: `${(i - 1) * 4 + wig * (i - 1)}deg`, scale: String(p), transformOrigin: '50% 100%'}}
            >
              <div style={{position: 'absolute', left: 22, top: 18, fontFamily: F.label, fontWeight: 800, fontSize: 40, letterSpacing: 3, color: C.ink}}>ANGLE {c.no}</div>
            </TornScrap>
          );
        })}
        {/* vệt son + son hero → tách 3 */}
        <Smear w={1300} reveal={smearIn} style={{left: -110, top: 860, rotate: '-12deg', opacity: 1 - split * 0.65}} />
        {[-1, 0, 1].map((k) => {
          const w = 300 - 115 * split;
          const left = 390 + 15 * split + k * 325 * split;
          const top = 470 + 170 * split;
          if (k !== 0 && split <= 0) return null;
          return <Lipstick key={k} w={w} style={{left, top, rotate: `${8 - 8 * split + k * 6 * split + wig}deg`}} />;
        })}
      </div>
      <Label text="1 THỎI SON ĐỎ" t={3} style={{left: 90, top: 292, rotate: '-3deg'}} />
      <Headline start={tAngle} size={112} lines={[{text: '3 CONTENT ANGLES', color: C.ivory, bg: C.burgundy}]} style={{left: 90, top: 1300}} />
      {frame >= tTin ? (
        <HandNote text="Tin không?" color={C.tomato} size={96} rot={-7} style={{left: 560, top: 380, scale: String(pop(frame, tTin, fps, 300))}} />
      ) : null}
    </PaperBG>
  );
};
