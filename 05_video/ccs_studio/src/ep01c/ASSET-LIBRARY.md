# Asset library · Content Có Số Ep01 (Editorial Collage)

Tất cả nằm trong `public/`. Không dùng logo, bao bì hay hình ảnh của thương hiệu thật.

| Nhóm | File | Nguồn / quyền dùng |
| --- | --- | --- |
| Nhân vật | `lab/img/office_girl.png`, `lab/img/student_girl.png`, `lab/img/natural_face.png` | Cắt nền + halftone từ 2 ảnh nhân vật AI kênh tự cung cấp ("nhân vật chị", "nhân vật em") |
| Sản phẩm | `lab/img/lipstick.png` | Thỏi son render bằng code, không nhãn hiệu |
| Texture | `lab/img/paper_grain.png`, `lab/img/crumple.png`, `lab/img/grain_0..2.png` | Tạo bằng code (nhiễu thủ tục) |
| Đạo cụ | `src/lab/Props.tsx` (đồng hồ, laptop, cà phê, balo, gương, swatch, thẻ lựa chọn, bàn tay) | Minh hoạ cắt giấy vẽ bằng SVG trong code |
| Giọng | `ep01c/voice/s1…s5b.wav` | Speko · giọng vi-VN Harper (MAI-Voice-2.1), giữ nguyên giọng của bản trước, chuẩn hoá -15 LUFS |
| SFX | `lab/sfx/sfx_*.wav` (paper_impact, crumple, rip, pop, stamp, page_flip, whoosh, tick) | Tự tổng hợp bằng code — không vướng bản quyền |
| Nhạc nền | `assets/audio/bgm.mp3` | Mixkit "Secret Garden" (Mixkit License, dùng miễn phí cho video) |
| Font | Anton, Barlow Condensed, Playfair Display, Patrick Hand, Be Vietnam Pro (`public/fonts`) | Google Fonts · SIL Open Font License |

## Design system "The Content Lab" (`src/lab/`)

- `theme.ts` — bảng màu (ivory, charcoal, burgundy, butter, periwinkle, lime, tomato), font, vùng an toàn chữ TikTok (x 90–930, y 230–1480).
- `fx.ts` — nhịp stop-motion (`onTwos`), boil, pop, slam, shake.
- `Paper.tsx` — nền giấy, hạt photocopy, folio tạp chí.
- `Scrap.tsx` — giấy xé, băng keo, note, ảnh cut-out.
- `Marks.tsx` — nét đỏ vẽ dần, khoanh tay, con dấu mực, highlight.
- `Type.tsx` — headline mask-reveal, kicker, ghi chú viết tay.
- `Cards.tsx` — specimen card, idea ticket, khung bìa tạp chí.
- `Props.tsx` — đạo cụ cắt giấy.

## Cảnh (`src/ep01c/`)

`timing.ts` dựng toàn bộ mốc thời gian từ `voice-timing.json` (độ dài + mốc từng chữ của giọng thật). Sửa giọng → chạy lại phân tích mốc → video tự khớp.

| Cảnh | File | Ý đồ |
| --- | --- | --- |
| SC01 | `Sc1Hook.tsx` | Tờ "HẾT Ý TƯỞNG?" đập xuống, bị gạch, bị xé → lộ 3 ô trống |
| SC02 | `Sc2Product.tsx` | Chỉ nhìn sản phẩm → note lặp lại → dấu SAME IDEA → thu nhỏ thành một bìa |
| SC03 | `Sc3Formula.tsx` | Bìa lật mở → 3 specimen card AI? / KHI NÀO? / VẤN ĐỀ GÌ? → vé công thức |
| SC04–05 | `Covers.tsx`, `Sc45Covers.tsx` | Son tách 3 → camera lướt qua 3 bìa → lùi ra bảng "1 sản phẩm / 3 content angles" → khung kết |
