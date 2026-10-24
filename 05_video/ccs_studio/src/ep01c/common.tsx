import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {boil, ease} from '../lab/fx';
import {H, W} from '../lab/theme';

/** Đường mép xé ngang (dùng cho tờ giấy quét chuyển cảnh). */
const tornLine = (y: number, seed: string, jag = 16) => {
  const pts: string[] = [];
  for (let x = -40, i = 0; x <= W + 40; x += 36, i++) {
    pts.push(`${x} ${(y + (random(`${seed}-${i}`) - 0.5) * 2 * jag).toFixed(1)}`);
  }
  return pts;
};

/**
 * Tờ giấy quét từ dưới lên (paper wipe): cảnh mới lộ ra sau một mép giấy xé.
 * `start`, `dur` tính theo frame của Sequence chứa nó.
 */
export const PaperWipe: React.FC<{start?: number; dur?: number; seed: string; children: React.ReactNode; dir?: 'up' | 'down'}> = ({
  start = 0,
  dur = 10,
  seed,
  children,
  dir = 'up',
}) => {
  const frame = useCurrentFrame();
  const p = ease(Math.floor(frame / 2) * 2, start, start + dur, 0, 1);
  if (p >= 1) return <>{children}</>;
  if (p <= 0) return null;
  const y = dir === 'up' ? (H + 60) * (1 - p) - 30 : (H + 60) * p - 30;
  const line = tornLine(y, seed);
  const d =
    dir === 'up'
      ? `M ${line.join(' L ')} L ${W + 40} ${H + 80} L -40 ${H + 80} Z`
      : `M ${line.join(' L ')} L ${W + 40} -80 L -40 -80 Z`;
  return (
    <div style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 -10px 0 rgba(36,35,33,0.18))'}}>
      <div style={{position: 'absolute', inset: 0, clipPath: `path('${d}')`}}>{children}</div>
    </div>
  );
};

/** Lớp cắt giấy có "boil" (rung tay nhẹ). */
export const Boil: React.FC<{seed: string; amp?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  seed,
  amp = 0.6,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const b = boil(frame, seed, amp);
  return <div style={{position: 'absolute', inset: 0, translate: `${b.x}px ${b.y}px`, rotate: `${b.rot * 0.3}deg`, ...style}}>{children}</div>;
};
