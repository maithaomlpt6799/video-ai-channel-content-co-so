# Mẫu thư mục một video

Mỗi video có một thư mục `videos/<ID>/` (vd `videos/CCS-001/`), gồm 6 ngăn. Chủ của từng ngăn theo `AGENTS.md` mục 3.

| Ngăn | Chủ | Chứa |
| --- | --- | --- |
| `01_suon/` | Claude | `suon.md` |
| `02_kich_ban/` | Codex | `kich_ban.md` (bản sửa: `kich_ban_v2.md`…, bản duyệt ghi rõ trong thẻ) |
| `03_creative/` | Codex | Hướng hình cho video này, asset kèm nguồn + quyền dùng |
| `04_dung/` | Claude | `v01/`, `v02/`… mỗi bản: `video.mp4` + `audit_pack/` |
| `05_feedback/` | Codex | `v01.md`, `v02.md`… feedback gộp CEO + Codex cho từng bản |
| `06_social/` | Claude | `caption.md` |

Video final (bản CEO duyệt) là `04_dung/vNN/video.mp4` ghi trong thẻ ở dòng "Bản dựng mới nhất".
Không lưu video ở Tải về hay Desktop.
