// SC01 · HOOK — "Bạn không thiếu ý tưởng. Bạn thiếu đúng một công thức này."
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Boil} from './common';
import {cue, SCENE} from './timing';
import {ease, onTwos, pop, shake, slam} from '../lab/fx';
import {RedStroke, circlePath} from '../lab/Marks';
import {Folio, PaperBG} from '../lab/Paper';
import {Lipstick} from '../lab/Props';
import {Note, TornScrap} from '../lab/Scrap';
import {Kicker} from '../lab/Type';
import {C, F} from '../lab/theme';

const r = (abs: number) => abs - SCENE.sc1;

const NOTES = [
  {text: 'MÀU ĐẸP', color: C.white, x: 90, y: 400, rot: -9, push: [70, 40]},
  {text: 'MỀM MÔI', color: C.peri, x: 690, y: 440, rot: 7, push: [-80, 30]},
  {text: 'DỄ DÙNG', color: C.lime, x: 120, y: 1120, rot: 6, push: [60, -50]},
  {text: 'GIÁ TỐT', color: C.butter, x: 680, y: 1150, rot: -5, push: [-60, -60]},
];

export const Sc1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tSlam = 9; // 0,3 s — tờ "HẾT Ý TƯỞNG?" đập vào
  const tJam = 36; // 1,2 s — các note xô vào nhau
  const tStrike = r(cue('s1', 'y_tuong')) + 4;
  const tRip = r(cue('s1', 'cong_thuc'));

  const sl = slam(frame, tSlam);
  const sh = shake(frame, tSlam, 10, 14);
  const sh2 = shake(frame, tJam, 8, 8);
  const rip = ease(onTwos(frame), tRip, tRip + 10, 0, 1);
  const fall = ease(onTwos(frame), tRip, tRip + 12, 0, 1);

  return (
    <PaperBG color={C.ivory}>
      <Folio />
      {/* Kệ phân tích: thỏi son trên bàn */}
      <div style={{position: 'absolute', inset: 0, translate: `${sh.x + sh2.x}px ${sh.y + sh2.y}px`}}>
        <Boil seed="sc1-lip" amp={0.5}>
          <Lipstick w={140} style={{left: 470, top: 545 - (1 - pop(frame, 0, fps)) * 60, rotate: '3deg'}} />
        </Boil>
        <div
          style={{
            position: 'absolute',
            left: 380,
            top: 1020,
            width: 320,
            height: 16,
            borderRadius: '50%',
            backgroundColor: C.ink,
            opacity: 0.12,
          }}
        />

        {/* Các ý tưởng quen thuộc */}
        {NOTES.map((n, i) => {
          const s = pop(frame, 1 + i * 2, fps);
          const jam = ease(onTwos(frame), tJam, tJam + 6, 0, 1);
          const dx = n.push[0] * jam + fall * (i % 2 ? 260 : -260);
          const dy = n.push[1] * jam + fall * 900;
          return (
            <Note
              key={n.text}
              text={n.text}
              color={n.color}
              seed={`sc1-n${i}`}
              w={290}
              h={126}
              size={54}
              style={{left: n.x + dx, top: n.y + dy, rotate: `${n.rot + jam * (i % 2 ? -8 : 8) + fall * 40}deg`, scale: String(s)}}
            />
          );
        })}

        {/* Tờ giấy nhàu "HẾT Ý TƯỞNG?" */}
        {frame >= tSlam && rip < 1 ? (
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 600,
              width: 840,
              height: 470,
              scale: String(sl.scale),
              opacity: sl.opacity,
              translate: `${rip * 900}px ${-rip * 1300}px`,
              rotate: `${-3 + rip * 38}deg`,
            }}
          >
            <TornScrap w={840} h={470} color={C.white} seed="sc1-big" jag={10} texture="crumple">
              <div style={{position: 'absolute', left: 60, top: 40, fontFamily: F.label, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.burgundy}}>
                VẤN ĐỀ #01
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 60,
                  top: 90,
                  fontFamily: F.headline,
                  fontSize: 170,
                  lineHeight: 0.98,
                  color: C.ink,
                }}
              >
                HẾT
                <br />Ý TƯỞNG<span style={{color: C.tomato}}>?</span>
              </div>
              <RedStroke d="M 40 190 C 180 172, 330 200, 420 178" start={tStrike} dur={6} width={16} box={{x: 0, y: 0, w: 840, h: 470}} />
            </TornScrap>
          </div>
        ) : null}
      </div>

      {/* Lộ ra: 3 ô trống — một công thức */}
      {frame >= tRip
        ? [0, 1, 2].map((i) => {
            const s = pop(frame, tRip + 4 + i * 3, fps, 300);
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    position: 'absolute',
                    left: 96 + i * 300,
                    top: 1110,
                    width: 230,
                    height: 270,
                    border: `5px dashed ${C.ink}`,
                    backgroundColor: 'rgba(255,253,248,0.7)',
                    scale: String(s),
                    rotate: `${[-3, 2, -1][i]}deg`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: F.serif,
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 170,
                    color: C.burgundy,
                  }}
                >
                  ?
                </div>
                {i < 2 ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 334 + i * 300,
                      top: 1190,
                      fontFamily: F.headline,
                      fontSize: 80,
                      color: C.ink,
                      opacity: interpolate(frame, [tRip + 8, tRip + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
                    }}
                  >
                    +
                  </div>
                ) : null}
              </React.Fragment>
            );
          })
        : null}
      {frame >= tRip + 12 ? (
        <>
          <Kicker text="1 CÔNG THỨC" color={C.burgundy} size={40} style={{left: 96, top: 1040}} />
          <RedStroke d={circlePath(96, 1036, 250, 50)} start={tRip + 14} dur={10} width={7} />
        </>
      ) : null}
    </PaperBG>
  );
};
