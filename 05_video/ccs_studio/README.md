# TikTok 3CE · Video-to-Live (Remotion)

Video UGC 9:16 (1080×1920, 30fps, ~24s): hai chị em cà khịa chuyện mua má hồng 3CE mà chưa check giá LIVE → CTA duy nhất ở cuối: **BẤM VÀO LIVE XEM ƯU ĐÃI**.

> **Tình trạng: ĐÃ ĐỦ 14 ASSET BẮT BUỘC.** Ảnh 2 nhân vật, phòng ngủ, packshot 3CE Face Blush (Nude Peach), 7 câu thoại, nhạc nền và 2 SFX. Video dài 23,97s.
>
> Giọng được tách từ 2 file gốc trong `video AI - 3CE/`: `voice chị.mp3` gồm câu 1, 3, 5 và `voice em.mp3` gồm câu 2, 4, 6, 7. Điểm cắt dựa trên khoảng lặng giữa các câu.

---

## 1. Chạy nhanh

| Việc | Cách 1 (nhấp đúp) | Cách 2 (Terminal) |
|---|---|---|
| Xem preview | `Mo Remotion Studio.command` | `npm install` (lần đầu) → `npm run dev` |
| Render MP4 H.264 | `Render MP4.command` | `npm run render` → `out/tiktok-3ce-video-to-live.mp4` |
| Render nháp nhanh (540×960) | — | `npm run render:draft` |
| Kiểm tra asset | — | `npm run assets` |

Cần **Node.js LTS** (https://nodejs.org). Lần render đầu, Remotion tự tải trình duyệt render (~100MB).

Trong Studio, ở panel **Props** bên phải:
- `showSafeArea`: bật lớp đỏ đánh dấu vùng UI TikTok để kiểm tra chữ có bị che không.
- `showDraftBadge`: tắt nhãn "BẢN NHÁP" ở góc trên.

---

## 2. Cấu trúc thư mục

```
remotion-video/
├─ Mo Remotion Studio.command      # nhấp đúp: cài + mở preview
├─ Render MP4.command              # nhấp đúp: render MP4
├─ scripts/scan-assets.mjs         # quét public/assets, đo thời lượng audio/video
├─ public/
│  ├─ fonts/                       # Be Vietnam Pro (đủ dấu tiếng Việt, OFL)
│  └─ assets/                      # ← THẢ ASSET VÀO ĐÂY
│     ├─ characters/  bg/  product/  props/
│     ├─ clips/  scenes/  voice/  audio/  sfx/
├─ src/
│  ├─ Root.tsx                     # đăng ký composition TikTok3CEVideoToLive
│  └─ tiktok3ce/
│     ├─ config.ts                 # ★ kịch bản, phụ đề, text, thời lượng, màu, safe area
│     ├─ asset-manifest.json       # ★ danh sách asset + đường dẫn
│     ├─ timeline.ts               # tính frame mỗi cảnh (tự kéo dài theo giọng/clip)
│     ├─ TikTok3CEVideoToLive.tsx  # ghép cảnh + thoại + SFX + nhạc nền (auto ducking)
│     ├─ camera.ts                 # zoom / shake / whip-pan (interpolate)
│     ├─ scenes/Scene01..07.tsx    # 7 cảnh
│     ├─ components/
│     │  ├─ DialogueCaption.tsx    # phụ đề theo cụm, spring pop-in, highlight từ khoá
│     │  ├─ TextOverlay.tsx        # text hook phía trên
│     │  ├─ ProductPackshot.tsx    # packshot 3CE (ảnh thật hoặc placeholder)
│     │  ├─ LiveCTA.tsx            # CTA + nhãn LIVE trung tính
│     │  ├─ Phone.tsx              # điện thoại + mockup LIVE trung tính
│     │  ├─ Character.tsx, SceneVisual.tsx, Stage.tsx, Placeholder.tsx, Guides.tsx
│     └─ generated/assets.json     # do scan-assets tạo ra, không sửa tay
└─ .claude/skills, .agents/skills  # Remotion Agent Skills cho Claude Code
```

---

## 3. Timeline (30fps, theo giọng thật)

Cảnh **tự kéo dài** theo độ dài file giọng (không tua nhanh giọng). Tổng 719 frame = 23,97s.

| Cảnh | Frame | Thoại (mốc phụ đề tính từ đầu câu) | Hình / hiệu ứng |
|---|---|---|---|
| S01 Hook | 0 – 120 | **Chị**: Trời ơi! (0s) · Sao mua 3CE (1.23) · mà bà không (2.27) · check live trước?! (2.89) | Ảnh chị, punch-in 105→120% vào mặt, rung khi "Trời ơi", overlay **MUA 3CE MÀ CHƯA CHECK LIVE?!**, SFX scratch |
| S02 | 121 – 204 | **Em**: Ủa? (0) · Mua đâu (0.72) · chẳng giống nhau?! (1.13) | Cận mặt em, push-in |
| S03 | 205 – 307 | **Chị**: Ủa bà! (0) · Trong live có ưu đãi (0.95) · mà bà không coi hả? (1.9) | Cận chị + điện thoại màn hình LIVE trượt lên, overlay **CHƯA COI LIVE HẢ?!** + pop, whip-pan ra |
| S04 | 308 – 415 | **Em**: Thiệt hả?! (0) · Đâu đưa tui coi với! (0.94) | Whip-pan vào, em + mockup LIVE trung tính, overlay **LIVE CÓ ƯU ĐÃI GÌ?** |
| S05 | 416 – 511 | **Chị**: Bởi vậy, (0) · check live trước (0.88) · rồi hãy chốt! (1.7) | Khung rộng hơn, trôi ngang nhẹ, không overlay |
| S06 | 512 – 601 | **Em**: Ê, (0) · để tui coi giá đã! (0.56) | Em + hộp phấn 3CE bay lên cạnh mặt, overlay **ĐỊNH MUA 3CE? CHECK LIVE TRƯỚC!** |
| S07 | 602 – 718 | **Em (VO)**: Mấy bà định mua 3CE (0) · thì bấm vô live (1.68) · coi thử đi! (2.59) | Nền phòng làm mờ + hồng nhạt, nhãn LIVE, packshot, CTA **BẤM VÀO LIVE XEM ƯU ĐÃI** + pop, nháy trắng để loop |

Mix âm thanh: nhạc nền 0.38, tự giảm còn 0.12 khi có thoại; bỏ 1,6s intro nhạc. Kết quả −16 LUFS, đỉnh −1,2 dBFS.

## 4. Asset manifest

Đặt file vào `public/` đúng đường dẫn (chấp nhận đuôi .png/.jpg/.webp cho ảnh, .wav/.mp3/.m4a cho audio, .mp4/.mov/.webm cho video). Danh sách đầy đủ và mọi đuôi được chấp nhận: `src/tiktok3ce/asset-manifest.json`.

### Bắt buộc (14)

| File | Tỷ lệ / định dạng | Dùng ở đâu |
|---|---|---|
| `assets/characters/chi.png` | 9:16 toàn khung (đang dùng ảnh chụp có phòng) | Chị: S01, S03, S05 |
| `assets/characters/em.png` | 9:16 toàn khung | Em: S02, S04, S06 |
| `assets/bg/bedroom_bg.png` | 1080×1920 | Phòng ngủ, làm nền mờ cho packshot S07 |
| `assets/product/3ce_product.png` | 1:1, PNG trong suốt | Packshot thật 3CE Face Blush, tách nền theo vòng tròn hộp phấn: S03, S04, S06, S07 |
| `assets/voice/s01_chi.wav` | wav/mp3 | "Trời ơi! Sao mua 3CE mà bà không check live trước?!" |
| `assets/voice/s02_em.wav` | | "Ủa? Mua đâu chẳng giống nhau?!" |
| `assets/voice/s03_chi.wav` | | "Ủa bà! Trong live có ưu đãi mà bà không coi hả?" |
| `assets/voice/s04_em.wav` | | "Thiệt hả?! Đâu đưa tui coi với!" |
| `assets/voice/s05_chi.wav` | | "Bởi vậy, check live trước rồi hãy chốt!" |
| `assets/voice/s06_em.wav` | | "Ê, để tui coi giá đã!" |
| `assets/voice/s07_em.wav` | | "Mấy bà định mua 3CE thì bấm vô live coi thử đi!" |
| `assets/audio/bgm.mp3` | | Nhạc nền vui nhẹ (có quyền sử dụng thương mại) |
| `assets/sfx/scratch.wav` | | Record scratch đầu S01 |
| `assets/sfx/pop.wav` | | Pop cho S03 và CTA |

> Kịch bản gốc ghi `voice_chi.wav` / `voice_em.wav` (một file cho mỗi người). Project tách **mỗi câu thoại một file** để khớp từng cảnh chính xác. Nếu bạn có một file dài, hãy cắt thành 7 đoạn theo bảng trên.

### Tuỳ chọn (nâng chất lượng)

| File | Ghi chú |
|---|---|
| `assets/clips/s01.mp4` … `s06.mp4` | **Clip AI lip-sync 9:16, ưu tiên cao nhất.** Có clip thì cảnh dùng clip; nếu đã có file giọng riêng thì clip tự tắt tiếng. |
| `assets/scenes/s01.png` … `s06.png` | Ảnh dựng sẵn toàn cảnh (khi chưa có clip): video pan/zoom trên ảnh này. Không giả lập khẩu hình. |
| `assets/product/3ce_cheek_closeup.png` | Em cầm 3CE cạnh má (9:16), thay cảnh ghép ở S06 |
| `assets/props/phone.png` | Điện thoại chị cầm ở S03; thiếu thì dùng điện thoại vẽ trung tính |
| `assets/sfx/whoosh.wav` | Whoosh cho whip-pan vào S04 |

**Thứ tự ưu tiên hình mỗi cảnh:** `clips/sXX.mp4` → `scenes/sXX.png` → ghép từ `chi.png` / `em.png` + `bedroom_bg.png` → placeholder.

---

## 5. Thay ảnh, video, giọng đọc

1. Copy file vào `public/assets/...` đúng tên ở bảng trên.
2. Chạy `npm run assets` (hoặc tắt/mở lại `Mo Remotion Studio.command`). Terminal sẽ liệt kê file đã nhận, thời lượng, và file còn thiếu.
3. Studio tự tải lại. Cảnh nào có giọng dài hơn sẽ tự kéo dài.
4. **Khớp phụ đề:** các mốc `at` trong `src/tiktok3ce/config.ts` đã được đo theo giọng hiện tại. Nếu thay giọng khác, chỉnh lại `at` (giây, tính từ lúc bắt đầu câu), ví dụ:
   ```ts
   chunks: [{text: 'Ủa?!', at: 0}, {text: 'Má hồng 3CE', at: 0.55}, {text: 'mà bà mua giá đó á?!', at: 1.2}],
   ```
5. Sửa lời thoại, text overlay, CTA, màu, thời lượng tối thiểu: chỉ cần sửa `config.ts`. Dùng `\n` để chủ động xuống dòng.

---

## 6. Render MP4

```bash
npm run render          # → out/tiktok-3ce-video-to-live.mp4 (H.264, 1080x1920, 30fps)
npm run render:draft    # bản nhẹ 540x960 để duyệt nhanh
```

---

## 7. Nguyên tắc nội dung đã khoá trong code

- Không có giá, % giảm, "flash sale" hay claim khuyến mại nào.
- Mockup LIVE trung tính: không phải giao diện TikTok, không có số người xem, tồn kho hay đơn hàng.
- Không vẽ lại logo 3CE: chỉ hiển thị ảnh sản phẩm thật bạn cung cấp.
- CTA chỉ xuất hiện ở S07, pulse nhẹ, không có con trỏ hay ngón tay giả bấm.
- Toàn bộ chữ nằm trong vùng an toàn TikTok: trên 230px, dưới 440px, phải 150px, trái 90px.
- Không tải gì từ mạng khi render. Font và asset đều nằm trong `public/`.

## 8. Có thể nâng cấp thêm

- Clip lip-sync `assets/clips/s01–s06.mp4`: nhân vật nhép miệng theo thoại, thay cho ảnh tĩnh. Có clip thì cảnh tự dùng clip.
- Thêm biểu cảm khác nhau cho từng cảnh qua `assets/scenes/sXX.png` (vd chị khoanh tay ở S05, em tròn mắt ở S04).
- Nếu thay ảnh nhân vật, chỉnh vị trí mặt trong `src/tiktok3ce/scenes/faces.ts` để camera zoom đúng mặt.

---

*Remotion miễn phí cho cá nhân và tổ chức ≤3 người; công ty lớn hơn cần license tại remotion.pro. Font Be Vietnam Pro: SIL Open Font License.*

---

# Kênh kiến thức Content · Tập 01

Composition **`Ep01-KhongThieuYTuong`** (thư mục *Kenh-Content* trong Studio). Series "Vẽ 1 Framework": giấy trắng, bàn tay cầm bút dạ vẽ theo lời, mascot "Mực", phụ đề từng cụm.

- Kịch bản và cụm phụ đề: `src/channel/ep01/script.ts`
- Nét vẽ của từng trang (toạ độ, nét nào hiện ở cụm lời nào): `src/channel/ep01/pages.ts`
- Bộ khung dùng lại cho mọi tập (giấy, mực, bàn tay, mascot, phụ đề, timeline): `src/channel/kit/`

**Giọng đọc:** đặt 7 file `public/ep01/voice/b01.wav` … `b07.wav` (hoặc gửi một file thu liền để tách). Có giọng thì thời lượng mỗi đoạn tự khớp giọng thật; thêm `at` cho từng cụm trong `script.ts` để phụ đề và nét vẽ khớp tuyệt đối.

**Tuỳ chọn:** `public/channel/bgm.mp3` (nhạc nền, tự giảm khi có thoại), `public/channel/sfx/marker.wav` (tiếng bút khi vẽ), `public/channel/sfx/pop.wav` (khi sang trang).

**Render:** `npm run render:ep01` → `out/ep01-khong-thieu-y-tuong.mp4`.

**Tập mới:** copy thư mục `src/channel/ep01` thành `ep02`, sửa `script.ts` + `pages.ts`, đăng ký thêm một `<Composition>` trong `src/Root.tsx` và thêm manifest vào `scripts/scan-assets.mjs`.

## Tự tạo giọng đọc bằng AI (ElevenLabs)

1. Tạo tài khoản ElevenLabs. Muốn đăng video thương mại, cần gói trả phí; gói miễn phí không có quyền thương mại.
2. Nhấp đúp **`Tao giong + Render Ep01.command`**. Lần đầu nó mở file `.env`: dán API key và Voice ID (giọng tiếng Việt chọn trong Voice Library, hoặc giọng nhân bản của chính bạn), rồi lưu.
3. Nhấp đúp lại. Máy sẽ:
   - gọi ElevenLabs đọc 7 đoạn trong `src/channel/ep01/beats.json`;
   - đo mốc thời gian từng chữ để phụ đề và nét vẽ khớp giọng;
   - render `out/ep01-khong-thieu-y-tuong.mp4`.

Sửa lời: đổi `text` (chữ trên phụ đề) hoặc `say` (cách đọc cho máy, ví dụ "6h30" → "sáu giờ rưỡi") trong `beats.json`. Lần chạy sau chỉ tạo lại đoạn có thay đổi, để tiết kiệm credit. Chạy `npm run voice:ep01 -- --force` để tạo lại toàn bộ.

### Giọng hiện tại của Tập 01

Tạo qua **Speko** (connector trong Claude): nhà cung cấp Azure, model MAI-Voice-2.1, giọng `vi-VN-Harper` (nữ). Đã chuẩn hoá về −15 LUFS. Mốc phụ đề trong `src/channel/ep01/generated/voice-timing.json` đo bằng nhận dạng giọng nói có timestamp từng chữ. Muốn đổi giọng, nhờ Claude tạo lại qua Speko, hoặc dùng script ElevenLabs ở trên.

---

# Content Có Số · Ep01 — Editorial Cut-out Collage

Composition `Ep01-ContentCoSo` (thư mục Kenh-Content trong Studio). 1080×1920, 30fps, 42,9 giây.

- Render: bấm đúp `Render Content Co So Ep01.command` → `out/content-co-so-ep01.mp4` + `out/content-co-so-ep01-cover.png`.
- Hoặc: `npm run render:ccs01` và `npm run cover:ccs01`.
- Asset library, nguồn và quyền dùng: `src/ep01c/ASSET-LIBRARY.md`.
- Bản MP4 giao kèm đã chuẩn hoá âm lượng -14 LUFS (true peak -1.5 dB) bằng ffmpeg sau khi render.

## Ep01 · Revision V3 (beauty-editorial)

- Composition chính: `Ep01-ContentCoSo-v2` (45,4 s). Hook preview: `Ep01-HookPreview-A`, `Ep01-HookPreview-B`. Cover: `Ep01-Cover-A/B/C`.
- Render: bấm đúp `Render Content Co So Ep01.command` → `out/content-co-so-ep01-v2.mp4` + `out/cover-A/B/C.png`.
- Báo cáo: `src/ep01c/AUDIO-PATCH-REPORT.md`, `src/ep01c/REVISION-V3-NOTES.md`.
- Asset mới (render bằng code, không logo): `public/lab/img/lipstick_*.png`, `smear_red*.png`. Ảnh nhân vật màu: `chi_color.png`, `em_color/bold/soft.png`. Script tạo asset nằm trong `scripts/assets/`.
- Bản v1 lưu ở `src/ep01c/_v1/`.
