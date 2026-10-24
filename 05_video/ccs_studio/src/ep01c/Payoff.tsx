// SC05 PAYOFF — ba angle hội tụ thành bảng biên tập + công thức mới
// "Đó, cùng một sản phẩm nhưng chỉ cần đổi insight và cách kể, bạn đã có ba content angle hoàn toàn khác nhau."
// "Lần tới bí ý tưởng, đừng chỉ nhìn sản phẩm." (giữ từ voice cũ)
// SC06 END — "Hãy thử đổi insight và cách kể." (pickup)
import React from 'react';
import {Freeze, useCurrentFrame, useVideoConfig} from 'remotion';
import {A1_LEN, A2_LEN, A3_LEN, AngleBold, AngleMyth, AngleStory} from './Angles';
import {cue, SCENE} from './timing';
import {ease, easeOut, onTwos, pop, slam} from '../lab/fx';
import {Ticket} from '../lab/Cards';
import {TienTit} from '../lab/TienTit';
import {RedStroke, Stamp, circlePath} from '../lab/Marks';
import {Folio, PaperBG} from '../lab/Paper';
import {Lipstick, Smear, Starburst} from '../lab/Props';
import {HandNote, Headline, Kicker} from '../lab/Type';
import {C, F} from '../lab/theme';

const BOARD = {y: 840, scale: 0.29, gap: 340};
const TAGS = ['QUAN ĐIỂM', 'TÌNH HUỐNG', 'ĐỊNH KIẾN'];

const Tok: React.FC<{on: boolean; children: React.ReactNode; color?: string}> = ({on, children, color = C.ink}) => (
  <span style={{opacity: on ? 1 : 0.0, color}}>{children}</span>
);

export const Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r = (abs: number) => abs - SCENE.pay;
  const tSp = r(cue('p2e', 'san_pham'));
  const tIn = r(cue('p2e', 'insight'));
  const tCk = r(cue('p2e', 'cach_ke'));
  const tBa = r(cue('p2e', 'ba'));
  const tAng = r(cue('p2e', 'angle'));
  const tLan = r(cue('s5bk', 'lan_toi'));
  const tDung = r(cue('s5bk', 'dung_chi'));

  const z = ease(frame, 0, 22, 0, 1);
  const push = ease(frame, tLan, tLan + 40, 1, 1.04);

  // vị trí bắt đầu của từng bìa: A1 bay từ trái, A2 từ trên, A3 thu nhỏ từ toàn màn hình
  const from = [
    {x: -700, y: 700, s: 0.6, r: -20},
    {x: 540, y: -900, s: 0.6, r: 10},
    {x: 540, y: 960, s: 1, r: 0},
  ];
  const covers = [
    <Freeze key="a1" frame={A1_LEN - 12}>
      <AngleBold zoomOut={false} />
    </Freeze>,
    <Freeze key="a2" frame={A2_LEN - 10}>
      <AngleStory transitionOut={false} />
    </Freeze>,
    <Freeze key="a3" frame={A3_LEN - 1}>
      <AngleMyth />
    </Freeze>,
  ];

  return (
    <PaperBG color={C.ivory} grid>
      <div style={{position: 'absolute', inset: 0, scale: String(push)}}>
        <Folio right="N°01 · BẢNG PHÂN TÍCH" />
        {frame >= tSp ? (
          <>
            <Lipstick w={64} shadow="hard" style={{left: 214, top: 276, rotate: '-8deg', scale: String(pop(frame, tSp, fps))}} />
            <Headline start={tSp} size={112} lines={[{text: '1 SẢN PHẨM'}]} style={{left: 300, top: 300}} />
          </>
        ) : null}
        {[0, 1, 2].map((i) => (
          <RedStroke key={i} d={`M 540 440 C 540 500, ${540 + (i - 1) * 340} 470, ${540 + (i - 1) * 340} 560`} start={tSp + 6 + i * 3} dur={10} width={6} />
        ))}

        {covers.map((cv, i) => {
          const fr = from[i];
          const k = i === 2 ? z : easeOut(frame, 2 + i * 3, 20 + i * 3, 0, 1);
          const cx = fr.x + (540 + (i - 1) * BOARD.gap - fr.x) * k;
          const cy = fr.y + (BOARD.y - fr.y) * k;
          const sc = fr.s + (BOARD.scale - fr.s) * k;
          const rot = fr.r + ((i - 1) * 5 - fr.r) * k;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: cx - 540,
                top: cy - 960,
                width: 1080,
                height: 1920,
                scale: String(sc),
                rotate: `${rot}deg`,
                overflow: 'hidden',
                outline: `${Math.round(24 * k)}px solid ${C.white}`,
                boxShadow: `${30 * k}px ${44 * k}px 0 rgba(36,35,33,0.22)`,
              }}
            >
              {cv}
            </div>
          );
        })}

        {TAGS.map((t, i) =>
          frame >= tIn + i * 3 ? (
            <div
              key={t}
              style={{
                position: 'absolute',
                left: 540 + (i - 1) * BOARD.gap - 120,
                top: 1132,
                width: 240,
                textAlign: 'center',
                fontFamily: F.label,
                fontWeight: 800,
                fontSize: 34,
                letterSpacing: 2,
                color: C.ink,
                backgroundColor: [C.butter, C.peri, C.lime][i],
                padding: '4px 0',
                rotate: `${(i - 1) * 3}deg`,
                scale: String(pop(frame, tIn + i * 3, fps, 320)),
              }}
            >
              {t}
            </div>
          ) : null,
        )}

        <Ticket w={800} stub="CÔNG THỨC" style={{left: 70, top: 1215, rotate: '-1deg', translate: `${ease(onTwos(frame), tSp, tSp + 8, -1100, 0)}px 0px`}}>
          <div style={{fontFamily: F.label, fontWeight: 800, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>
            <Tok on={frame >= tSp}>1 SẢN PHẨM</Tok>
            <Tok on={frame >= tIn} color={C.burgundy}>
              {' + '}
            </Tok>
            <Tok on={frame >= tIn}>1 INSIGHT</Tok>
            <Tok on={frame >= tCk} color={C.burgundy}>
              {' + '}
            </Tok>
            <Tok on={frame >= tCk}>1 CÁCH KỂ</Tok>
          </div>
          <div style={{fontFamily: F.headline, fontSize: 78, lineHeight: 1.1, color: C.burgundy, whiteSpace: 'nowrap', opacity: frame >= tBa ? 1 : 0}}>= 1 CONTENT ANGLE</div>
        </Ticket>

        {/* Bé Tiền Tít #2 · Celebrate "Có số rồi!": công thức hoàn thành */}
        <TienTit pose="celebrate" w={210} start={tAng - 6} style={{left: 830, top: 290 - (1 - pop(frame, tAng - 6, fps, 260)) * 500, rotate: '4deg'}} />
        {frame >= tAng + 12 ? <Stamp text="FIX" size={64} rot={-12} seed={41} scale={slam(frame, tAng + 12).scale} style={{left: 790, top: 1336}} /> : null}

        {/* "đừng chỉ nhìn sản phẩm" */}
        <RedStroke d="M 290 372 C 450 352, 640 380, 800 360" start={tDung} dur={8} width={14} />
        <RedStroke d={circlePath(392, 1236, 400, 56)} start={tDung + 10} dur={12} width={8} />
      </div>
    </PaperBG>
  );
};

/** Khung kết sáng (không phải cover). */
export const EndFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r = (abs: number) => abs - SCENE.end;
  const tIn = r(cue('p3', 'insight'));
  const tCk = r(cue('p3', 'cach_ke'));
  return (
    <PaperBG color={C.ivory}>
      <Folio />
      <Starburst w={640} color={C.butter} points={16} style={{left: 520, top: 520, rotate: `${frame * 0.3}deg`}} />
      <Smear w={1200} reveal={ease(onTwos(frame), 2, 12, 0, 1)} style={{left: -60, top: 980, rotate: '-14deg'}} />
      <Lipstick w={250} style={{left: 690, top: 480 + (1 - pop(frame, 2, fps, 200)) * 900, rotate: '12deg'}} />
      <Kicker text="TAKEAWAY · N°01" color={C.burgundy} size={36} style={{left: 92, top: 470}} />
      <Headline start={tIn - 2} size={124} lineHeight={1.08} lines={[{text: 'ĐỔI INSIGHT.'}]} style={{left: 86, top: 525}} />
      <Headline start={tCk - 2} size={124} lineHeight={1.08} lines={[{text: 'ĐỔI CÁCH KỂ.', color: C.ivory, bg: C.burgundy}]} style={{left: 86, top: 665}} />
      {frame >= tCk + 8 ? <HandNote text="1 sản phẩm, nhiều cách kể" color={C.ink} size={50} rot={-3} style={{left: 92, top: 840}} /> : null}
      {/* Bé Tiền Tít #3 · Idea "Có idea nè!": chỉ vào takeaway */}
      <TienTit pose="idea" w={220} start={tCk + 4} style={{left: 96, top: 990 + (1 - pop(frame, tCk + 4, fps, 260)) * 600, rotate: '-5deg'}} />
      <div style={{position: 'absolute', left: 92, top: 1330, display: 'flex', alignItems: 'center', gap: 16, scale: String(pop(frame, tCk + 14, fps)), transformOrigin: 'left center'}}>
        <div style={{backgroundColor: C.burgundy, padding: '8px 18px 4px', fontFamily: F.headline, fontSize: 48, color: C.ivory, letterSpacing: 2}}>CONTENT CÓ SỐ</div>
        <div style={{fontFamily: F.label, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.ink, lineHeight: 1.1}}>
          THE CONTENT LAB
          <br />
          <span style={{fontWeight: 600, opacity: 0.75}}>giải mã nội dung hiệu quả</span>
        </div>
      </div>
    </PaperBG>
  );
};
