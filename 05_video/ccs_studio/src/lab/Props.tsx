// Đạo cụ phong cách cắt giấy (paper-cut): mảng màu phẳng + bóng halftone + viền trắng
// sticker + bóng đổ cứng. Dùng như các mảnh cắt dán, không phải icon vector phẳng.
import React from 'react';
import {Img} from 'remotion';
import {C, F, img} from './theme';

const BORDER = {stroke: C.white, strokeWidth: 10, strokeLinejoin: 'round' as const, paintOrder: 'stroke' as const};
const shadow: React.CSSProperties = {filter: 'drop-shadow(8px 12px 0 rgba(36,35,33,0.18))', overflow: 'visible'};

/** Pattern chấm halftone dùng chung cho vùng tối. */
const HT: React.FC<{id: string; color?: string; size?: number}> = ({id, color = C.ink, size = 9}) => (
  <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <circle cx={size / 2} cy={size / 2} r={size * 0.26} fill={color} fillOpacity={0.55} />
  </pattern>
);

type P = {w: number; style?: React.CSSProperties};

export const AlarmClock: React.FC<P & {hour?: number; minute?: number}> = ({w, style, hour = 7, minute = 0}) => (
  <svg viewBox="0 0 400 440" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <defs>
      <HT id="ht-clock" />
    </defs>
    <g {...BORDER}>
      <path d="M 70 120 A 70 70 0 0 1 170 40 Z" fill={C.ink} />
      <path d="M 330 120 A 70 70 0 0 0 230 40 Z" fill={C.ink} />
      <path d="M 95 380 L 60 430 M 305 380 L 340 430" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
      <circle cx={200} cy={240} r={170} fill={C.tomato} />
    </g>
    <circle cx={200} cy={240} r={170} fill="url(#ht-clock)" clipPath="inset(0 0 0 50%)" opacity={0.6} />
    <path d="M 200 70 A 170 170 0 0 1 200 410 A 120 170 0 0 0 200 70 Z" fill="url(#ht-clock)" />
    <circle cx={200} cy={240} r={132} fill={C.ivory} />
    {Array.from({length: 12}).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <line key={i} x1={200 + Math.sin(a) * 112} y1={240 - Math.cos(a) * 112} x2={200 + Math.sin(a) * 124} y2={240 - Math.cos(a) * 124} stroke={C.ink} strokeWidth={i % 3 === 0 ? 8 : 4} strokeLinecap="round" />;
    })}
    <line x1={200} y1={240} x2={200 + Math.sin(((hour % 12) + minute / 60) / 12 * Math.PI * 2) * 66} y2={240 - Math.cos(((hour % 12) + minute / 60) / 12 * Math.PI * 2) * 66} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
    <line x1={200} y1={240} x2={200 + Math.sin((minute / 60) * Math.PI * 2) * 100} y2={240 - Math.cos((minute / 60) * Math.PI * 2) * 100} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <circle cx={200} cy={240} r={12} fill={C.burgundy} />
  </svg>
);

export const Laptop: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 440 300" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <defs>
      <HT id="ht-lap" color={C.ivory} size={8} />
    </defs>
    <g {...BORDER}>
      <rect x={60} y={10} width={320} height={210} rx={14} fill={C.ink} />
      <path d="M 10 236 L 430 236 L 400 280 L 40 280 Z" fill="#4A4744" />
    </g>
    <rect x={78} y={28} width={284} height={174} rx={6} fill={C.peri} />
    <rect x={78} y={28} width={284} height={174} rx={6} fill="url(#ht-lap)" opacity={0.5} />
    <rect x={100} y={52} width={150} height={16} rx={4} fill={C.ivory} />
    <rect x={100} y={80} width={220} height={10} rx={4} fill={C.ivory} opacity={0.7} />
    <rect x={100} y={100} width={190} height={10} rx={4} fill={C.ivory} opacity={0.7} />
    <rect x={100} y={130} width={110} height={52} rx={6} fill={C.butter} />
  </svg>
);

export const Coffee: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 180 240" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <defs>
      <HT id="ht-cof" />
    </defs>
    <g {...BORDER}>
      <path d="M 30 50 L 150 50 L 132 232 L 48 232 Z" fill={C.white} />
      <rect x={18} y={26} width={144} height={30} rx={8} fill={C.ink} />
    </g>
    <path d="M 38 110 L 142 110 L 136 170 L 44 170 Z" fill={C.kraft} />
    <path d="M 90 50 L 150 50 L 132 232 L 90 232 Z" fill="url(#ht-cof)" opacity={0.5} />
    <text x={90} y={150} textAnchor="middle" fontFamily={F.label} fontWeight={800} fontSize={26} fill={C.ink}>
      7:00
    </text>
  </svg>
);

export const Backpack: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 320 380" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <defs>
      <HT id="ht-bp" />
    </defs>
    <g {...BORDER}>
      <path d="M 110 60 C 110 10 210 10 210 60" fill="none" stroke={C.ink} strokeWidth={22} />
      <rect x={40} y={50} width={240} height={310} rx={70} fill={C.burgundy} />
    </g>
    <rect x={40} y={50} width={240} height={310} rx={70} fill="url(#ht-bp)" clipPath="inset(0 0 0 55%)" />
    <rect x={80} y={210} width={160} height={120} rx={30} fill={C.butter} stroke={C.ink} strokeWidth={5} />
    <line x1={92} y1={240} x2={228} y2={240} stroke={C.ink} strokeWidth={5} strokeDasharray="10 8" />
    <circle cx={160} cy={130} r={18} fill={C.lime} stroke={C.ink} strokeWidth={5} />
  </svg>
);

export const HandMirror: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 240 440" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <g {...BORDER}>
      <rect x={100} y={250} width={40} height={180} rx={18} fill={C.butter} />
      <ellipse cx={120} cy={140} rx={110} ry={130} fill={C.butter} />
    </g>
    <ellipse cx={120} cy={140} rx={88} ry={108} fill="#DDE4F2" />
    <path d="M 70 90 L 110 60 M 70 130 L 140 76" stroke={C.white} strokeWidth={10} strokeLinecap="round" />
    <rect x={100} y={250} width={40} height={180} rx={18} fill="none" stroke={C.ink} strokeWidth={5} />
  </svg>
);

/** Thẻ swatch màu son (như thẻ mẫu sơn). */
export const Swatch: React.FC<P & {color: string; label: string; code: string}> = ({w, style, color, label, code}) => (
  <svg viewBox="0 0 140 250" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <g {...BORDER}>
      <rect x={6} y={6} width={128} height={238} rx={8} fill={C.white} />
    </g>
    <rect x={16} y={16} width={108} height={150} rx={4} fill={color} />
    <text x={20} y={198} fontFamily={F.label} fontWeight={800} fontSize={24} fill={C.ink}>
      {code}
    </text>
    <text x={20} y={226} fontFamily={F.label} fontWeight={600} fontSize={22} fill={C.ink}>
      {label}
    </text>
  </svg>
);

/** Gương oval, ảnh mặt cắt halftone nằm bên trong. */
export const OvalMirror: React.FC<P & {src: string}> = ({w, style, src}) => {
  const h = w * 1.28;
  return (
    <div style={{position: 'absolute', width: w, height: h, ...style}}>
      <svg viewBox="0 0 400 512" width={w} height={h} style={{position: 'absolute', inset: 0, ...shadow}}>
        <g {...BORDER}>
          <ellipse cx={200} cy={256} rx={196} ry={252} fill={C.ivory} />
        </g>
        <ellipse cx={200} cy={256} rx={196} ry={252} fill="none" stroke={C.ink} strokeWidth={14} />
      </svg>
      <div style={{position: 'absolute', left: w * 0.06, top: h * 0.05, width: w * 0.88, height: h * 0.9, borderRadius: '50%', overflow: 'hidden', backgroundColor: C.white}}>
        <Img src={src} style={{position: 'absolute', width: '170%', left: '-72%', top: '-41%'}} />
      </div>
    </div>
  );
};

/** Thẻ lựa chọn phong cách trang điểm. */
export const OptionCard: React.FC<P & {color: string; label: string; sub: string}> = ({w, style, color, label, sub}) => (
  <div
    style={{
      position: 'absolute',
      width: w,
      padding: 18,
      backgroundColor: C.white,
      border: `8px solid ${C.white}`,
      boxShadow: '8px 12px 0 rgba(36,35,33,0.18)',
      ...style,
    }}
  >
    <div style={{height: w * 0.55, backgroundColor: color, borderRadius: 6}} />
    <div style={{fontFamily: F.headline, fontSize: w * 0.17, color: C.ink, marginTop: 14, lineHeight: 1}}>{label}</div>
    <div style={{fontFamily: F.label, fontWeight: 600, fontSize: w * 0.09, color: C.ink, opacity: 0.75, marginTop: 4}}>{sub}</div>
  </div>
);

/** Bàn tay cắt giấy (tay áo burgundy) — đặt/đẩy các bìa lên bảng. */
export const CollageHand: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 360 1000" width={w} style={{position: 'absolute', ...shadow, ...style}}>
    <defs>
      <HT id="ht-hand" color={C.burgundy} size={10} />
    </defs>
    <g {...BORDER}>
      <path d="M 60 300 L 300 300 L 340 1000 L 20 1000 Z" fill={C.burgundy} />
      <path
        d="M 90 310 C 80 230 70 170 95 150 C 115 135 135 160 138 200 L 140 90 C 140 60 175 58 178 90 L 182 190 L 186 70 C 188 40 224 42 224 72 L 226 196 L 240 104 C 244 76 278 80 275 110 L 262 230 C 280 200 312 196 318 222 C 320 240 296 268 280 300 Z"
        fill={C.butter}
      />
    </g>
    <path d="M 200 300 L 280 300 C 296 268 320 240 318 222 C 312 196 280 200 262 230 L 275 110 L 240 104 L 226 196 Z" fill="url(#ht-hand)" opacity={0.45} />
    <path d="M 60 340 L 300 340" stroke={C.ink} strokeWidth={6} />
  </svg>
);

/** Thỏi son hero (product render beauty-editorial, không logo). Tỉ lệ cao/rộng ≈ 3,22. */
export const LIP_RATIO = 1686 / 523;
export type Shade = 'hero' | 'nude' | 'pink' | 'coral' | 'plum' | 'gold';
export const Lipstick: React.FC<P & {shade?: Shade; shadow?: 'hard' | 'soft' | 'none'}> = ({w, style, shade = 'hero', shadow = 'soft'}) => (
  <Img
    src={img(`lipstick_${shade}.png`)}
    style={{
      position: 'absolute',
      width: w,
      filter:
        shadow === 'hard'
          ? 'drop-shadow(12px 18px 0 rgba(36,35,33,0.2))'
          : shadow === 'soft'
            ? 'drop-shadow(18px 26px 22px rgba(60,20,20,0.28)) drop-shadow(4px 6px 4px rgba(36,35,33,0.18))'
            : undefined,
      ...style,
    }}
  />
);

/** Vệt son đỏ (swatch) — ảnh render, tỉ lệ ≈ 5,4 : 1. */
export const Smear: React.FC<P & {soft?: boolean; reveal?: number}> = ({w, style, soft = false, reveal = 1}) => (
  <div style={{position: 'absolute', width: w, height: w / 5.39, overflow: 'hidden', clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`, ...style}}>
    <Img src={img(soft ? 'smear_red_soft.png' : 'smear_red.png')} style={{width: '100%', filter: 'drop-shadow(4px 8px 10px rgba(80,10,20,0.18))'}} />
  </div>
);

/** Vương miện cắt giấy vàng kim. */
export const Crown: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 300 200" width={w} style={{position: 'absolute', overflow: 'visible', filter: 'drop-shadow(6px 10px 0 rgba(36,35,33,0.2))', ...style}}>
    <defs>
      <linearGradient id="crown-g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8A5A1C" />
        <stop offset="0.22" stopColor="#F3D28A" />
        <stop offset="0.4" stopColor="#FFF6DA" />
        <stop offset="0.6" stopColor="#D4A24E" />
        <stop offset="0.85" stopColor="#7A4E16" />
        <stop offset="1" stopColor="#C9973F" />
      </linearGradient>
    </defs>
    <g stroke={C.white} strokeWidth={10} strokeLinejoin="round" paintOrder="stroke">
      <path d="M 20 180 L 10 50 L 85 115 L 150 15 L 215 115 L 290 50 L 280 180 Z" fill="url(#crown-g)" />
    </g>
    <rect x={22} y={150} width={256} height={26} fill="#7A4E16" opacity={0.35} />
    {[
      [10, 50],
      [150, 15],
      [290, 50],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={14} fill={i === 1 ? C.tomato : C.white} stroke="#7A4E16" strokeWidth={3} />
    ))}
    <circle cx={150} cy={140} r={13} fill={C.burgundy} />
    <circle cx={85} cy={150} r={8} fill={C.white} />
    <circle cx={215} cy={150} r={8} fill={C.white} />
  </svg>
);

/** Ngôi sao/starburst cắt giấy (nền nhấn). */
export const Starburst: React.FC<P & {color?: string; points?: number; dashed?: boolean}> = ({w, style, color = C.butter, points = 14, dashed = false}) => {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? 62 : 100;
    pts.push(`${100 + Math.cos(a) * r},${100 + Math.sin(a) * r}`);
  }
  return (
    <svg viewBox="0 0 200 200" width={w} style={{position: 'absolute', overflow: 'visible', ...style}}>
      <polygon points={pts.join(' ')} fill={color} stroke={dashed ? C.ink : 'none'} strokeWidth={dashed ? 1.5 : 0} strokeDasharray="5 4" />
    </svg>
  );
};

/** Túi xách cắt giấy. */
export const Handbag: React.FC<P> = ({w, style}) => (
  <svg viewBox="0 0 300 280" width={w} style={{position: 'absolute', overflow: 'visible', filter: 'drop-shadow(8px 12px 0 rgba(36,35,33,0.18))', ...style}}>
    <g stroke={C.white} strokeWidth={10} strokeLinejoin="round" paintOrder="stroke">
      <path d="M 90 100 C 90 20, 210 20, 210 100" fill="none" stroke={C.ink} strokeWidth={16} />
      <path d="M 30 100 L 270 100 L 250 270 L 50 270 Z" fill={C.ink} />
    </g>
    <path d="M 150 100 L 270 100 L 250 270 L 150 270 Z" fill="#3A3836" />
    <rect x={128} y={130} width={44} height={30} rx={4} fill="#D4A24E" />
  </svg>
);

/** Tờ checklist buổi sáng viết tay. */
export const Checklist: React.FC<P & {items: [string, boolean][]; title?: string}> = ({w, style, items, title = 'SÁNG NAY'}) => (
  <div
    style={{
      position: 'absolute',
      width: w,
      padding: '22px 26px 26px',
      backgroundColor: C.white,
      backgroundImage: 'repeating-linear-gradient(transparent 0 47px, rgba(168,168,234,0.55) 47px 49px)',
      boxShadow: '8px 12px 0 rgba(36,35,33,0.18)',
      ...style,
    }}
  >
    <div style={{fontFamily: F.label, fontWeight: 800, fontSize: w * 0.09, letterSpacing: 3, color: C.burgundy}}>{title}</div>
    {items.map(([t, done]) => (
      <div key={t} style={{display: 'flex', alignItems: 'center', gap: 14, height: 49, fontFamily: F.hand, fontSize: w * 0.12, color: C.ink}}>
        <div style={{width: 30, height: 30, border: `4px solid ${C.ink}`, borderRadius: 4, position: 'relative', flexShrink: 0}}>
          {done ? (
            <svg viewBox="0 0 40 40" width={46} style={{position: 'absolute', left: -2, top: -16, overflow: 'visible'}}>
              <path d="M 4 20 L 15 32 L 38 2" fill="none" stroke={C.tomato} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </div>
        <span style={{textDecoration: done ? 'none' : 'line-through', opacity: done ? 1 : 0.55}}>{t}</span>
      </div>
    ))}
  </div>
);
