import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

/** Bộ nhận diện kênh: giấy trắng ấm, mực đen, MỘT màu nhấn xanh mực. */
export const THEME = {
  bg: '#F3EFE7',
  paper: '#FFFEFB',
  ink: '#1E1E1E',
  accent: '#2B59C3',
  skin: '#F4CDB0',
  quiet: '#8A847A',
};

export const HAND_FONT = 'Patrick Hand';
export const UI_FONT = 'Be Vietnam Pro';

export const VIDEO = {width: 1080, height: 1920, fps: 30};

/** Vùng an toàn TikTok cho chữ quan trọng. */
export const SAFE = {top: 220, bottom: 440, left: 90, right: 150};

// Font đóng gói sẵn trong public/fonts (đủ dấu tiếng Việt), không tải mạng khi render.
loadFont({family: HAND_FONT, url: staticFile('fonts/PatrickHand_400Regular.ttf'), weight: '400'});
for (const [weight, file] of [
  ['700', 'BeVietnamPro_700Bold.ttf'],
  ['800', 'BeVietnamPro_800ExtraBold.ttf'],
  ['900', 'BeVietnamPro_900Black.ttf'],
] as const) {
  loadFont({family: UI_FONT, url: staticFile(`fonts/${file}`), weight});
}

export const inkColor = (c?: 'ink' | 'accent') => (c === 'accent' ? THEME.accent : THEME.ink);
