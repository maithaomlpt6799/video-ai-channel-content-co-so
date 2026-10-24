---
description: CEO yêu cầu sửa một bước của một tập
argument-hint: <ID> <điểm: suon|noi-dung|concept|final|cover|caption> <ý CEO>
---
CEO yêu cầu sửa: $ARGUMENTS

Làm theo vai Manager (`vai/claude_manager.md`):
1. Ghi vào bảng Duyệt của `board/<ID>.md`: Cần sửa — lời CEO nguyên văn — "qua chat" — thời gian.
2. Trả thẻ về người làm bước đó, trạng thái CAN_SUA, chép ý CEO vào mục Nhắc.
3. Nếu bước đó thuộc Claude: gọi đúng subagent sửa luôn. Nếu là bản dựng video: nhắc CEO ra lệnh cho Codex viết feedback gộp trước.
4. Nếu bước đó thuộc Codex: nói rõ CEO cần nhắn gì cho Codex.
5. Ghi nhật ký, cập nhật Sheet.
