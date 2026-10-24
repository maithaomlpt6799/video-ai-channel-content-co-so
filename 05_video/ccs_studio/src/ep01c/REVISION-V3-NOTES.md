# Ep01 · Revision V3 — audit, revision map, thay đổi

Composition: `Ep01-ContentCoSo-v2` · 1080×1920 · 30fps · 45,4 s. Bản v1 được lưu ở `src/ep01c/_v1/` (không đăng ký trong Studio nữa).

## 1. Audit bản v1

| Timecode v1 | Nội dung | Quyết định | Lý do |
|---|---|---|---|
| 0–3,7 s | Note ý tưởng + tờ "HẾT Ý TƯỞNG?" bị xé | **Giữ** (dời sau hook) · thay son mới | Vẫn kể đúng vấn đề, motion tốt |
| 3,7–11,4 s | Nền butter, note lặp, dấu SAME IDEA, thu thành bìa | **Giữ** · thay son · thêm mascot #1 | Minh hoạ đúng "chỉ nhìn sản phẩm" |
| 11,4–16,9 s | 3 thẻ AI? / KHI NÀO? / VẤN ĐỀ GÌ? | **Thay toàn bộ** | Công thức cũ |
| 16,9–31,6 s | 3 bìa persona (văn phòng / sinh viên / tự nhiên) | **Thay toàn bộ** | Persona, chưa phải angle |
| 31,6–41,1 s | Bảng 3 bìa + AI + BỐI CẢNH + VẤN ĐỀ | **Nâng cấp** (giữ cơ chế hội tụ, đổi công thức) | |
| 41,1–42,9 s | Khung kết burgundy | **Thay** bằng khung kết sáng | Nặng, tĩnh |

Đánh giá riêng v1:
- **Visual:** son là hình vẽ phẳng, chưa đủ chất beauty.
- **Audio:** hook yếu, đoạn angle chỉ là mô tả persona.
- **Motion:** tốt ở SC01–SC02, phần lướt 3 bìa giống slide.
- **Typography:** ổn, nhưng thiếu chất fashion magazine.
- **Transition:** chủ yếu dùng giấy quét, ít match cut có ý đồ.

## 2. Revision map

| Cảnh | Trạng thái |
|---|---|
| SC00 Hook | **Mới**: son hero ngay frame 0, push-in, sticker, match cut 1 → 3 son |
| SC01 Không thiếu ý tưởng | Giữ, thay asset son |
| SC02 Chỉ nhìn sản phẩm | Giữ, thay asset son, thêm mascot #1 |
| SC03 Đổi cách nghĩ | Giữ cú lật bìa; nội dung mới: son hero đáp bục (match cut sang A1) |
| A1 Bold statement | **Mới** |
| A2 Relatable story | **Mới** (vương miện → đồng hồ) |
| A3 Myth busting | **Mới** (đồng hồ → gương → split-screen) |
| SC05 Payoff | Nâng cấp: 3 angle bay về một bảng, công thức mới, mascot #2 đóng dấu FIX |
| SC06 End | **Mới**: nền sáng, son hero, mascot #3 |

## 3. Thay đổi chính

1. **Hook A** "Một thỏi son đỏ, bẻ ra được ba content angle khác nhau. Tin không?" — frame 0 đã có son hero và vệt son. Ở chữ "ba" có match cut tách 1 son thành 3, ứng với 3 thẻ ANGLE 01/02/03.
2. **Ba angle khác nhau về cơ chế:**
   - **A1 Bold statement:** son lên bục sân khấu, đèn spotlight, vương miện rơi xuống đầu son, các màu son phụ làm "triều thần" xung quanh, headline kiểu fashion magazine.
   - **A2 Relatable story:** vương miện chuyển thành đồng hồ 7:15, nhãn -15′, checklist buổi sáng bị gạch, son đỏ xuất hiện là món duy nhất được tick. Nhịp nhanh, có rung màn hình.
   - **A3 Myth busting:** đồng hồ chuyển thành gương. Nhãn "SON ĐỎ = DỪ?" dán lên miệng rồi bị xé. Mở ra split-screen cùng một khuôn mặt: một nửa đánh son sắc sảo, một nửa đánh trong trẻo.
3. **Công thức mới:** 1 SẢN PHẨM + 1 INSIGHT + 1 CÁCH KỂ = 1 CONTENT ANGLE. Dưới 3 bìa có tag insight: QUAN ĐIỂM / TÌNH HUỐNG / ĐỊNH KIẾN.
4. **Product asset mới:** son đen-vàng render kiểu product photography, không logo. Thêm vệt son, 4 màu son phụ và bản thân vàng.
5. **Mascot "Bé Note Dán":** xuất hiện đúng 3 lần, không có lời thoại (lúc ý tưởng lặp lại · lúc công thức hoàn thành · ở khung kết).
6. **3 cover:** A (khuyến nghị), B, C. Cả ba đều nền sáng và có hero son.
7. **Audio:** xem `AUDIO-PATCH-REPORT.md`.

## 4. Giới hạn thực tế

- Không có công cụ tạo ảnh AI. Son, vệt son và đạo cụ được render bằng code (numpy/SVG). Chúng có ánh sáng studio và phản chiếu kim loại, nhưng chưa phải ảnh chụp thật.
- Cover B cần "bàn tay photographic" nhưng hiện chỉ có bàn tay cắt giấy minh hoạ.
- Ở A3, màu son trên môi được tô bằng mask vẽ tay trên ảnh nhân vật AI của kênh (tô lại, không phải chụp thật). Video không đưa ra lời hứa về tông da hay công dụng sản phẩm.
- Chất giọng vẫn là Harper (xem báo cáo audio).
- Moodboard collage (vòng V3) và 3 ảnh reference son chỉ được dùng để học bố cục, ánh sáng và chất liệu. Không sao chép ảnh, text hay layout của reference nào (kể cả poster "Lipstick Sale").

## 5. Component nên đưa vào Agent cho Ep02

| Component | File | Dùng lại thế nào |
|---|---|---|
| `Lipstick`/product render pipeline | `lipstick_render.py`, `Props.tsx` | Đổi màu đầu son, thân đen/vàng; mẫu cho mọi "hero product" hình trụ |
| `Smear` | `smear_render.py` | Vệt son, kem, sơn — nền dẫn mắt cho beauty |
| `Mascot` (Bé Note Dán) | `lab/Mascot.tsx` | Biểu cảm meh / wow / wink / smirk, tay đóng dấu / chỉ — tối đa 3 lần mỗi tập |
| Hook "1 → 3" match cut | `Sc0Hook.tsx` | Mở đầu cho mọi tập dạng "1 thứ → nhiều ý tưởng" |
| Angle templates | `Angles.tsx` | Bold statement (bục + vương miện) · Relatable story (đồng hồ + checklist) · Myth busting (nhãn bị xé + split-screen) |
| Payoff board | `Payoff.tsx` | Các cảnh hội tụ thành bảng biên tập + ticket công thức tích luỹ dần theo voice |
| `Ticket`, `Stamp`, `RedStroke`, `Headline` | `lab/*` | Hệ ngôn ngữ biên tập của kênh |
| Voice patch script | `vo3_build.py` | Nén khoảng lặng, cân âm lượng, tăng tốc nhẹ, xuất mốc cue |
