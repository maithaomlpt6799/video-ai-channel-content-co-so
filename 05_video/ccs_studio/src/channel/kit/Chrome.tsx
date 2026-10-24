import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {markHighlights} from '../../tiktok3ce/components/textUtils';
import {HAND_FONT, SAFE, THEME, UI_FONT, VIDEO} from './theme';
import {Timeline} from './timeline';

/** Nền giấy ấm với vân nhiễu rất nhẹ. */
export const PaperBackground: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: THEME.bg}}>
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
      <filter id="paper-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-noise)" opacity={0.07} />
    </svg>
  </AbsoluteFill>
);

/** Tem tên series ở trên cùng — người xem nhận ra series ngay giây đầu. */
export const SeriesTag: React.FC<{series: string; number: string}> = ({series, number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 14, stiffness: 200}});
  return (
    <div style={{position: 'absolute', zIndex: 10, top: SAFE.top + 4, left: 0, width: VIDEO.width, display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          padding: '6px 26px 8px',
          border: `4px solid ${THEME.ink}`,
          borderRadius: 999,
          backgroundColor: THEME.paper,
          fontFamily: HAND_FONT,
          fontSize: 44,
          color: THEME.ink,
          rotate: '-2deg',
          scale: String(0.7 + 0.3 * pop),
          opacity: pop,
          boxShadow: `5px 5px 0 ${THEME.ink}`,
        }}
      >
        {series} · <span style={{color: THEME.accent}}>{number}</span>
      </div>
    </div>
  );
};

/** Phụ đề lớn theo từng cụm, từ khoá tô màu nhấn (kiểu kênh tham khảo: chữ đậm trên nền giấy). */
export const Caption: React.FC<{timeline: Timeline; top?: number}> = ({timeline, top = 1172}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = timeline.timings.find((x) => frame >= x.speechStart && frame < x.from + x.durationInFrames);
  if (!t) return null;
  let idx = -1;
  t.chunkStarts.forEach((s, i) => {
    if (frame >= s) idx = i;
  });
  if (idx < 0) return null;
  const text = t.beat.chunks[idx].text;
  const pop = spring({frame: frame - t.chunkStarts[idx], fps, config: {damping: 14, stiffness: 260, mass: 0.6}});
  const size = Math.min(68, Math.floor(840 / (text.length * 0.58)));
  const parts = markHighlights(text, t.beat.highlight);
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        top,
        left: SAFE.left,
        width: VIDEO.width - SAFE.left - SAFE.right,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: UI_FONT,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.15,
        color: THEME.ink,
        scale: String(0.85 + 0.15 * pop),
        opacity: Math.min(1, pop * 1.8),
      }}
    >
      <div style={{padding: '8px 22px 12px', borderRadius: 22, backgroundColor: 'rgba(243, 239, 231, 0.94)'}}>
        {parts.map(({word, highlighted}, i) => (
          <React.Fragment key={i}>
            <span style={highlighted ? {color: THEME.accent} : undefined}>{word}</span>
            {i < parts.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/**
 * Mascot "Mực" — cây bút dạ có mắt, người dẫn chuyện thay cho khuôn mặt.
 * Miệng mấp máy khi đang có thoại, chớp mắt, nhún nhẹ.
 */
export const Mascot: React.FC<{timeline: Timeline; x?: number; y?: number; waveFrom?: number}> = ({
  timeline,
  x = 70,
  y = 1330,
  waveFrom,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 4, fps, config: {damping: 12, stiffness: 160}});
  const speaking = timeline.timings.some((t) => frame >= t.speechStart && frame < t.speechStart + t.speechFrames);
  const open = speaking ? Math.abs(Math.sin(frame * 0.9)) * (0.45 + 0.55 * Math.abs(Math.sin(frame * 0.37))) : 0;
  const blink = frame % 96 < 4 ? 0.12 : 1;
  const bob = Math.sin((frame / fps) * Math.PI * 1.6) * 5;
  const waving = waveFrom !== undefined && frame >= waveFrom;
  const arm = waving ? Math.sin(((frame - waveFrom) / fps) * Math.PI * 4) * 18 : 0;
  const ink = THEME.ink;
  return (
    <svg
      width={190}
      height={250}
      viewBox="0 0 170 240"
      style={{position: 'absolute', zIndex: 10, left: x, top: y, translate: `0px ${bob + (1 - enter) * 300}px`, overflow: 'visible'}}
    >
      <ellipse cx={85} cy={236} rx={52} ry={7} fill="rgba(0,0,0,0.08)" />
      <path d="M 65 205 L 62 230 M 105 205 L 108 230" stroke={ink} strokeWidth={5} strokeLinecap="round" />
      <path d="M 36 150 L 12 176" stroke={ink} strokeWidth={5} strokeLinecap="round" />
      <path d={`M 134 150 L 160 ${126 - arm}`} stroke={ink} strokeWidth={5} strokeLinecap="round" />
      <rect x={35} y={62} width={100} height={148} rx={30} fill="#FFFFFF" stroke={ink} strokeWidth={5} />
      <rect x={35} y={22} width={100} height={62} rx={26} fill={THEME.accent} stroke={ink} strokeWidth={5} />
      <rect x={70} y={10} width={30} height={16} rx={6} fill={THEME.accent} stroke={ink} strokeWidth={4} />
      <g transform={`translate(0 ${120 * (1 - blink)}) scale(1 ${blink})`}>
        <circle cx={68} cy={120} r={7} fill={ink} />
        <circle cx={102} cy={120} r={7} fill={ink} />
      </g>
      <circle cx={56} cy={140} r={8} fill="#F2A9A9" opacity={0.6} />
      <circle cx={114} cy={140} r={8} fill="#F2A9A9" opacity={0.6} />
      {open > 0.05 ? (
        <ellipse cx={85} cy={150} rx={10} ry={2 + 9 * open} fill={ink} />
      ) : (
        <path d="M 74 146 Q 85 157 96 146" fill="none" stroke={ink} strokeWidth={4} strokeLinecap="round" />
      )}
    </svg>
  );
};
