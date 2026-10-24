import React, {useMemo} from 'react';
import {getLength, getPointAtLength} from '@remotion/paths';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {HAND_FONT, THEME, VIDEO, inkColor} from './theme';
import {Anchor, DrawItem} from './types';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
/** Ước lượng bề rộng chữ viết tay (Patrick Hand ~0.46em/ký tự) để bàn tay đi theo ngòi bút. */
const textWidth = (text: string, size: number) => text.length * size * 0.46;

type Resolved = DrawItem & {start: number; end: number; len: number};

/**
 * Lớp "mực": vẽ dần từng nét (path), viết dần từng chữ (text), đếm số (count),
 * và một bàn tay cầm bút dạ luôn bám theo ngòi đang vẽ.
 */
export const InkLayer: React.FC<{
  items: DrawItem[];
  pageFrom: number;
  anchorFrame: (a: Anchor) => number;
  idPrefix: string;
}> = ({items, pageFrom, anchorFrame, idPrefix}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const abs = pageFrom + frame;

  const resolved: Resolved[] = useMemo(
    () =>
      items.map((it) => {
        const start = anchorFrame(it.at);
        return {
          ...it,
          start,
          end: start + Math.max(1, Math.round(it.dur * fps)),
          len: it.kind === 'path' ? getLength(it.d) : 0,
        };
      }),
    [items, anchorFrame, fps],
  );

  const progress = (r: Resolved) =>
    interpolate(abs, [r.start, r.end], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});

  const tipOf = (r: Resolved, p: number) => {
    if (r.kind === 'path') {
      const pt = getPointAtLength(r.d, Math.max(0.01, r.len * p));
      return pt ? {x: pt.x, y: pt.y} : {x: 0, y: 0};
    }
    if (r.kind === 'text') {
      const w = textWidth(r.text, r.size);
      const x0 = r.align === 'start' ? r.x : r.x - w / 2;
      return {x: x0 + w * p, y: r.y - r.size * 0.3};
    }
    return {x: r.x + r.size * 0.4, y: r.y - r.size * 0.3};
  };

  // Bàn tay theo nét mới nhất đã bắt đầu; nhấc ra sau khi vẽ xong ~0.35s.
  const current = resolved.filter((r) => abs >= r.start).sort((a, b) => b.start - a.start).at(0);
  let hand: React.ReactNode = null;
  if (current) {
    const linger = Math.round(0.35 * fps);
    const opacity = interpolate(abs, [current.end + linger - 6, current.end + linger], [1, 0], clamp);
    if (opacity > 0) {
      const tip = tipOf(current, progress(current));
      const lift = interpolate(abs, [current.end, current.end + linger], [0, 40], clamp);
      hand = <Hand x={tip.x + lift * 0.5} y={tip.y + lift} opacity={opacity} />;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
      style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}
    >
      {resolved.map((r, i) => {
        const p = progress(r);
        if (p <= 0) return null;
        const color = inkColor(r.color);
        if (r.kind === 'path') {
          return (
            <path
              key={i}
              d={r.d}
              fill="none"
              stroke={color}
              strokeWidth={r.width ?? 6}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - p}
            />
          );
        }
        if (r.kind === 'text') {
          const w = textWidth(r.text, r.size);
          const x0 = r.align === 'start' ? r.x : r.x - w / 2;
          const clipId = `${idPrefix}-clip-${i}`;
          return (
            <g key={i}>
              <clipPath id={clipId}>
                <rect x={x0 - 20} y={r.y - r.size * 1.15} width={p >= 1 ? 4000 : (w + 40) * p} height={r.size * 1.7} />
              </clipPath>
              <text
                x={r.x}
                y={r.y}
                fontFamily={HAND_FONT}
                fontSize={r.size}
                fill={color}
                textAnchor={r.align === 'start' ? 'start' : 'middle'}
                clipPath={`url(#${clipId})`}
              >
                {r.text}
              </text>
            </g>
          );
        }
        return (
          <text
            key={i}
            x={r.x}
            y={r.y}
            fontFamily={HAND_FONT}
            fontSize={r.size}
            fill={color}
            textAnchor="middle"
            opacity={Math.min(1, p * 3)}
          >
            {Math.round(r.to * p)}
          </text>
        );
      })}
      {hand}
    </svg>
  );
};

/** Bàn tay cầm bút dạ (vẽ tay bằng SVG). Ngòi bút đặt tại (x, y). */
export const Hand: React.FC<{x: number; y: number; opacity?: number}> = ({x, y, opacity = 1}) => {
  const stroke = THEME.ink;
  return (
    <g transform={`translate(${x} ${y}) rotate(-28)`} opacity={opacity}>
      {/* tay áo */}
      <path d="M 70 300 L 160 268 L 250 470 L 140 520 Z" fill={THEME.ink} />
      {/* lòng bàn tay */}
      <path
        d="M -34 112 C -52 176 -20 262 42 292 C 104 322 156 270 146 200 C 136 140 84 102 32 100 Z"
        fill={THEME.skin}
        stroke={stroke}
        strokeWidth={3.5}
      />
      {/* thân bút */}
      <polygon points="0,0 -8,18 8,18" fill={THEME.ink} />
      <polygon points="-8,18 -16,44 16,44 8,18" fill="#E7E3DB" stroke={stroke} strokeWidth={3} />
      <rect x={-18} y={44} width={36} height={190} rx={9} fill="#FFFFFF" stroke={stroke} strokeWidth={3.5} />
      <rect x={-18} y={150} width={36} height={24} fill={THEME.accent} stroke={stroke} strokeWidth={3} />
      {/* ngón tay ôm bút */}
      <ellipse cx={-22} cy={98} rx={19} ry={30} fill={THEME.skin} stroke={stroke} strokeWidth={3.5} />
      <ellipse cx={20} cy={86} rx={22} ry={33} fill={THEME.skin} stroke={stroke} strokeWidth={3.5} />
      <ellipse cx={34} cy={128} rx={24} ry={29} fill={THEME.skin} stroke={stroke} strokeWidth={3.5} />
    </g>
  );
};
