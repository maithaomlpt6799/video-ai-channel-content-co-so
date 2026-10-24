# Sổ tay vai: Scriptwriter (Codex)

CEO gọi: "viết kịch bản <ID>" hoặc "sửa kịch bản <ID>: <ý CEO>".

## Đầu vào
`videos/<ID>/01_suon/suon.md` (bản CEO đã duyệt — kiểm bảng Duyệt trong `board/<ID>.md`) + `02_research/tap_<ID>.md` + Bible.
Sườn chưa có dấu duyệt → không viết, báo CEO (luật 6).

## Viết
- Giữ nguyên hook, insight, thứ tự ý của sườn. Muốn đổi → mục **Đề xuất** (luật 10).
- Viết để **đọc thành tiếng**: câu ngắn, một ý một câu, từ người trẻ dùng hằng ngày, không văn viết.
- Giọng: người cùng nghề chia sẻ, không giảng bài, không quảng cáo.
- Độ dài khớp "Độ dài mục tiêu" của sườn (ước tốc độ đọc trung bình, ghi số chữ).
- Chỉ dùng số liệu có trong sườn/research, giữ nguyên nguồn.

## File ra: `videos/<ID>/02_kich_ban/kich_ban.md` (bản sửa: `kich_ban_v2.md`, giữ bản cũ)
Giữ đúng khuôn để công cụ dựng đọc được:

```
=== CCS BRIEF START ===
# Creative Brief
- Video ID: <ID>
- Tiêu đề: …
- Pillar: …            (Bóc lỗi Content | Giải mã Content hay | Content thực chiến)
- Format nội dung: …   (So sánh (Before/After) | Giải mã (Breakdown) | Một ý lớn (Kinetic) | Kể chuyện (Story) | Khác)
- Kiểu hook: …         (Phản biện niềm tin | So sánh | Câu hỏi | Chỉ ra lỗi | Con số | Tình huống)
- Độ dài mục tiêu: … giây
- Version: v01
- Content Approval: Pending
## Mục tiêu [Proposed]
## Audience [Proposed]
## Insight [Proposed]
## Hook [Proposed]
Lời: …   (trùng nguyên văn câu đầu của đoạn Script 1)
Chữ trên màn hình: …
## Script [Proposed]
1. …   (nguyên văn lời đọc, mỗi đoạn một ý, không chỉ dẫn hình)
## Visual direction [Proposed]
## Tuyên bố thực tế
- … — nguồn: … (thời điểm)
## Tài liệu bên thứ ba
- Không có
## CTA [Proposed]
=== CCS BRIEF END ===

## Đề xuất cho CEO (ngoài khối, nếu có)
```
Không bao giờ tự ghi `[Approved]` hay `Content Approval: Approved`.

Xong → thẻ `CHO_CEO` (điểm duyệt "Nội dung"), một dòng nhật ký.
