// =============================================================
//  THE CONTENT LAB — design system của kênh "Content Có Số"
//  Editorial collage · mixed media · kinetic type · 2.5D depth
// =============================================================
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

export const C = {
  ivory: '#F5F0E7',
  ink: '#242321',
  burgundy: '#8B3042',
  butter: '#F6D96B',
  peri: '#A8A8EA',
  lime: '#BFE05A',
  tomato: '#E85A4F',
  white: '#FFFDF8',
  kraft: '#D9C6A3',
};

export const F = {
  headline: 'Anton', // bold condensed, hình khối
  label: 'Barlow Condensed', // nhãn, chú thích kỹ thuật
  serif: 'Playfair Display', // italic nhấn
  hand: 'Patrick Hand', // ghi chú tay (đủ dấu tiếng Việt)
  body: 'Be Vietnam Pro',
};

export const W = 1080;
export const H = 1920;
export const FPS = 30;
/** Vùng an toàn chữ trên TikTok. */
export const SAFE = {top: 230, bottom: 1480, left: 90, right: 930};

const fonts: [string, string, string, string?][] = [
  [F.headline, 'Anton_400Regular.ttf', '400'],
  [F.label, 'BarlowCondensed_600SemiBold.ttf', '600'],
  [F.label, 'BarlowCondensed_800ExtraBold.ttf', '800'],
  [F.serif, 'PlayfairDisplay_400Regular_Italic.ttf', '400', 'italic'],
  [F.serif, 'PlayfairDisplay_700Bold_Italic.ttf', '700', 'italic'],
  [F.hand, 'PatrickHand_400Regular.ttf', '400'],
  [F.body, 'BeVietnamPro_600SemiBold.ttf', '600'],
  [F.body, 'BeVietnamPro_800ExtraBold.ttf', '800'],
];
for (const [family, file, weight, style] of fonts) {
  loadFont({family, url: staticFile(`fonts/${file}`), weight, style: style ?? 'normal'});
}

export const img = (name: string) => staticFile(`lab/img/${name}`);
export const sfx = (name: string) => staticFile(`lab/sfx/sfx_${name}.wav`);
