# Changelog — CCS-001 v01 (24/10/2026, Claude/Video)

Dựng từ bản v2 của Creative Lab (`tailieu-kenhAI/tiktok-3ce-live/out/content-co-so-ep01-v2.mp4`) theo lệnh trực tiếp CEO, khi kịch bản và concept chưa có dấu duyệt trong thẻ.

| Việc CEO giao | Kết quả |
| --- | --- |
| Hook B | Đã sửa — composition dùng `Sc0Hook` biến thể B + giọng hookB; SFX hook đổi theo mốc hook B |
| Giọng: Adam (ElevenLabs) đọc nhanh hơn | Đã thử Adam, CEO bỏ ("giọng adam ghê quá") → dùng Speko |
| Giọng Speko, nhanh thêm 1,05 | Đã sửa — Harper của v2 tăng tốc x1,05, mốc cue chia 1,05 (`voice-timing-v3.json`) |
| Thay mascot cũ bằng Bé Tiền Tít | Đã sửa — 3 lần: SC02 Judge, Payoff Celebrate, khung kết Idea (`src/lab/TienTit.tsx`, `public/lab/img/mascot/`). Bỏ động tác đóng dấu bằng tay của mascot cũ; dấu FIX vẫn đập riêng |

Khác:
- Code chuyển từ `tailieu-kenhAI/tiktok-3ce-live/` sang `05_video/ccs_studio/` (composition `CCS-001-v01`, lệnh `npm run render:ccs001`). Bản gốc trong tailieu-kenhAI không sửa.
- Thời lượng 45,5 s → 42,7 s.
- Cover A/B/C trong code vẫn dùng mascot cũ — để Team Creative làm ở bước cover.
