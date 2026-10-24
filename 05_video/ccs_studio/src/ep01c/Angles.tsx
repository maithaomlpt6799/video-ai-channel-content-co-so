// Ba content angle mới (revision V3) — ba cơ chế sáng tạo khác nhau, cùng một thỏi son đỏ.
// A1 BOLD STATEMENT · A2 RELATABLE STORYTELLING · A3 MYTH BUSTING
import React from 'react';
import {Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {HERO_POS, Pedestal} from './Sc3Pivot';
import {cue, SCENE} from './timing';
import {ease, easeOut, onTwos, pop, shake, slam} from '../lab/fx';
import {Stamp} from '../lab/Marks';
import {PaperBG} from '../lab/Paper';
import {AlarmClock, Checklist, Crown, HandMirror, Handbag, Laptop, Lipstick, Smear, Starburst} from '../lab/Props';
import {TornScrap} from '../lab/Scrap';
import {HandNote, Headline, Kicker} from '../lab/Type';
import {C, F, img} from '../lab/theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const A1_LEN = SCENE.a2 - SCENE.a1;
export const A2_LEN = SCENE.a3 - SCENE.a2;
export const A3_LEN = SCENE.pay - SCENE.a3;

/** Vị trí cuối của son + vương miện trong Angle 01 (để zoom vào vương miện). */
const A1_LIP = {left: 640, top: 630, w: 262};
const A1_CROWN = {left: 668, top: 568, w: 190};
const CROWN_CENTER = {x: A1_CROWN.left + 95, y: A1_CROWN.top + 65};

/* ---------------------------------------------------------------- A1 */
export const AngleBold: React.FC<{zoomOut?: boolean}> = ({zoomOut = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r = (abs: number) => abs - SCENE.a1;
  const tQ = r(cue('p2b', 'noi_bat'));
  const tSon = r(cue('p2b', 'son_do'));
  const tQueen = r(cue('p2b', 'ba_hoang'));
  const tAll = r(cue('p2b', 'moi_mau'));

  const move = ease(frame, 4, 18, 0, 1);
  const lip = {
    left: HERO_POS.left + (A1_LIP.left - HERO_POS.left) * move,
    top: HERO_POS.top + (A1_LIP.top - HERO_POS.top) * move,
    w: HERO_POS.w + (A1_LIP.w - HERO_POS.w) * move,
  };
  const crownDrop = easeOut(onTwos(frame), tQueen, tQueen + 8, -700, 0);
  const sh = shake(frame, tQueen + 8, 8, 10);
  const spot = interpolate(frame, [tSon - 2, tSon + 4], [0, 1], clamp);
  // zoom vào vương miện để chuyển sang Angle 02
  const z = zoomOut ? ease(frame, A1_LEN - 10, A1_LEN, 1, 5.5) : 1;

  const court: [React.ComponentProps<typeof Lipstick>['shade'], number, number, number, number][] = [
    ['nude', 90, 1040, 112, -14],
    ['pink', 218, 1100, 100, -4],
    ['coral', 336, 1060, 108, 8],
    ['plum', 456, 1130, 96, 16],
  ];

  return (
    <PaperBG color={C.butter}>
      <div style={{position: 'absolute', inset: 0, scale: String(z), transformOrigin: `${CROWN_CENTER.x}px ${CROWN_CENTER.y}px`}}>
        <div style={{position: 'absolute', inset: 0, translate: `${sh.x}px ${sh.y}px`}}>
          <Starburst w={760} color={C.ivory} points={16} style={{left: 400, top: 560, rotate: `${frame * 0.25}deg`, opacity: 0.9}} />
          {/* ánh đèn sân khấu */}
          <div
            style={{
              position: 'absolute',
              left: 420,
              top: 0,
              width: 700,
              height: 1600,
              background: 'linear-gradient(180deg, rgba(255,253,248,0.0), rgba(255,253,248,0.65) 55%, rgba(255,253,248,0))',
              clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)',
              opacity: spot * 0.85,
            }}
          />
          <Smear w={1100} soft style={{left: 120, top: 1180, rotate: '-16deg', opacity: 0.95}} />
          <Pedestal y={1420} style={{left: 530}} />
          {court.map(([shade, x, y, w, rot], i) => {
            const p = pop(frame, 6 + i * 3, fps, 260);
            return <Lipstick key={shade} shade={shade} w={w} shadow="hard" style={{left: x, top: y, rotate: `${rot}deg`, scale: String(p), filter: 'drop-shadow(0 0 0 #fff) drop-shadow(6px 10px 0 rgba(36,35,33,0.18)) saturate(0.85)'}} />;
          })}
          <Lipstick w={lip.w} style={{left: lip.left, top: lip.top}} />
          {frame >= tQueen ? <Crown w={A1_CROWN.w} style={{left: A1_CROWN.left, top: A1_CROWN.top + crownDrop, rotate: '28deg'}} /> : null}
          {frame >= tQueen + 6
            ? [
                [610, 470, 60],
                [880, 520, 46],
                [600, 640, 34],
              ].map(([x, y, w], i) => <Starburst key={i} w={w} color={C.white} points={4} style={{left: x, top: y, scale: String(pop(frame, tQueen + 6 + i * 2, fps, 320))}} />)
            : null}
        </div>

        <Kicker text="ANGLE 01 · BOLD STATEMENT" color={C.burgundy} size={34} style={{left: 92, top: 236}} />
        {frame >= tQ ? (
          <TornScrap w={250} h={74} color={C.tomato} seed="a1q" style={{left: 690, top: 300, rotate: '6deg', scale: String(slam(frame, tQ).scale)}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.headline, fontSize: 44, color: C.white}}>NỔI BẬT?</div>
          </TornScrap>
        ) : null}
        <Headline start={tSon} size={104} lines={[{text: 'Son đỏ —', italic: true, color: C.burgundy}]} style={{left: 88, top: 300}} />
        <Headline start={tQueen} size={200} lineHeight={0.92} stagger={3} lines={[{text: 'BÀ'}, {text: 'HOÀNG'}]} style={{left: 84, top: 420}} />
        <Headline
          start={tAll}
          size={70}
          stagger={3}
          lines={[{text: 'CỦA MỌI', color: C.ink}, {text: 'MÀU SON!', color: C.ivory, bg: C.burgundy}]}
          style={{left: 90, top: 812}}
        />
      </div>
    </PaperBG>
  );
};

/* ---------------------------------------------------------------- A2 */
export const AngleStory: React.FC<{transitionOut?: boolean}> = ({transitionOut = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r = (abs: number) => abs - SCENE.a2;
  const tGan = r(cue('p2c', 'gan_gui'));
  const tDay = r(cue('p2c', 'day_muon'));
  const tPhut = r(cue('p2c', 'phut'));
  const tXinh = r(cue('p2c', 'xinh'));

  // vương miện (zoom từ A1) co lại thành đồng hồ báo thức ở góc trái
  const m = easeOut(onTwos(frame), 0, 12, 0, 1);
  const clockW = 900 + (300 - 900) * m;
  const clockL = 90 + (70 - 90) * m;
  const clockT = 520 + (300 - 520) * m;
  const crownFade = interpolate(frame, [0, 5], [1, 0], clamp);
  const ring = frame > 8 ? (Math.floor(frame / 2) % 2 ? 6 : -6) * (frame < tGan + 20 ? 1 : 0.35) : 0;
  const sh = shake(frame, tDay, 10, 9);
  // chuyển sang A3: đồng hồ trượt về giữa và phóng to
  const out = transitionOut ? ease(frame, A2_LEN - 9, A2_LEN, 0, 1) : 0;
  const cw = clockW + (560 - clockW) * out;
  const cl = clockL + (260 - clockL) * out;
  const ct = clockT + (560 - clockT) * out;

  return (
    <PaperBG color={C.peri}>
      <div style={{position: 'absolute', inset: 0, translate: `${sh.x}px ${sh.y}px`}}>
        <Kicker text="ANGLE 02 · RELATABLE STORY" color={C.ink} size={34} style={{left: 92, top: 236}} />
        {frame >= tGan ? (
          <Img src={img('chi_color.png')} style={{position: 'absolute', width: 540, left: 520, top: 420 + (1 - pop(frame, tGan, fps, 200)) * 900, filter: 'drop-shadow(12px 18px 0 rgba(36,35,33,0.22))'}} />
        ) : null}
        <Checklist
          w={330}
          title="SÁNG NAY CẦN"
          items={[
            ['uốn tóc', false],
            ['skincare 7 bước', false],
            ['kẻ mắt', false],
            ['son đỏ', frame >= tXinh + 2],
          ]}
          style={{left: 70, top: 660, rotate: '-3deg', scale: String(pop(frame, tGan + 4, fps, 280))}}
        />
        <Laptop w={270} style={{left: 40, top: 990, rotate: '5deg', scale: String(pop(frame, tDay + 2, fps, 300))}} />
        <Handbag w={150} style={{left: 320, top: 1010, rotate: '-8deg', scale: String(pop(frame, tDay + 6, fps, 300))}} />
        <HandMirror w={120} style={{left: 420, top: 640, rotate: '14deg', scale: String(pop(frame, tDay + 9, fps, 300))}} />
        {frame >= tPhut ? (
          <TornScrap w={200} h={84} color={C.tomato} seed="a2m" style={{left: 330, top: 330, rotate: '-7deg', scale: String(slam(frame, tPhut).scale)}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.headline, fontSize: 54, color: C.white}}>-15′</div>
          </TornScrap>
        ) : null}
        {/* son = giải pháp */}
        {frame >= tXinh ? (
          <>
            <Starburst w={260} color={C.butter} points={12} style={{left: 330, top: 820, scale: String(pop(frame, tXinh, fps, 300)), rotate: `${frame}deg`}} />
            <Lipstick w={96} style={{left: 412, top: 790, rotate: '-18deg', scale: String(pop(frame, tXinh, fps, 340))}} />
          </>
        ) : null}
        <Headline start={tDay} size={104} lines={[{text: 'DẬY MUỘN 15 PHÚT,'}]} style={{left: 88, top: 1190}} />
        <Headline start={tXinh} size={118} lines={[{text: 'VẪN PHẢI XINH!', color: C.ivory, bg: C.burgundy}]} style={{left: 88, top: 1310}} />
      </div>
      {/* đồng hồ (nằm trên cùng để làm match cut) */}
      <div style={{position: 'absolute', left: cl, top: ct, width: cw, rotate: `${-8 + ring}deg`}}>
        <AlarmClock w={cw} hour={7} minute={15} style={{left: 0, top: 0}} />
      </div>
      {crownFade > 0 ? <Crown w={900} style={{left: 90, top: 560, rotate: '18deg', opacity: crownFade}} /> : null}
    </PaperBG>
  );
};

/* ---------------------------------------------------------------- A3 */
const FACE = {left: 140, top: 360, w: 800};
/** Toạ độ môi trong em_*.png (705 px rộng) → toạ độ màn hình. */
const LIP_X = FACE.left + 390 * (FACE.w / 705);

export const AngleMyth: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r = (abs: number) => abs - SCENE.a3;
  const tDk = r(cue('p2d', 'dinh_kien'));
  const tAi = r(cue('p2d', 'ai_bao'));
  const tDep = r(cue('p2d', 'chi_dep'));

  // đồng hồ (từ A2) → gương trang điểm: vành gương thu từ cỡ đồng hồ, rồi mở rộng thành split-screen
  const m = easeOut(onTwos(frame), 0, 10, 0, 1);
  const clockFade = interpolate(frame, [0, 6], [1, 0], clamp);
  const open = ease(frame, tAi, tAi + 10, 0, 1);
  const rip = ease(onTwos(frame), tAi, tAi + 10, 0, 1);
  const lbl = slam(frame, tDk);
  const ovalW = 620 + (2400 - 620) * open;
  const ovalH = ovalW * 1.3;

  return (
    <PaperBG color={C.lime}>
      {/* nền split-screen: trái sắc sảo, phải trong trẻo */}
      <div style={{position: 'absolute', left: 0, top: 0, width: LIP_X, height: 1920, backgroundColor: C.burgundy, opacity: open}} />
      <div style={{position: 'absolute', left: LIP_X, top: 0, right: 0, height: 1920, backgroundColor: '#F7D9D6', opacity: open}} />
      {/* gương oval chứa khuôn mặt */}
      <div
        style={{
          position: 'absolute',
          left: 540 - ovalW / 2,
          top: 900 - ovalH / 2,
          width: ovalW,
          height: ovalH,
          borderRadius: '50%',
          overflow: 'hidden',
          border: open < 0.9 ? `16px solid ${C.ink}` : 'none',
          boxShadow: open < 0.9 ? `0 0 0 12px ${C.white}, 12px 18px 0 12px rgba(36,35,33,0.2)` : 'none',
          backgroundColor: open > 0 ? 'transparent' : '#FFF6EF',
          scale: String(0.6 + 0.4 * m),
        }}
      >
        <div style={{position: 'absolute', left: -(540 - ovalW / 2), top: -(900 - ovalH / 2), width: 1080, height: 1920}}>
          {/* trước khi xé nhãn: mặt tự nhiên; sau: chia đôi hai cách đánh son */}
          <Img src={img(frame >= tAi + 2 ? 'em_bold.png' : 'em_color.png')} style={{position: 'absolute', left: FACE.left, top: FACE.top, width: FACE.w, clipPath: frame >= tAi + 2 ? `inset(0 ${100 - ((LIP_X - FACE.left) / FACE.w) * 100}% 0 0)` : undefined}} />
          {frame >= tAi + 2 ? (
            <Img src={img('em_soft.png')} style={{position: 'absolute', left: FACE.left, top: FACE.top, width: FACE.w, clipPath: `inset(0 0 0 ${((LIP_X - FACE.left) / FACE.w) * 100}%)`}} />
          ) : null}
        </div>
      </div>
      {/* đường chia */}
      {open > 0.5 ? <div style={{position: 'absolute', left: LIP_X - 3, top: 600, width: 6, height: 900, backgroundColor: C.white, opacity: (open - 0.5) * 2}} /> : null}

      {/* nhãn định kiến bị xé bỏ */}
      {frame >= tDk && rip < 1 ? (
        <TornScrap
          w={560}
          h={150}
          color={C.white}
          seed="a3lbl"
          texture="crumple"
          style={{left: 260, top: 930, rotate: `${-6 + rip * 50}deg`, scale: String(lbl.scale), translate: `${rip * 700}px ${-rip * 1100}px`}}
        >
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.headline, fontSize: 92, color: C.ink}}>
            SON ĐỎ = DỪ<span style={{color: C.tomato}}>?</span>
          </div>
        </TornScrap>
      ) : null}

      {/* bảng tiêu đề */}
      {frame >= tAi - 2 ? (
      <TornScrap w={920} h={350} color={C.ivory} seed="a3head" edges="b" style={{left: 80, top: 222, scale: String(pop(frame, tAi - 2, fps, 300))}}>
        <Kicker text="ANGLE 03 · MYTH BUSTING" color={C.burgundy} size={32} style={{left: 22, top: 22}} />
        <Headline start={tAi} size={84} stagger={3} lineHeight={1.0} lines={[{text: 'AI BẢO SON ĐỎ'}, {text: 'CHỈ DÀNH CHO'}, {text: 'MẤY CHỊ ĐẸP?', color: C.burgundy}]} style={{left: 22, top: 74}} />
      </TornScrap>
      ) : null}
      {frame >= tDep ? <Stamp text="BUSTED" size={58} rot={-12} seed={31} scale={slam(frame, tDep).scale} style={{left: 690, top: 470}} /> : null}

      {/* nhãn hai phong cách */}
      {frame >= tAi + 10 ? (
        <>
          <div style={{position: 'absolute', left: 90, top: 1300, fontFamily: F.headline, fontSize: 70, color: C.ivory, scale: String(pop(frame, tAi + 10, fps))}}>SẮC SẢO</div>
          <HandNote text="viền rõ, phủ kín" color={C.ivory} size={42} rot={-3} style={{left: 92, top: 1385}} />
          <div style={{position: 'absolute', left: LIP_X + 40, top: 1300, fontFamily: F.headline, fontSize: 70, color: C.burgundy, scale: String(pop(frame, tAi + 14, fps))}}>TRONG TRẺO</div>
          <HandNote text="tán mỏng, loang nhẹ" color={C.burgundy} size={42} rot={-3} style={{left: LIP_X + 42, top: 1385}} />
        </>
      ) : null}
      {/* đồng hồ (từ A2) mờ dần vào gương */}
      {clockFade > 0 ? <AlarmClock w={560} hour={7} minute={15} style={{left: 260, top: 560, opacity: clockFade, rotate: '-8deg'}} /> : null}
    </PaperBG>
  );
};
