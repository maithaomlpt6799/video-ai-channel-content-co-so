import '../kit/theme';
import React, {useMemo} from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {makeAssets} from '../kit/assets';
import {Caption, Mascot, PaperBackground, SeriesTag} from '../kit/Chrome';
import {Page} from '../kit/Page';
import {PAGE_OVERLAP, buildTimeline} from '../kit/timeline';
import {THEME, UI_FONT} from '../kit/theme';
import generated from './generated/assets.json';
import {PAGES} from './pages';
import {BEATS, EPISODE} from './script';

export const ep01Assets = makeAssets(generated);
export const ep01Duration = (fps: number) => buildTimeline(BEATS, ep01Assets, fps).total;

export const Ep01: React.FC<{showDraftBadge: boolean}> = ({showDraftBadge}) => {
  const {fps} = useVideoConfig();
  const timeline = useMemo(() => buildTimeline(BEATS, ep01Assets, fps), [fps]);
  const ctaPage = timeline.pages.find((p) => p.page === 'cta');

  // khung thời gian đang có nét vẽ → bật tiếng bút dạ (nếu có file)
  const drawing = useMemo(() => {
    const spans: [number, number][] = [];
    for (const page of PAGES) for (const it of page.items) {
      const s = timeline.anchorFrame(it.at);
      spans.push([s, s + Math.round(it.dur * fps)]);
    }
    return spans;
  }, [timeline, fps]);

  const marker = ep01Assets.src('sfx_marker');
  const pop = ep01Assets.src('sfx_pop');
  const bgm = ep01Assets.src('bgm');

  return (
    <AbsoluteFill>
      <PaperBackground />
      {timeline.pages.map((pt, i) => {
        const spec = PAGES.find((p) => p.id === pt.page);
        if (!spec) return null;
        const isLast = i === timeline.pages.length - 1;
        return (
          <Sequence key={pt.page} name={`Trang · ${pt.page}`} style={{zIndex: 1}} from={pt.from} durationInFrames={pt.durationInFrames + (isLast ? 0 : PAGE_OVERLAP)}>
            <Page spec={spec} timing={pt} exitFrames={isLast ? 0 : PAGE_OVERLAP} anchorFrame={timeline.anchorFrame} />
          </Sequence>
        );
      })}
      {/* lớp trên cùng: tem series, phụ đề, mascot — luôn nằm trên bàn tay và giấy */}
      <AbsoluteFill style={{zIndex: 20}}>
        <SeriesTag series={EPISODE.series} number={EPISODE.number} />
        <Caption timeline={timeline} />
        <Mascot timeline={timeline} waveFrom={ctaPage?.from} />
      </AbsoluteFill>

      {timeline.timings.map((t) => {
        const src = ep01Assets.src(`voice_${t.beat.id}`);
        return src ? <Audio key={t.beat.id} name={`Giọng ${t.beat.id}`} src={src} from={t.speechStart} /> : null;
      })}
      {bgm ? (
        <Audio
          name="Nhạc nền"
          src={bgm}
          loop
          volume={(f) => (timeline.timings.some((t) => f >= t.speechStart && f < t.speechStart + t.speechFrames) ? 0.08 : 0.2)}
        />
      ) : null}
      {marker ? (
        <Audio name="Tiếng bút" src={marker} loop volume={(f) => (drawing.some(([s, e]) => f >= s && f < e) ? 0.22 : 0)} />
      ) : null}
      {pop
        ? timeline.pages.slice(1).map((pt) => <Audio key={`pop-${pt.page}`} name="Pop sang trang" src={pop} from={pt.from} volume={0.35} />)
        : null}

      {showDraftBadge && ep01Assets.missingRequired.length > 0 ? (
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            padding: '10px 20px',
            borderRadius: 14,
            backgroundColor: 'rgba(20,20,20,0.78)',
            color: THEME.paper,
            fontFamily: UI_FONT,
            fontWeight: 700,
            fontSize: 26,
          }}
        >
          BẢN NHÁP · chưa có giọng đọc (thời lượng đang ước lượng)
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
