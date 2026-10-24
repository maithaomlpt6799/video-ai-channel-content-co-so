// "Bé Tiền Tít" — mascot chốt của Content Có Số (channel_bible mục 8).
// Pose cắt từ 04_creative/thu_vien/mascot/be_tien_tit_sheet.png, giữ nguyên tạo hình, chỉ thêm viền sticker trắng.
// Phản ứng không lời: nảy vào, nhún nhẹ theo nhịp "on twos", lắc khi đổi cảm xúc.
import React from 'react';
import {Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {onTwos, pop} from './fx';
import {img} from './theme';

export type Pose = 'judge' | 'celebrate' | 'idea';

/** Tỉ lệ cao/rộng của từng file pose. */
const RATIO: Record<Pose, number> = {judge: 265 / 237, celebrate: 261 / 286, idea: 284 / 241};

export const TienTit: React.FC<{
  pose: Pose;
  w: number;
  start: number; // frame bắt đầu nảy vào
  style?: React.CSSProperties;
}> = ({pose, w, start, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < start) return null;
  const t = onTwos(frame - start);
  const p = pop(frame, start, fps, 240);
  // nén – giãn khi chạm đất, rồi nhún nhẹ
  const squash = 1 + Math.sin(t * 0.55) * 0.09 * Math.max(0, 1 - t / 16);
  const bob = Math.sin(t * 0.32) * 5;
  const tilt = Math.sin(t * 0.21) * 2.2;
  return (
    <div style={{position: 'absolute', width: w, height: w * RATIO[pose], transformOrigin: '50% 100%', ...style}}>
      <Img
        src={img(`mascot/tien_tit_${pose}.png`)}
        style={{
          width: '100%',
          scale: `${p / squash} ${p * squash}`,
          translate: `0px ${bob}px`,
          rotate: `${tilt}deg`,
          transformOrigin: '50% 100%',
          filter: 'drop-shadow(6px 9px 0 rgba(36,35,33,0.22))',
        }}
      />
    </div>
  );
};
