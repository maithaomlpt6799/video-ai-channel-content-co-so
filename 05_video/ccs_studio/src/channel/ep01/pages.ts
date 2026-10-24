import {Anchor, DrawItem, PageSpec} from '../kit/types';

/** Mốc vẽ: cụm phụ đề thứ `chunk` của `beat`, cộng thêm `offset` giây. */
const at = (beat: string, chunk: number, offset = 0): Anchor => ({beat, chunk, offset});
const rect = (x: number, y: number, w: number, h: number) =>
  `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
const circle = (cx: number, cy: number, r: number) =>
  `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
const arrowDown = (x: number, y1: number, y2: number) =>
  `M ${x} ${y1} L ${x} ${y2} M ${x - 22} ${y2 - 24} L ${x} ${y2} L ${x + 22} ${y2 - 24}`;
const arrowRight = (x1: number, x2: number, y: number) =>
  `M ${x1} ${y} L ${x2} ${y} M ${x2 - 22} ${y - 16} L ${x2} ${y} M ${x2 - 22} ${y + 16} L ${x2} ${y}`;

const SINGLE = [{x: 80, y: 330, w: 920, h: 800}];

// ---------- Trang 1 · HOOK: bóng đèn "ý tưởng" → "công thức" ----------
const hook: DrawItem[] = [
  {kind: 'path', at: at('b01', 0), dur: 0.9, width: 7, d: 'M 480 735 C 405 670 425 500 540 495 C 655 500 675 670 600 735 L 595 770 L 485 770 Z'},
  {kind: 'path', at: at('b01', 0, 0.75), dur: 0.35, d: 'M 492 798 L 588 798 M 505 824 L 575 824'},
  {kind: 'path', at: at('b01', 0, 0.9), dur: 0.4, d: 'M 540 452 L 540 412 M 405 522 L 372 502 M 675 522 L 708 502 M 382 642 L 345 648 M 698 642 L 735 648'},
  {kind: 'text', text: 'Ý TƯỞNG', x: 540, y: 900, size: 76, at: at('b01', 0, 0.55), dur: 0.6},
  {kind: 'path', at: at('b01', 1), dur: 0.35, d: arrowDown(540, 925, 990)},
  {kind: 'path', at: at('b01', 2), dur: 0.5, color: 'accent', width: 7, d: rect(300, 1002, 480, 100)},
  {kind: 'text', text: 'CÔNG THỨC', x: 540, y: 1076, size: 72, color: 'accent', at: at('b01', 2, 0.35), dur: 0.6},
];

// ---------- Trang 2 · SO SÁNH: cách thường vs cách ra số ----------
const compare: DrawItem[] = [
  // Trái: cách thường
  {kind: 'text', text: 'CÁCH THƯỜNG', x: 285, y: 432, size: 56, at: at('b02', 0), dur: 0.6},
  {kind: 'path', at: at('b02', 0, 0.55), dur: 0.3, width: 5, d: 'M 150 456 C 230 464 340 450 420 458'},
  {kind: 'path', at: at('b02', 1), dur: 0.55, width: 9, d: 'M 245 540 C 245 492 327 492 327 545 C 327 588 285 592 285 632'},
  {kind: 'path', at: at('b02', 1, 0.5), dur: 0.1, width: 13, d: 'M 285 672 L 286 676'},
  {kind: 'text', text: 'Hôm nay quay gì?', x: 285, y: 750, size: 44, at: at('b02', 1, 0.45), dur: 0.7},
  {kind: 'path', at: at('b02', 2), dur: 0.6, d: 'M 245 790 L 325 790 Q 345 790 345 810 L 345 980 Q 345 1000 325 1000 L 245 1000 Q 225 1000 225 980 L 225 810 Q 225 790 245 790 Z'},
  {kind: 'path', at: at('b02', 2, 0.5), dur: 0.5, width: 5, d: 'M 245 832 L 325 832 M 245 864 L 308 864 M 245 896 L 325 896 M 245 928 L 298 928'},
  {kind: 'path', at: at('b02', 2, 0.7), dur: 0.4, width: 5, d: 'M 382 965 C 405 925 405 860 382 820 M 368 836 L 382 818 L 398 834'},
  {kind: 'text', text: '= 0 ý tưởng', x: 285, y: 1075, size: 50, at: at('b02', 3), dur: 0.6},
  // Phải: cách ra số
  {kind: 'text', text: 'CÁCH RA SỐ', x: 755, y: 432, size: 56, color: 'accent', at: at('b03', 0), dur: 0.6},
  {kind: 'path', at: at('b03', 0, 0.55), dur: 0.3, width: 5, color: 'accent', d: 'M 625 456 C 700 464 810 450 885 458'},
  {kind: 'text', text: 'chủ đề?', x: 755, y: 534, size: 44, at: at('b03', 1), dur: 0.45},
  {kind: 'path', at: at('b03', 1, 0.5), dur: 0.25, width: 6, d: 'M 680 520 C 720 516 790 522 832 518'},
  {kind: 'path', at: at('b03', 3), dur: 0.4, color: 'accent', width: 6, d: rect(605, 580, 300, 80)},
  {kind: 'text', text: 'AI', x: 755, y: 636, size: 50, at: at('b03', 3, 0.25), dur: 0.3},
  {kind: 'text', text: '×', x: 755, y: 716, size: 46, at: at('b03', 4), dur: 0.2},
  {kind: 'path', at: at('b03', 4), dur: 0.4, color: 'accent', width: 6, d: rect(605, 730, 300, 80)},
  {kind: 'text', text: 'NỖI ĐAU', x: 755, y: 786, size: 50, at: at('b03', 4, 0.25), dur: 0.4},
  {kind: 'text', text: '×', x: 755, y: 866, size: 46, at: at('b03', 5), dur: 0.2},
  {kind: 'path', at: at('b03', 5), dur: 0.4, color: 'accent', width: 6, d: rect(605, 880, 300, 80)},
  {kind: 'text', text: 'KHOẢNH KHẮC', x: 755, y: 936, size: 46, at: at('b03', 5, 0.25), dur: 0.5},
  {kind: 'text', text: '= ý tưởng', x: 755, y: 1050, size: 50, color: 'accent', at: at('b03', 5, 0.8), dur: 0.5},
];

// ---------- Trang 3 · VÍ DỤ: điền 3 ô → ra một video ----------
const example: DrawItem[] = [
  {kind: 'path', at: at('b04', 0), dur: 0.3, color: 'accent', width: 6, d: rect(100, 400, 240, 90)},
  {kind: 'text', text: 'AI', x: 220, y: 461, size: 44, at: at('b04', 0, 0.15), dur: 0.25},
  {kind: 'path', at: at('b04', 0, 0.25), dur: 0.3, color: 'accent', width: 6, d: rect(400, 400, 240, 90)},
  {kind: 'text', text: 'NỖI ĐAU', x: 520, y: 461, size: 44, at: at('b04', 0, 0.4), dur: 0.3},
  {kind: 'path', at: at('b04', 0, 0.5), dur: 0.3, color: 'accent', width: 6, d: rect(700, 400, 240, 90)},
  {kind: 'text', text: 'KHOẢNH KHẮC', x: 820, y: 461, size: 40, at: at('b04', 0, 0.65), dur: 0.35},
  {kind: 'text', text: '×', x: 370, y: 460, size: 44, at: at('b04', 0, 0.75), dur: 0.15},
  {kind: 'text', text: '×', x: 670, y: 460, size: 44, at: at('b04', 0, 0.85), dur: 0.15},
  // Ai: mẹ bỉm đi làm
  {kind: 'path', at: at('b04', 1), dur: 0.35, d: circle(220, 560, 30)},
  {kind: 'path', at: at('b04', 1, 0.3), dur: 0.3, d: 'M 165 652 C 170 606 270 606 275 652'},
  {kind: 'text', text: 'Mẹ bỉm', x: 220, y: 712, size: 40, at: at('b04', 1, 0.5), dur: 0.35},
  {kind: 'text', text: 'đi làm', x: 220, y: 756, size: 40, at: at('b04', 1, 0.8), dur: 0.3},
  // Nỗi đau: không kịp nấu bữa sáng
  {kind: 'path', at: at('b04', 2), dur: 0.4, d: 'M 465 600 L 575 600 C 575 650 465 650 465 600 Z M 575 606 L 640 590'},
  {kind: 'path', at: at('b04', 2, 0.35), dur: 0.3, width: 5, d: 'M 500 575 C 490 560 510 550 500 535 M 535 575 C 525 560 545 550 535 535'},
  {kind: 'text', text: 'Không kịp', x: 520, y: 712, size: 40, at: at('b04', 2, 0.5), dur: 0.4},
  {kind: 'text', text: 'nấu bữa sáng', x: 520, y: 756, size: 40, at: at('b04', 2, 0.85), dur: 0.45},
  // Khoảnh khắc: 6h30 sáng
  {kind: 'path', at: at('b04', 3), dur: 0.4, d: circle(820, 595, 50)},
  {kind: 'path', at: at('b04', 3, 0.35), dur: 0.25, width: 6, d: 'M 820 595 L 820 634 M 820 595 L 808 626'},
  {kind: 'text', text: '6h30', x: 820, y: 712, size: 40, at: at('b04', 3, 0.5), dur: 0.3},
  {kind: 'text', text: 'sáng', x: 820, y: 756, size: 40, at: at('b04', 3, 0.75), dur: 0.25},
  // Ghép lại thành 1 video
  {kind: 'path', at: at('b05', 0), dur: 0.35, d: arrowDown(520, 790, 850)},
  {kind: 'path', at: at('b05', 0, 0.3), dur: 0.6, color: 'accent', width: 6, d: rect(240, 868, 560, 230)},
  {kind: 'path', at: at('b05', 0, 0.85), dur: 0.25, width: 5, d: 'M 272 892 L 272 932 L 304 912 Z'},
  {kind: 'text', text: '“6h30 sáng,', x: 520, y: 960, size: 46, at: at('b05', 1), dur: 0.55},
  {kind: 'text', text: '10 phút cho bữa sáng', x: 520, y: 1016, size: 46, at: at('b05', 2), dur: 0.8},
  {kind: 'text', text: 'cả nhà”', x: 520, y: 1070, size: 46, at: at('b05', 2, 0.7), dur: 0.35},
  // Người xem thấy chính mình → khoanh tròn ô "Ai"
  {kind: 'path', at: at('b05', 3), dur: 0.6, color: 'accent', width: 6, d: 'M 140 640 C 130 540 300 515 312 620 C 322 720 160 790 140 640'},
];

// ---------- Trang 4 · NHÂN BẢN: 3 × 3 × 3 = 27 ----------
const col = [220, 520, 820];
const rows = [520, 582, 644];
const chip = (text: string, c: number, r: number, beat: string, chunk: number, offset: number): DrawItem => ({
  kind: 'text',
  text,
  x: col.at(c) ?? 0,
  y: rows.at(r) ?? 0,
  size: 40,
  at: at(beat, chunk, offset),
  dur: 0.3,
});
const multiply: DrawItem[] = [
  {kind: 'text', text: 'AI', x: 220, y: 440, size: 46, color: 'accent', at: at('b06', 0), dur: 0.25},
  {kind: 'text', text: 'NỖI ĐAU', x: 520, y: 440, size: 46, color: 'accent', at: at('b06', 0, 0.2), dur: 0.3},
  {kind: 'text', text: 'KHOẢNH KHẮC', x: 820, y: 440, size: 42, color: 'accent', at: at('b06', 0, 0.45), dur: 0.4},
  {kind: 'path', at: at('b06', 0, 0.8), dur: 0.4, width: 4, d: 'M 120 466 L 940 466'},
  {kind: 'path', at: at('b06', 1), dur: 0.5, width: 4, d: 'M 370 490 L 370 670 M 670 490 L 670 670'},
  chip('Mẹ bỉm', 0, 0, 'b06', 2, 0),
  chip('Sinh viên', 0, 1, 'b06', 2, 0.25),
  chip('Dân văn phòng', 0, 2, 'b06', 2, 0.5),
  chip('Không kịp nấu', 1, 0, 'b06', 3, 0),
  chip('Hết tiền', 1, 1, 'b06', 3, 0.25),
  chip('Da nổi mụn', 1, 2, 'b06', 3, 0.5),
  chip('6h30 sáng', 2, 0, 'b06', 4, 0),
  chip('Giờ nghỉ trưa', 2, 1, 'b06', 4, 0.25),
  chip('Trước khi ngủ', 2, 2, 'b06', 4, 0.5),
  {kind: 'text', text: '3 × 3 × 3 =', x: 430, y: 860, size: 84, at: at('b06', 5), dur: 0.5},
  {kind: 'count', to: 27, x: 760, y: 878, size: 170, color: 'accent', at: at('b06', 5, 0.35), dur: 0.6},
  {kind: 'path', at: at('b06', 5, 0.9), dur: 0.5, color: 'accent', width: 7, d: 'M 650 820 C 640 720 870 700 880 810 C 890 920 660 930 650 820'},
  {kind: 'text', text: 'VIDEO', x: 760, y: 1010, size: 70, color: 'accent', at: at('b06', 5, 0.75), dur: 0.4},
];

// ---------- Trang 5 · CTA ----------
const cta: DrawItem[] = [
  {kind: 'path', at: at('b07', 0), dur: 0.8, width: 7, d: 'M 190 430 L 890 430 Q 920 430 920 460 L 920 600 Q 920 630 890 630 L 340 630 L 282 692 L 292 630 L 190 630 Q 160 630 160 600 L 160 460 Q 160 430 190 430 Z'},
  {kind: 'text', text: 'ý tưởng', x: 540, y: 565, size: 104, color: 'accent', at: at('b07', 0, 0.45), dur: 0.6},
  {kind: 'path', at: at('b07', 1), dur: 0.25, width: 5, d: rect(330, 735, 120, 80)},
  {kind: 'path', at: at('b07', 1, 0.2), dur: 0.25, width: 5, d: rect(480, 735, 120, 80)},
  {kind: 'path', at: at('b07', 1, 0.4), dur: 0.25, width: 5, d: rect(630, 735, 120, 80)},
  {kind: 'text', text: 'Bảng 3 ô', x: 540, y: 872, size: 46, at: at('b07', 1, 0.6), dur: 0.4},
  {kind: 'text', text: 'PHẦN 2', x: 540, y: 990, size: 86, at: at('b07', 2), dur: 0.5},
  {kind: 'text', text: 'Ý tưởng', x: 330, y: 1080, size: 50, at: at('b07', 3), dur: 0.4},
  {kind: 'path', at: at('b07', 3, 0.35), dur: 0.3, width: 6, d: arrowRight(440, 610, 1064)},
  {kind: 'text', text: 'HOOK', x: 720, y: 1080, size: 56, color: 'accent', at: at('b07', 3, 0.6), dur: 0.35},
];

export const PAGES: PageSpec[] = [
  {id: 'hook', papers: SINGLE, items: hook},
  {
    id: 'compare',
    papers: [
      {x: 60, y: 340, w: 450, h: 790},
      {x: 530, y: 340, w: 450, h: 790},
    ],
    items: compare,
  },
  {id: 'example', papers: SINGLE, items: example},
  {id: 'multiply', papers: SINGLE, items: multiply},
  {id: 'cta', papers: SINGLE, items: cta},
];
