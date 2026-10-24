// SC03 · PIVOT — "Thử đổi cách nghĩ." (giữ từ voice cũ) + "Ví dụ cùng một thỏi son đỏ nha." (pickup)
// Bìa SC02 lật mở → bàn phân tích sáng → son hero đáp xuống bục, đúng vị trí của Angle 01 (match cut).
import React from 'react';
import {Freeze, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sc2Page, SC2_LEN, SC2_SCALE} from './Sc2Product';
import {cue, SCENE} from './timing';
import {ease, easeOut, onTwos, pop, shake} from '../lab/fx';
import {PaperBG} from '../lab/Paper';
import {Lipstick, Smear} from '../lab/Props';
import {HandNote, Headline, Kicker} from '../lab/Type';
import {C} from '../lab/theme';

const r = (abs: number) => abs - SCENE.sc3;
/** Vị trí son hero dùng chung SC03 → Angle 01. */
export const HERO_POS = {left: 405, top: 590, w: 270};

export const Pedestal: React.FC<{y: number; style?: React.CSSProperties}> = ({y, style}) => (
  <div style={{position: 'absolute', left: 300, top: y, width: 480, height: 160, ...style}}>
    <div style={{position: 'absolute', left: 0, top: 40, width: 480, height: 120, background: 'linear-gradient(90deg,#E9E2D6,#FFFDF8 35%,#F3ECE0 60%,#D8CFC0)'}} />
    <div style={{position: 'absolute', left: 0, top: 0, width: 480, height: 80, borderRadius: '50%', background: 'radial-gradient(ellipse at 40% 40%, #FFFFFF, #EFE8DC 70%)', boxShadow: 'inset 0 -4px 0 rgba(36,35,33,0.08)'}} />
  </div>
);

export const Sc3Pivot: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tLip = r(cue('p2a', 'thoi_son')) - 18;
  const tDo = r(cue('p2a', 'do'));

  const open = ease(onTwos(frame), 0, 14, 0, 1);
  const s = SC2_SCALE + (1 - SC2_SCALE) * open;
  const flip = ease(frame, 1, 13, 0, -172);
  const drop = easeOut(onTwos(frame), tLip, tLip + 8, -1300, 0);
  const sh = shake(frame, tLip + 8, 8, 10);
  const smear = ease(onTwos(frame), tDo, tDo + 8, 0, 1);

  return (
    <PaperBG color={C.ivory} grid>
      <div style={{position: 'absolute', inset: 0, scale: String(s), rotate: `${-2 * (1 - open)}deg`}}>
        <PaperBG color={C.ivory} grid>
          <div style={{position: 'absolute', inset: 0, translate: `${sh.x}px ${sh.y}px`}}>
            <Kicker text="THỬ" color={C.burgundy} size={40} style={{left: 92, top: 250}} />
            <Headline start={8} size={140} lines={[{text: 'ĐỔI CÁCH NGHĨ'}]} style={{left: 90, top: 318}} />
            <div style={{position: 'absolute', left: 90, top: 478, width: 900, height: 4, backgroundColor: C.ink}} />
            <Smear w={1150} reveal={smear} style={{left: -40, top: 1180, rotate: '-8deg'}} />
            <Pedestal y={1420} style={{opacity: frame >= tLip ? 1 : 0}} />
            {frame >= tLip ? <Lipstick w={HERO_POS.w} style={{left: HERO_POS.left, top: HERO_POS.top + drop}} /> : null}
            {frame >= tDo ? (
              <HandNote text="cùng 1 thỏi son đỏ" color={C.tomato} size={58} rot={-5} style={{left: 560, top: 560, scale: String(pop(frame, tDo, fps))}} />
            ) : null}
          </div>
        </PaperBG>
        {flip > -170 ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'left center',
              transform: `perspective(2600px) rotateY(${flip}deg)`,
              backfaceVisibility: 'hidden',
              outline: `${Math.round(14 / s)}px solid ${C.white}`,
              overflow: 'hidden',
            }}
          >
            <Freeze frame={SC2_LEN - 1}>
              <Sc2Page />
            </Freeze>
          </div>
        ) : null}
      </div>
    </PaperBG>
  );
};
