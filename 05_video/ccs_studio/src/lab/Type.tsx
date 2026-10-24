import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {onTwos} from './fx';
import {C, F} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type Line = {text: string; color?: string; bg?: string; italic?: boolean};

/**
 * Headline editorial: mỗi dòng trồi lên từ một mask (mask reveal), lệch nhịp từng dòng,
 * chuyển động theo nhịp 2 frame. Dòng có `bg` = khối màu như mảnh báo cắt.
 */
export const Headline: React.FC<{
  lines: Line[];
  start: number;
  size?: number;
  stagger?: number;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  style?: React.CSSProperties;
  font?: string;
}> = ({lines, start, size = 150, stagger = 4, align = 'left', lineHeight = 0.98, style, font = F.headline}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center', ...style}}>
      {lines.map((l, i) => {
        const s = start + i * stagger;
        const p = interpolate(onTwos(frame), [s, s + 8], [1, 0], {...clamp, easing: Easing.bezier(0.2, 0.9, 0.3, 1)});
        if (frame < s) return <div key={i} style={{height: size * lineHeight}} />;
        return (
          <div key={i} style={{overflow: 'hidden', paddingTop: size * 0.24, marginTop: -size * 0.24}}>
            <div
              style={{
                translate: `0px ${p * 105}%`,
                fontFamily: l.italic ? F.serif : font,
                fontStyle: l.italic ? 'italic' : 'normal',
                fontWeight: l.italic ? 700 : 400,
                fontSize: size,
                lineHeight,
                color: l.color ?? C.ink,
                backgroundColor: l.bg,
                padding: l.bg ? `${size * 0.04}px ${size * 0.12}px ${size * 0.02}px` : 0,
                whiteSpace: 'nowrap',
                letterSpacing: l.italic ? 0 : size * 0.005,
              }}
            >
              {l.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Nhãn nhỏ kiểu chú thích tạp chí. */
export const Kicker: React.FC<{text: string; color?: string; size?: number; style?: React.CSSProperties}> = ({
  text,
  color = C.ink,
  size = 30,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      fontFamily: F.label,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: size * 0.12,
      color,
      textTransform: 'uppercase',
      ...style,
    }}
  >
    {text}
  </div>
);

/** Ghi chú viết tay. */
export const HandNote: React.FC<{text: string; color?: string; size?: number; rot?: number; style?: React.CSSProperties}> = ({
  text,
  color = C.tomato,
  size = 46,
  rot = -4,
  style,
}) => (
  <div style={{position: 'absolute', fontFamily: F.hand, fontSize: size, color, rotate: `${rot}deg`, whiteSpace: 'nowrap', ...style}}>
    {text}
  </div>
);
