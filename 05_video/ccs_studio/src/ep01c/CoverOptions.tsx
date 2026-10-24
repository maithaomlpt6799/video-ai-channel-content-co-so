// Ba phương án cover (revision V3). Nền sáng, hero lipstick, chữ gọn, đọc được ở cỡ thumbnail.
import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import {Mascot} from '../lab/Mascot';
import {Folio, PaperBG} from '../lab/Paper';
import {AlarmClock, CollageHand, Crown, Lipstick, Smear, Starburst} from '../lab/Props';
import {TornScrap} from '../lab/Scrap';
import {C, F, img} from '../lab/theme';

const Logo: React.FC<{style?: React.CSSProperties; dark?: boolean}> = ({style, dark}) => (
  <div style={{position: 'absolute', display: 'flex', alignItems: 'center', gap: 12, ...style}}>
    <div style={{backgroundColor: dark ? C.ink : C.burgundy, padding: '6px 14px 2px', fontFamily: F.headline, fontSize: 36, color: C.ivory, letterSpacing: 2}}>CONTENT CÓ SỐ</div>
  </div>
);

const MiniCard: React.FC<{no: string; title: string; color: string; style?: React.CSSProperties; children?: React.ReactNode; w?: number}> = ({no, title, color, style, children, w = 360}) => (
  <div style={{position: 'absolute', width: w, backgroundColor: C.white, padding: 12, boxShadow: '10px 14px 0 rgba(36,35,33,0.18)', ...style}}>
    <div style={{position: 'relative', height: w * 0.42, backgroundColor: color, overflow: 'hidden'}}>{children}</div>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 10}}>
      <span style={{fontFamily: F.label, fontWeight: 800, fontSize: 24, color: C.burgundy, letterSpacing: 2}}>{no}</span>
      <span style={{fontFamily: F.headline, fontSize: w * 0.105, color: C.ink, lineHeight: 1.05}}>{title}</span>
    </div>
  </div>
);

/** A — Recommended: 1 THỎI SON. 3 CONTENT ANGLES. */
export const CoverA: React.FC = () => (
  <PaperBG color="#FBF7F0" grain={0.35}>
    <Folio />
    <Starburst w={700} color={C.butter} points={16} style={{left: 470, top: 640}} />
    <Smear w={1250} style={{left: 0, top: 1150, rotate: '-18deg'}} />
    <Lipstick w={310} style={{left: 610, top: 520, rotate: '14deg'}} />
    <div style={{position: 'absolute', left: 88, top: 270, fontFamily: F.headline, fontSize: 170, lineHeight: 1.08, color: C.ink}}>1 THỎI SON.</div>
    <div style={{position: 'absolute', left: 90, top: 470, fontFamily: F.headline, fontSize: 92, lineHeight: 1.1, color: C.ivory, backgroundColor: C.burgundy, padding: '6px 18px 0'}}>3 CONTENT ANGLES.</div>
    <MiniCard no="01" title="BÀ HOÀNG SON ĐỎ" color={C.butter} style={{left: 80, top: 660, rotate: '-6deg'}}>
      <Crown w={150} style={{left: 100, top: 8}} />
    </MiniCard>
    <MiniCard no="02" title="DẬY MUỘN VẪN PHẢI XINH" color={C.peri} w={380} style={{left: 110, top: 930, rotate: '3deg'}}>
      <AlarmClock w={130} hour={7} minute={15} style={{left: 125, top: 6, rotate: '-8deg'}} />
    </MiniCard>
    <MiniCard no="03" title="SON ĐỎ CHỈ CHO CHỊ ĐẸP?" color={C.lime} w={380} style={{left: 70, top: 1200, rotate: '-3deg'}}>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        <Img src={img('em_bold.png')} style={{position: 'absolute', width: 900, left: -320, top: -650, clipPath: 'inset(0 44.7% 0 0)'}} />
        <Img src={img('em_soft.png')} style={{position: 'absolute', width: 900, left: -320, top: -650, clipPath: 'inset(0 0 0 55.3%)'}} />
        <div style={{position: 'absolute', left: 176, top: 0, width: 4, height: '100%', backgroundColor: C.white}} />
      </div>
    </MiniCard>
    <Mascot w={150} expr="wink" look={[-0.6, 0.3]} brow={0.6} style={{left: 870, top: 300, rotate: '10deg'}} />
  </PaperBG>
);

/** B — Experimental: BÍ IDEA? THỬ CÁCH NÀY! */
export const CoverB: React.FC = () => (
  <PaperBG color={C.peri} grain={0.4}>
    <Folio />
    <Starburst w={820} color={C.butter} points={12} dashed style={{left: 130, top: 600}} />
    <div style={{position: 'absolute', left: 88, top: 268, fontFamily: F.headline, fontSize: 172, lineHeight: 1.04, color: C.ink}}>BÍ IDEA?</div>
    <div style={{position: 'absolute', left: 90, top: 470, fontFamily: F.headline, fontSize: 112, lineHeight: 1.1, color: C.ivory, backgroundColor: C.burgundy, padding: '4px 18px 0'}}>THỬ CÁCH NÀY!</div>
    {[
      {t: 'BÀ HOÀNG\nSON ĐỎ', c: C.butter, x: 70, y: 720, r: -12},
      {t: 'DẬY MUỘN\nVẪN XINH', c: C.lime, x: 720, y: 690, r: 10},
      {t: 'SON ĐỎ =\nDỪ?', c: C.white, x: 760, y: 1110, r: -8},
    ].map((p, i) => (
      <TornScrap key={i} w={250} h={330} color={p.c} seed={`cb-${i}`} style={{left: p.x, top: p.y, rotate: `${p.r}deg`}}>
        <div style={{position: 'absolute', left: 18, top: 14, fontFamily: F.label, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.burgundy}}>CONTENT CÓ SỐ · 0{i + 1}</div>
        <div style={{position: 'absolute', left: 18, top: 60, right: 14, fontFamily: F.headline, fontSize: 52, lineHeight: 1.02, color: C.ink, whiteSpace: 'pre-line'}}>{p.t}</div>
      </TornScrap>
    ))}
    <Lipstick w={250} style={{left: 410, top: 640, rotate: '-10deg'}} />
    <CollageHand w={360} style={{left: 360, top: 1130, rotate: '-6deg'}} />
    <Logo dark style={{left: 90, top: 1420}} />
  </PaperBG>
);

/** C — Minimal editorial: 1 SON = 3 IDEAS */
export const CoverC: React.FC = () => (
  <PaperBG color="#FBF7F0" grain={0.35}>
    <div style={{position: 'absolute', left: 70, top: 220, width: 940, height: 1290, border: `4px solid ${C.ink}`}} />
    <div style={{position: 'absolute', left: 70, top: 250, width: 940, textAlign: 'center', fontFamily: F.label, fontWeight: 800, fontSize: 30, letterSpacing: 8, color: C.ink}}>CONTENT CÓ SỐ · N°01</div>
    <div style={{position: 'absolute', left: 70, top: 300, width: 940, textAlign: 'center', fontFamily: F.headline, fontSize: 128, lineHeight: 1.06, color: C.ink, whiteSpace: 'nowrap'}}>
      1 SON = <span style={{color: C.burgundy}}>3 IDEAS</span>
    </div>
    <Smear w={1300} style={{left: -110, top: 960, rotate: '-8deg'}} />
    <Lipstick w={290} style={{left: 395, top: 500, rotate: '6deg'}} />
    {[C.butter, C.peri, C.lime].map((c, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 250 + i * 220,
          top: 1330,
          width: 130,
          height: 130,
          borderRadius: '50%',
          backgroundColor: c,
          border: `4px solid ${C.ink}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: F.headline,
          fontSize: 62,
          color: C.ink,
        }}
      >
        0{i + 1}
      </div>
    ))}
  </PaperBG>
);

export const CoverStill: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => (
  <AbsoluteFill>{v === 'A' ? <CoverA /> : v === 'B' ? <CoverB /> : <CoverC />}</AbsoluteFill>
);
