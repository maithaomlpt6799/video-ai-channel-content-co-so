# Audio patch report — Content Có Số Ep01 · Revision V3

Giọng: Speko · `vi-VN-Harper:MAI-Voice-2.1` (giữ nguyên giọng đã dùng ở bản trước — Speko chỉ có một giọng nữ tiếng Việt trên MAI-Voice).

## Bước 1 — Audit audio bản cũ (v1, 42,9 s)

Mốc thời gian của bản v1. Lời thoại lấy theo kịch bản đã thu; mốc từng chữ đo bằng Speko transcription lúc dựng v1.

| # | Bắt đầu | Kết thúc | Câu thoại | Quyết định | Lý do |
|---|---|---|---|---|---|
| s1 | 0,25 | 3,66 | "Bạn không thiếu ý tưởng. Bạn thiếu đúng một công thức này." | **KEEP** (dời sau hook mới) | Vẫn đúng thông điệp, làm cầu nối hook → vấn đề |
| s2 | 3,96 | 11,02 | "Ví dụ bán một thỏi son. Bạn chỉ nghĩ được: màu đẹp, mềm môi, dễ dùng. Xong, bí tiếp." | **KEEP** | Phần "chỉ nhìn tính năng sản phẩm" — brief yêu cầu giữ |
| s3 | 11,37 | 16,45 | "Thử đổi cách nghĩ: Ai đang dùng, dùng lúc nào, và họ đang gặp vấn đề gì?" | **KEEP một phần** "Thử đổi cách nghĩ." · **CUT** phần còn lại | Vế sau là công thức cũ (AI + BỐI CẢNH + VẤN ĐỀ). Cắt ở khoảng lặng 0,95 s (dưới -60 dB, không méo) |
| s4a | 16,90 | 21,32 | Angle cũ: dân văn phòng | **REPLACE** | Persona, chưa phải angle |
| s4b | 21,52 | 25,91 | Angle cũ: sinh viên | **REPLACE** | Persona, chưa phải angle |
| s4c | 26,11 | 31,20 | Angle cũ: gu makeup tự nhiên | **REPLACE** | Persona, chưa phải angle |
| s5a | 31,60 | 36,70 | "Thấy không? Vẫn một thỏi son, nhưng đổi tình huống là có ba hướng content khác nhau." | **CUT** | Trùng ý với câu chốt mới trong pickup (đổi insight và cách kể) |
| s5b | 36,95 | 41,14 | "Lần tới bí ý tưởng, đừng chỉ nhìn sản phẩm. Hãy nhìn người dùng." | **KEEP** vế đầu · **REPLACE** "Hãy nhìn người dùng." | Brief cho phép giữ đầu câu chốt. Cắt ở khoảng lặng 2,85 s |
| — | — | — | Hook mới | **INSERT** | Hook cũ chưa đủ cuốn |

## Bước 2 — Danh sách pickup (đã tạo)

| ID | Text (chính xác) | Vị trí chèn | Dự kiến → thực tế | Lý do |
|---|---|---|---|---|
| hookA | "Một thỏi son đỏ, bẻ ra được ba content angle khác nhau. Tin không?" | Mở đầu (bản cuối dùng hook này) | ~4,5 s → 4,42 s | Hook mới, option A |
| hookB | "Bí ý tưởng content? Có khi bạn chỉ đang nhìn sản phẩm sai cách." | Chỉ để preview | ~4 s → 3,74 s | Hook option B, để Director so sánh |
| p2a | "Ví dụ cùng một thỏi son đỏ nha." | Sau "Thử đổi cách nghĩ." | ~2 s → 1,99 s | Mở đoạn 3 angle mới |
| p2b | "Muốn một góc nhìn thật nổi bật? Son đỏ — bà hoàng của mọi màu son!" | Angle 01 | ~4,5 s → 4,52 s | Angle mới |
| p2c | "Muốn kể chuyện gần gũi hơn? Dậy muộn mười lăm phút, vẫn phải xinh!" | Angle 02 | ~4 s → 4,03 s | Angle mới |
| p2d | "Còn muốn phá định kiến? Ai bảo son đỏ chỉ dành cho mấy chị đẹp?" | Angle 03 | ~4 s → 3,83 s | Angle mới |
| p2e | "Đó, cùng một sản phẩm nhưng chỉ cần đổi insight và cách kể, bạn đã có ba content angle hoàn toàn khác nhau." | Payoff | ~6,5 s → 6,71 s | Câu chốt cho công thức mới |
| p3 | "Hãy thử đổi insight và cách kể." | Sau "…đừng chỉ nhìn sản phẩm." | ~2 s → 1,94 s | Thay "Hãy nhìn người dùng." |

Đoạn 3 angle được tách thành 5 câu (p2a–p2e) thay vì một file dài, để chèn được nhịp nghỉ cho hình. Đây là 5 câu khác nhau, không phải tạo lại cùng một câu.

## Bước 3 — Tối ưu audio cũ

- s1, s2, "Thử đổi cách nghĩ.", "Lần tới bí ý tưởng, đừng chỉ nhìn sản phẩm.": tăng tốc nhẹ **×1,06** bằng `atempo` (giữ nguyên cao độ) để khớp năng lượng với pickup. Không đổi pitch, không kéo giãn.
- Pickup: rút khoảng lặng dài (giữa câu hỏi và câu trả lời của mỗi angle ~0,9 s → 0,4 s; trước "Tin không?" 0,8 s → 0,32 s), crossfade 8 ms.

## Bước 4 — Lượt gọi Speko

| Loại | Số lượt | Ghi chú |
|---|---|---|
| `audio.synthesize` | **8** | hookA, hookB, p2a, p2b, p2c, p2d, p2e, p3 — mỗi câu đúng 1 lần, không tạo lại |
| `audio.transcribe` | **8** | lấy mốc từng chữ cho 8 pickup để khớp chuyển động |
| Regenerate | **0** | |

Số dư Speko trước khi làm: $9,959. Chi phí cụ thể xem số dư sau ở báo cáo bàn giao.

Pickup dùng thêm `instructions` (giọng trẻ, hào hứng như kể với bạn thân; nhấn từng headline) và speed 1,06–1,10.

## Bước 5 — Audio QC

| Kiểm tra | Kết quả |
|---|---|
| Âm lượng | Mọi đoạn chuẩn hoá về khoảng -15 LUFS (chênh ≤ 1 dB). File cuối -14 LUFS, true peak ≤ -1,5 dBFS |
| Màu giọng | Cùng một voice. Cao độ trung vị: đoạn cũ 206–216 Hz, pickup 198–218 Hz → không có bước nhảy rõ |
| Nhịp | Đoạn cũ tăng ×1,06; pickup speed 1,06–1,10 |
| Phát âm | Speko transcription đọc lại đúng nội dung. ASR viết "con ten angle" = "content angle", "sinh" = "xinh" (do ASR, không phải lỗi TTS) |

**Giới hạn:** pickup có `instructions` nên hào hứng hơn, nhưng **chất giọng (timbre) vẫn là Harper**. Muốn một giọng "trẻ hơn hẳn" về chất giọng, phương án duy nhất là đổi voice → phải **revoice toàn bộ** (khoảng 11 câu, khoảng 600 ký tự) để không lệch giọng giữa các đoạn. Trên Speko hiện chỉ có một giọng tiếng Việt, nên phương án này cần một nhà cung cấp/giọng khác (ví dụ ElevenLabs connector).
