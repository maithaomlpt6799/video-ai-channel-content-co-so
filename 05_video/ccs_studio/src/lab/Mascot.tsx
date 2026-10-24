// "Bé Note Dán" — mascot của Content Có Số: mẩu giấy note có biểu cảm tối giản.
// Xuất hiện chọn lọc, phản ứng không lời (không TTS).
import React from 'react';
import {C, F} from './theme';

export type Expr = 'meh' | 'wow' | 'wink' | 'smirk';

export const Mascot: React.FC<{
  w: number;
  expr?: Expr;
  look?: [number, number];
  brow?: number; // -1 nhíu … 1 nhướng
  blink?: boolean;
  arm?: 'stamp' | 'point' | null;
  armT?: number; // 0..1 (tay đóng dấu nhấc lên → đập xuống)
  style?: React.CSSProperties;
}> = ({w, expr = 'smirk', look = [0, 0], brow = 0, blink = false, arm = null, armT = 0, style}) => {
  const px = look[0] * 7;
  const py = look[1] * 6;
  const eye = (cx: number, closed: boolean, half: boolean) =>
    closed ? (
      <path d={`M ${cx - 16} 92 Q ${cx} 100 ${cx + 16} 92`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    ) : (
      <g>
        <ellipse cx={cx} cy={90} rx={17} ry={half ? 11 : 20} fill={C.white} stroke={C.ink} strokeWidth={4} />
        <circle cx={cx + px} cy={92 + py + (half ? 3 : 0)} r={half ? 7 : 9} fill={C.ink} />
        {half ? <rect x={cx - 20} y={74} width={40} height={10} fill="#F6D96B" /> : null}
        {half ? <line x1={cx - 18} y1={84} x2={cx + 18} y2={84} stroke={C.ink} strokeWidth={4} strokeLinecap="round" /> : null}
      </g>
    );
  const half = expr === 'meh';
  const by = 58 - brow * 9;
  const mouth =
    expr === 'wow' ? (
      <ellipse cx={100} cy={140} rx={13} ry={16} fill={C.burgundy} stroke={C.ink} strokeWidth={4} />
    ) : expr === 'meh' ? (
      <path d="M 82 140 L 120 136" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    ) : expr === 'wink' ? (
      <path d="M 78 132 Q 100 156 124 132" fill={C.burgundy} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    ) : (
      <path d="M 80 138 Q 104 150 124 128" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    );
  const lift = Math.sin(Math.min(1, armT) * Math.PI);
  return (
    <svg viewBox="-40 -30 290 270" width={w} style={{position: 'absolute', overflow: 'visible', filter: 'drop-shadow(8px 12px 0 rgba(36,35,33,0.2))', ...style}}>
      {/* tay */}
      {arm === 'stamp' ? (
        <g transform={`rotate(${-30 * lift} 190 120)`}>
          <path d="M 188 120 L 232 120" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
          <rect x={224} y={96} width={16} height={34} rx={4} fill={C.burgundy} stroke={C.ink} strokeWidth={4} />
          <rect x={214} y={128} width={36} height={14} rx={3} fill={C.ink} />
        </g>
      ) : arm === 'point' ? (
        <path d="M 188 118 L 236 92 M 236 92 L 224 88 M 236 92 L 232 104" stroke={C.ink} strokeWidth={7} strokeLinecap="round" fill="none" />
      ) : null}
      <path d="M 12 150 L -10 168" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
      {/* tờ note */}
      <g stroke={C.white} strokeWidth={12} strokeLinejoin="round" paintOrder="stroke">
        <path d="M 6 8 L 196 4 L 194 160 L 152 202 L 10 198 Z" fill="#F6D96B" />
      </g>
      <path d="M 194 160 L 152 202 L 158 164 Z" fill="#D9B847" />
      <path d="M 6 8 L 196 4 L 194 160 L 152 202 L 10 198 Z" fill="none" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <rect x={66} y={-18} width={72} height={30} fill="rgba(245,240,231,0.78)" transform="rotate(-6 100 0)" />
      {/* mặt */}
      <path d={`M 52 ${by + (brow < 0 ? -4 : 0)} L 84 ${by + (brow < 0 ? 4 : 0)}`} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <path d={`M 116 ${by + (brow < 0 ? 4 : expr === 'smirk' ? -6 : 0)} L 148 ${by + (brow < 0 ? -4 : expr === 'smirk' ? -2 : 0)}`} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      {eye(68, blink, half)}
      {eye(132, blink || expr === 'wink', half)}
      <ellipse cx={48} cy={122} rx={12} ry={7} fill={C.tomato} opacity={0.45} />
      <ellipse cx={152} cy={122} rx={12} ry={7} fill={C.tomato} opacity={0.45} />
      {mouth}
      <text x={20} y={188} fontFamily={F.label} fontWeight={800} fontSize={16} letterSpacing={2} fill={C.ink} opacity={0.55}>
        CCS LAB
      </text>
    </svg>
  );
};
