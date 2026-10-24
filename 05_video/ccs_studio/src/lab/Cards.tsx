import React from 'react';
import {Img} from 'remotion';
import {Tape} from './Scrap';
import {C, F, img} from './theme';

/** Thẻ mẫu vật (specimen card) — một biến số của công thức. */
export const SpecimenCard: React.FC<{
  no: string;
  label: string;
  title: string;
  color: string;
  w?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({no, label, title, color, w = 420, size, style}) => (
  <div
    style={{
      position: 'absolute',
      width: w,
      backgroundColor: C.white,
      boxShadow: '10px 14px 0 rgba(36,35,33,0.2)',
      border: `3px solid ${C.ink}`,
      ...style,
    }}
  >
    <Tape x={w / 2 - 70} y={-24} w={140} rot={-5} />
    <div
      style={{
        backgroundColor: color,
        borderBottom: `3px solid ${C.ink}`,
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: F.label,
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: 3,
        color: C.ink,
      }}
    >
      <span>SPECIMEN</span>
      <span>{no}</span>
    </div>
    <div style={{padding: '18px 22px 22px'}}>
      <div style={{fontFamily: F.headline, fontSize: size ?? w * 0.25, lineHeight: 1, color: C.ink, whiteSpace: 'nowrap'}}>{title}</div>
      <div
        style={{
          marginTop: 12,
          fontFamily: F.serif,
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: w * 0.095,
          color: C.burgundy,
        }}
      >
        {label}
      </div>
    </div>
  </div>
);

/** Vé ý tưởng (idea ticket) có răng cưa xé — nơi viết công thức. */
export const Ticket: React.FC<{w?: number; style?: React.CSSProperties; children: React.ReactNode; stub?: string}> = ({
  w = 900,
  style,
  children,
  stub = 'IDEA TICKET',
}) => (
  <div
    style={{
      position: 'absolute',
      width: w,
      display: 'flex',
      filter: 'drop-shadow(10px 14px 0 rgba(36,35,33,0.2))',
      ...style,
    }}
  >
    <div
      style={{
        width: 92,
        backgroundColor: C.burgundy,
        color: C.ivory,
        fontFamily: F.label,
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: 4,
        writingMode: 'vertical-rl',
        rotate: '180deg',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: `4px dashed ${C.ivory}`,
      }}
    >
      {stub}
    </div>
    <div style={{flex: 1, backgroundColor: C.ivory, position: 'relative', padding: '22px 28px', border: `4px solid ${C.burgundy}`, borderLeft: 'none'}}>
      <Img src={img('paper_grain.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'multiply', opacity: 0.75}} />
      <div style={{position: 'relative'}}>{children}</div>
    </div>
  </div>
);

/** Bìa tạp chí: nền màu full-bleed, masthead, số phát hành. Nội dung là children (đã định vị tuyệt đối). */
export const CoverShell: React.FC<{
  color: string;
  issue: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({color, issue, children, style}) => (
  <div style={{position: 'absolute', width: 1080, height: 1920, backgroundColor: color, overflow: 'hidden', ...style}}>
    <Img src={img('paper_grain.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'multiply', opacity: 0.75}} />
    <div
      style={{
        position: 'absolute',
        top: 226,
        left: 90,
        width: 840,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `4px solid ${C.ink}`,
        paddingBottom: 6,
      }}
    >
      <span style={{fontFamily: F.headline, fontSize: 58, color: C.ink, letterSpacing: 2}}>CONTENT CÓ SỐ</span>
      <span style={{fontFamily: F.label, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.ink}}>{issue}</span>
    </div>
    {children}
  </div>
);
