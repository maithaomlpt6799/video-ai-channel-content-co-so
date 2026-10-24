import {Easing, interpolate, random, spring} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Nhịp stop-motion: giữ mỗi tư thế 2 frame (12 hình/giây) cho vật thể cắt giấy. */
export const onTwos = (frame: number) => Math.floor(frame / 2) * 2;

/** "Boil": giấy rung rất nhẹ, đổi tư thế mỗi 4 frame — cảm giác làm tay. */
export const boil = (frame: number, seed: string, amp = 0.6) => {
  const k = Math.floor(frame / 4);
  return {
    rot: (random(`${seed}-r-${k}`) - 0.5) * 2 * amp,
    x: (random(`${seed}-x-${k}`) - 0.5) * 2 * amp * 1.5,
    y: (random(`${seed}-y-${k}`) - 0.5) * 2 * amp * 1.5,
  };
};

/** Bật vào kiểu cắt giấy: lò xo, lượng tử hoá theo nhịp 2 frame. */
export const pop = (frame: number, start: number, fps: number, stiff = 260) =>
  frame < start ? 0 : spring({frame: onTwos(frame - start), fps, config: {damping: 12, stiffness: stiff, mass: 0.6}});

/** Đập mạnh (stamp/slam): phóng to → đúng kích thước trong ~4 frame. */
export const slam = (frame: number, start: number) => {
  if (frame < start) return {scale: 0, opacity: 0};
  const f = frame - start;
  return {
    scale: interpolate(f, [0, 2, 4, 6], [1.7, 0.94, 1.03, 1], clamp),
    opacity: interpolate(f, [0, 1], [0, 1], clamp),
  };
};

/** Rung ngắn sau va chạm. */
export const shake = (frame: number, start: number, len = 8, amp = 10) => {
  if (frame < start || frame > start + len) return {x: 0, y: 0};
  const d = 1 - (frame - start) / len;
  return {x: Math.sin(frame * 3.1) * amp * d, y: Math.cos(frame * 2.3) * amp * 0.6 * d};
};

export const ease = (frame: number, a: number, b: number, from: number, to: number, e = Easing.bezier(0.65, 0, 0.35, 1)) =>
  interpolate(frame, [a, b], [from, to], {...clamp, easing: e});

export const easeOut = (frame: number, a: number, b: number, from: number, to: number) =>
  interpolate(frame, [a, b], [from, to], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)});

export const progress = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], clamp);
