import React from 'react';
import {Img, random} from 'remotion';
import {C, F, img} from './theme';

/** Đường viền giấy xé: hình chữ nhật với mép răng cưa ngẫu nhiên (cố định theo seed). */
export const tornPath = (w: number, h: number, seed: string, jag = 7, step = 18, edges = 'tblr') => {
  const pts: [number, number][] = [];
  const j = (k: string) => (random(`${seed}-${k}`) - 0.5) * 2 * jag;
  const side = (x0: number, y0: number, x1: number, y1: number, torn: boolean, tag: string) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const off = torn ? j(`${tag}${i}`) : 0;
      pts.push([x0 + (x1 - x0) * t + nx * off, y0 + (y1 - y0) * t + ny * off]);
    }
  };
  side(0, 0, w, 0, edges.includes('t'), 't');
  side(w, 0, w, h, edges.includes('r'), 'r');
  side(w, h, 0, h, edges.includes('b'), 'b');
  side(0, h, 0, 0, edges.includes('l'), 'l');
  return 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ') + ' Z';
};

/** Mảnh giấy xé có texture + bóng đổ. Children nằm trên giấy. */
export const TornScrap: React.FC<{
  w: number;
  h: number;
  color: string;
  seed: string;
  jag?: number;
  edges?: string;
  texture?: 'grain' | 'crumple';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({w, h, color, seed, jag = 6, edges = 'tblr', texture = 'grain', style, children}) => {
  const d = tornPath(w, h, seed, jag, 18, edges);
  const clipId = `torn-${seed}`;
  return (
    <div style={{position: 'absolute', width: w, height: h, filter: 'drop-shadow(6px 10px 0 rgba(36,35,33,0.16))', ...style}}>
      <svg width={w} height={h} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <defs>
          <clipPath id={clipId}>
            <path d={d} />
          </clipPath>
        </defs>
        <path d={d} fill={color} />
        <image
          href={img(texture === 'crumple' ? 'crumple.png' : 'paper_grain.png')}
          x={0}
          y={0}
          width={w}
          height={h}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          style={{mixBlendMode: 'multiply'}}
          opacity={texture === 'crumple' ? 0.55 : 0.8}
        />
      </svg>
      <div style={{position: 'absolute', inset: 0}}>{children}</div>
    </div>
  );
};

/** Băng keo giấy bán trong suốt. */
export const Tape: React.FC<{x: number; y: number; w?: number; rot?: number; color?: string}> = ({
  x,
  y,
  w = 150,
  rot = -8,
  color = 'rgba(245, 240, 231, 0.72)',
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: 44,
      backgroundColor: color,
      rotate: `${rot}deg`,
      boxShadow: '0 2px 4px rgba(36,35,33,0.12)',
      borderLeft: '2px dashed rgba(36,35,33,0.08)',
      borderRight: '2px dashed rgba(36,35,33,0.08)',
    }}
  />
);

/** Mẩu note ý tưởng: giấy xé + băng keo + chữ đậm. */
export const Note: React.FC<{
  text: string;
  color: string;
  w?: number;
  h?: number;
  seed: string;
  size?: number;
  font?: 'label' | 'hand';
  style?: React.CSSProperties;
}> = ({text, color, w = 300, h = 130, seed, size = 52, font = 'label', style}) => (
  <TornScrap w={w} h={h} color={color} seed={seed} style={style}>
    <Tape x={w / 2 - 70} y={-20} w={140} rot={random(`${seed}-tape`) * 14 - 7} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font === 'label' ? F.label : F.hand,
        fontWeight: font === 'label' ? 800 : 400,
        fontSize: size,
        letterSpacing: font === 'label' ? 1.5 : 0,
        color: C.ink,
        textAlign: 'center',
        lineHeight: 1,
      }}
    >
      {text}
    </div>
  </TornScrap>
);

/** Ảnh cut-out (đã có viền trắng sticker) + bóng đổ cứng kiểu cắt dán. */
export const Cutout: React.FC<{src: string; w: number; style?: React.CSSProperties; shadow?: boolean}> = ({
  src,
  w,
  style,
  shadow = true,
}) => (
  <Img
    src={src}
    style={{
      position: 'absolute',
      width: w,
      filter: shadow ? 'drop-shadow(10px 16px 0 rgba(36,35,33,0.2))' : undefined,
      ...style,
    }}
  />
);
