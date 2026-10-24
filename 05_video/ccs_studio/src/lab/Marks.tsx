import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, F} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Nét bút đỏ vẽ dần (khoanh, gạch, nối). */
export const RedStroke: React.FC<{
  d: string;
  start: number;
  dur?: number;
  width?: number;
  color?: string;
  box?: {x: number; y: number; w: number; h: number};
}> = ({d, start, dur = 12, width = 9, color = C.tomato, box = {x: 0, y: 0, w: 1080, h: 1920}}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + dur], [0, 1], {...clamp, easing: Easing.bezier(0.5, 0, 0.3, 1)});
  if (p <= 0) return null;
  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      style={{position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, overflow: 'visible', pointerEvents: 'none'}}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - p}
      />
    </svg>
  );
};

/** Vòng khoanh tay (hơi méo, vượt qua điểm đầu) quanh một hình chữ nhật. */
export const circlePath = (x: number, y: number, w: number, h: number) => {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2 + 26;
  const ry = h / 2 + 22;
  return `M ${cx - rx * 0.2} ${cy - ry * 1.02} C ${cx + rx * 0.9} ${cy - ry * 1.15}, ${cx + rx * 1.08} ${cy + ry * 0.9}, ${cx} ${cy + ry} C ${cx - rx * 1.1} ${cy + ry * 1.05}, ${cx - rx * 1.05} ${cy - ry * 0.95}, ${cx + rx * 0.35} ${cy - ry * 1.08}`;
};

/** Con dấu mực: viền kép + chữ, mực loang không đều (SVG filter), đập vào khung. */
export const Stamp: React.FC<{
  text: string;
  color?: string;
  size?: number;
  rot?: number;
  scale?: number;
  opacity?: number;
  style?: React.CSSProperties;
  seed?: number;
  paper?: boolean;
}> = ({text, color = C.tomato, size = 120, rot = -12, scale = 1, opacity = 1, style, seed = 3, paper = false}) => {
  const id = `stamp-${text.replace(/\W/g, '')}-${seed}`;
  const w = text.length * size * 0.52 + size * 0.9;
  const h = size * 1.55;
  return (
    <div style={{position: 'absolute', rotate: `${rot}deg`, scale: String(scale), opacity, ...style}}>
      <svg width={w} height={h} style={{overflow: 'visible'}}>
        <defs>
          <filter id={id}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.8" result="m" />
            <feComposite in="SourceGraphic" in2="m" operator="in" result="ink" />
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={1} seed={seed + 4} result="w" />
            <feDisplacementMap in="ink" in2="w" scale={5} />
          </filter>
        </defs>
        {paper ? <rect x={0} y={0} width={w} height={h} rx={16} fill={C.white} opacity={0.88} /> : null}
        <g filter={`url(#${id})`} fill="none" stroke={color}>
          <rect x={6} y={6} width={w - 12} height={h - 12} rx={14} strokeWidth={9} />
          <rect x={20} y={20} width={w - 40} height={h - 40} rx={8} strokeWidth={3.5} />
          <text
            x={w / 2}
            y={h / 2 + size * 0.36}
            textAnchor="middle"
            fontFamily={F.headline}
            fontSize={size}
            fill={color}
            stroke="none"
            letterSpacing={size * 0.04}
          >
            {text}
          </text>
        </g>
      </svg>
    </div>
  );
};

/** Đoạn highlight quét ngang sau chữ (bút dạ). */
export const Sweep: React.FC<{start: number; dur?: number; color?: string; style?: React.CSSProperties}> = ({
  start,
  dur = 8,
  color = C.butter,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + dur], [0, 1], {...clamp, easing: Easing.bezier(0.3, 0, 0.2, 1)});
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: color,
        transformOrigin: 'left center',
        scale: `${p} 1`,
        rotate: '-1.5deg',
        ...style,
      }}
    />
  );
};
