import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {C, F, SAFE, img} from './theme';

/** Nền giấy: màu chính của cảnh × texture xơ giấy (multiply). */
export const PaperBG: React.FC<{color?: string; grid?: boolean; grain?: number; children?: React.ReactNode}> = ({
  color = C.ivory,
  grid = false,
  grain = 0.55,
  children,
}) => (
  <AbsoluteFill style={{backgroundColor: color}}>
    <Img
      src={img('paper_grain.png')}
      style={{position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'multiply', opacity: grain}}
    />
    {grid ? (
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="lab-grid" width="54" height="54" patternUnits="userSpaceOnUse">
            <path d="M 54 0 L 0 0 0 54" fill="none" stroke={C.ink} strokeOpacity={0.07} strokeWidth={1.5} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lab-grid)" />
      </svg>
    ) : null}
    {children}
  </AbsoluteFill>
);

/** Hạt nhiễu photocopy, "sôi" theo nhịp 2 frame. */
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.07}) => {
  const frame = useCurrentFrame();
  const i = Math.floor(frame / 2) % 3;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity}}>
      <Img src={img(`grain_${i}.png`)} style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};

/** Dòng folio kiểu tạp chí ở đầu trang. */
export const Folio: React.FC<{left?: string; right?: string; color?: string}> = ({
  left = 'CONTENT CÓ SỐ',
  right = 'N°01 · THE CONTENT LAB',
  color = C.ink,
}) => (
  <div
    style={{
      position: 'absolute',
      top: SAFE.top - 6,
      left: SAFE.left,
      width: SAFE.right - SAFE.left,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: F.label,
      fontWeight: 800,
      fontSize: 30,
      letterSpacing: 3,
      color,
      borderBottom: `3px solid ${color}`,
      paddingBottom: 8,
    }}
  >
    <span>{left}</span>
    <span style={{fontWeight: 600}}>{right}</span>
  </div>
);
