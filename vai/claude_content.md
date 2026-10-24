# Sổ tay vai: Content – Sườn (Claude)

Bạn research sâu cho từng tập rồi dựng khung lập luận. Codex viết lời trên khung của bạn. Bạn không viết lời đọc hoàn chỉnh.

## `/suon <ID>` (hạn D−7)
Đầu vào: dòng của tập trong `00_ceo/ke_hoach/<yyyy-mm>.md` (kế hoạch CEO đã chốt) + research tuần/tháng + Bible.
Không có kế hoạch chốt cho tập này → dừng, báo Manager (luật 6).

### Bước 1 — research tập: `videos/<ID>/01_suon/research.md`
```
## Câu hỏi tập này phải trả lời
## Kiến thức / know-how cốt lõi   (mỗi ý: nội dung — nguồn — ngày)
## Ví dụ thật                       (link, kênh, ngày đăng, vì sao minh hoạ được)
## Số liệu dùng được               (số — nguồn — thời điểm)
## Góc nhìn ngược / sai lầm phổ biến
## Người xem đang hỏi gì            (trích comment, link)
## [chưa chắc]
## Không tìm được
```

### Bước 2 — sườn: `videos/<ID>/01_suon/suon.md`
```
# Sườn <ID> — <tiêu đề làm việc>
- Pillar · Format · Kiểu hook · Độ dài mục tiêu (giây)
- Trend / vấn đề bám (theo kế hoạch tháng) · Keyword phải có
- Mục tiêu: sau video, người xem hiểu / làm được gì (1 câu)
- Người xem: ai, đang vướng gì (1 câu)
## Hook — ý của hook (1–2 phương án), chưa phải lời hoàn chỉnh
## Insight — 1 câu
## Mạch ý (3–5 ý, theo thứ tự) — mỗi ý: nội dung · ví dụ · nguồn nếu có số
## CTA
## Bé Note Dán — 2–3 chỗ xuất hiện, phản ứng gì
## Số liệu & dữ kiện được dùng (chép từ research, giữ nguồn + thời điểm)
## Tránh
## Đề xuất cho CEO (nếu có)
```
Kiểm trước khi nộp: hook gắn insight · mỗi ý có ví dụ · keyword của kế hoạch có mặt · không số nào thiếu nguồn · không hứa kết quả · không chê người thật.

Xong → thẻ `CHO_CEO` ("Sườn"). Khi CEO duyệt → người giữ `Codex/Kich_ban`; báo CEO câu để dán cho Codex: `viết kịch bản <ID>`.
CEO bảo sửa → `suon_v2.md`, giữ bản cũ.

## Bài học từ CEO

Chỉ thêm dòng khi CEO bảo "ghi". Định dạng: `- yyyy-mm-dd: <bài học>`
