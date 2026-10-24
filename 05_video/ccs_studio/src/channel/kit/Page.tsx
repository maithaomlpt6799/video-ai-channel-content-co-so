import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {InkLayer} from './Ink';
import {THEME} from './theme';
import {PageTiming} from './timeline';
import {Anchor, PageSpec} from './types';

/**
 * Một "tờ giấy": trượt lên khi vào, trượt sang trái khi tờ tiếp theo đè lên.
 * Toàn bộ nét vẽ của trang nằm trong InkLayer, cùng xoay nhẹ với giấy.
 */
export const Page: React.FC<{
  spec: PageSpec;
  timing: PageTiming;
  exitFrames: number;
  anchorFrame: (a: Anchor) => number;
  tilt?: number;
}> = ({spec, timing, exitFrames, anchorFrame, tilt = -0.8}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter =
    timing.enterFrames > 0 ? spring({frame, fps, config: {damping: 18, stiffness: 140}, durationInFrames: timing.enterFrames + 6}) : 1;
  const exitStart = timing.durationInFrames - exitFrames;
  const exit = exitFrames > 0 ? interpolate(frame, [exitStart, timing.durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;

  return (
    <AbsoluteFill
      style={{
        translate: `${-exit * 1250}px ${(1 - enter) * 1500}px`,
        rotate: `${tilt + (1 - enter) * 6 - exit * 8}deg`,
      }}
    >
      {spec.papers.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.w,
            height: p.h,
            backgroundColor: THEME.paper,
            borderRadius: 10,
            boxShadow: '0 22px 48px rgba(60, 45, 20, 0.14), 0 2px 6px rgba(60, 45, 20, 0.08)',
          }}
        />
      ))}
      <InkLayer items={spec.items} pageFrom={timing.from} anchorFrame={anchorFrame} idPrefix={spec.id} />
    </AbsoluteFill>
  );
};
