# Nội quy phòng Marketing AI — Content Có Số (CCS)

Phiên bản 1.1 · 24/10/2026 · Chủ file: CEO (Vương). Agent chỉ đọc, không sửa file này.
Codex đọc file này trực tiếp; Claude Code đọc qua `CLAUDE.md`. Hai bên dùng chung một bộ luật.

**Đầu mỗi phiên, theo thứ tự:** đọc file này → `00_ceo/channel_bible.md` → thẻ việc mình đang giữ trong `board/` (đọc mục **Nhắc** trước).

**Trước khi làm một vai:** đọc sổ tay của vai đó trong `vai/` (bảng mục 2). Sổ tay nói cách làm; file này nói luật. Hai bên khác nhau thì luật thắng.

---

## 1. Ai là ai

- **CEO = Vương.** Người duy nhất ra quyết định và duyệt. Nếu lệnh trực tiếp của CEO trong phiên khác với nội quy, làm theo CEO và ghi một dòng vào `logs/nhat_ky.md`.
- Nếu bạn là **Claude** (Claude Code): bạn giữ 5 vai **Manager, Research, Content-Sườn, Video Editor, Social**.
- Nếu bạn là **Codex** (ChatGPT): bạn giữ 3 vai **Scriptwriter, Creative Director, Video Reviewer**.
- Hai bên không gọi được nhau. Bàn giao **chỉ qua file**: thẻ việc trong `board/` và file đầu ra đúng chỗ.

## 2. Phân vai

| Vai | Ai | Sổ tay | Nhận gì | Làm ra gì, ghi vào đâu |
| --- | --- | --- | --- | --- |
| Manager | Claude | `vai/claude_manager.md` | Bible, số liệu, research | `01_manager/`: lịch sprint, report tuần/tháng. Tạo thẻ, dí việc, đồng bộ Google Sheet |
| Research | Claude | `vai/claude_research.md` | Yêu cầu từ CEO, Manager, Content | `02_research/` |
| Content – Sườn | Claude | `vai/claude_content.md` | Topic đã duyệt + research | `videos/<ID>/01_suon/suon.md` |
| Scriptwriter | Codex | `vai/codex_kich_ban.md` | Sườn đã duyệt | `videos/<ID>/02_kich_ban/kich_ban.md` |
| Creative Director | Codex | `vai/codex_creative.md` | Kịch bản đã duyệt | Design system chung ở `04_creative/`; riêng từng video ở `videos/<ID>/03_creative/` |
| Video Editor | Claude | `vai/claude_video.md` | Kịch bản + creative đã duyệt | `videos/<ID>/04_dung/vNN/` (bản dựng + gói kiểm) |
| Video Reviewer | Codex | `vai/codex_review.md` | Gói kiểm + ý CEO | `videos/<ID>/05_feedback/vNN.md` |
| Social | Claude | `vai/claude_social.md` | Video final đã duyệt | `videos/<ID>/06_social/caption.md`, lên lịch trong TikTok Studio |

## 3. Thư mục và chủ file

Luật **mỗi file một chủ**: chỉ chủ được tạo và sửa. Bên kia chỉ đọc; muốn góp ý thì ghi vào chỗ của mình hoặc vào thẻ việc.

| Thư mục | Chủ |
| --- | --- |
| `00_ceo/`, `vai/`, `AGENTS.md`, `CLAUDE.md` | CEO. Agent chỉ đọc |
| `board/` | Chung, theo luật mục 6 |
| `logs/nhat_ky.md` | Chung. Chỉ thêm dòng mới ở cuối, không sửa dòng cũ |
| `01_manager/`, `02_research/`, `03_content/`, `05_video/`, `06_social/`, `room/` | Claude |
| `04_creative/`, `audits/` | Codex |
| `videos/<ID>/01_suon/`, `04_dung/`, `06_social/` | Claude |
| `videos/<ID>/02_kich_ban/`, `03_creative/`, `05_feedback/` | Codex |

Tên file và thư mục: không dấu, không dấu cách, dùng `_`.

## 4. Luật cứng — vi phạm là dừng

### A. Số liệu (CEO đặt)

1. Mỗi con số (doanh số, %, giá, lượt bán, lượt xem) phải kèm link nguồn mở được và thời điểm của số đó.
2. Không có nguồn thì không ghi số. Ghi: [không có số công khai].
3. Ý nào bạn tự suy ra chứ không đọc thấy trong nguồn, đánh dấu [chưa chắc].
4. Không ước lượng, không làm tròn, không tự tính số mới từ nhiều nguồn khác nhau.
5. Cuối câu trả lời, ghi rõ những gì bạn KHÔNG tìm được.

### B. Vận hành (Claude đề xuất 24/10/2026 — CEO gạch dòng nào không dùng)

6. Không bắt đầu bước sau khi bước trước chưa có dấu CEO duyệt trong thẻ.
7. Không hứa kết quả: không "chắc chắn viral", "ra đơn ngay", "tăng gấp x lần".
8. Mọi asset (ảnh, footage, nhạc, font, mẫu Canva, giọng đọc) phải ghi nguồn và quyền dùng. Thiếu một trong hai thì không đưa vào video.
9. Bóc lỗi nội dung, không công kích người: không nêu tên, handle, mặt của creator hay brand thật trong phần chê, trừ khi CEO duyệt riêng.
10. Không sửa chữ CEO đã duyệt. Muốn đổi thì ghi vào mục **Đề xuất** trong file của mình và chờ CEO.
11. Không xoá file, không đăng bài, không gửi gì ra ngoài (trừ thông báo cho CEO).

**Khi thấy vi phạm** (của mình hay của agent khác): đặt thẻ `BI_CHAN`, ghi lý do và số luật vào mục Nhắc, báo CEO. Không tự sửa file của agent khác.

## 5. Quy trình một video

| Bước | Ai làm | Ra gì | CEO duyệt |
| --- | --- | --- | --- |
| 0 · Lịch & topic | Manager | Lịch sprint + danh sách topic trong `01_manager/` | ✅ Duyệt lịch (mỗi sprint) |
| 1 · Research | Research | File research (khi Manager hoặc Content yêu cầu) | — |
| 2 · Sườn | Claude Content | `01_suon/suon.md` | ✅ Duyệt sườn |
| 3 · Kịch bản | Codex | `02_kich_ban/kich_ban.md` | ✅ Duyệt nội dung |
| 4 · Thể hiện | Codex CD | `03_creative/`: hướng hình, asset có nguồn | ✅ Duyệt thể hiện |
| 5 · Dựng | Claude Video | `04_dung/vNN/video.mp4` + gói kiểm | — |
| 5b · Xem & feedback | CEO + Codex xem cùng; CEO ra lệnh; Codex viết feedback gộp | `05_feedback/vNN.md` → Claude sửa → vNN+1 | ✅ Duyệt final (lặp tới khi đạt) |
| 6 · Caption | Social | `06_social/caption.md`: caption, hashtag, giờ đăng đề xuất (12:00 hoặc 20:00) | ✅ Duyệt caption |
| 7 · Lên lịch & đăng | Social điền sẵn video, caption, giờ trong TikTok Studio, **dừng trước nút cuối** → CEO bấm | Link TikTok trong thẻ | ✅ CEO tự bấm |
| 8 · Đo | Manager lấy số 24h và 48h | Bảng số liệu trong thẻ + Sheet | — |

### Hạn ngược (D = ngày air)

Manager tính hạn từng bước theo bảng này khi tạo thẻ. CEO đặt: **final phải xong trước D một ngày**; các mốc khác là đề xuất 24/10, CEO sửa ở đây nếu cần.

| Mốc | Hạn |
| --- | --- |
| Lịch sprint được duyệt | Chủ nhật trước ngày đầu sprint |
| Research tập xong | D−7 |
| Sườn chờ duyệt | D−6 |
| Kịch bản chờ duyệt | D−5 |
| Thể hiện chờ duyệt | D−4 |
| Bản dựng v01 + gói kiểm | D−3 |
| **Final duyệt** | **D−1, trước 12:00** |
| Caption duyệt | D−1 |
| Đã lên lịch trong TikTok Studio, chờ CEO bấm | D−1, trước 21:00 |
| Số 24h / 48h | D+1 / D+2 |

### Sườn (bước 2) gồm
Hook · insight · 3–5 ý chính theo thứ tự · ví dụ minh hoạ · CTA · nguồn cho mọi con số (luật 1–5). Codex viết lời trên sườn đã duyệt và giữ nguyên hook và insight; muốn đổi thì ghi mục **Đề xuất** (luật 10).

### Gói kiểm (bước 5) — bắt buộc với mọi bản dựng
Đặt trong `videos/<ID>/04_dung/vNN/audit_pack/`:
- `bang_canh.md`: Cảnh | giây bắt đầu–kết thúc | câu thoại | chữ trên màn | hình đang hiện
- `frames/`: mỗi cảnh một ảnh chụp ở giữa cảnh, tên `S01.jpg`, `S02.jpg`…
- `captions.srt`: phụ đề lấy từ voice thật
- `qc.txt`: kết quả QC tự động
- Đường dẫn tới đúng bản kịch bản đã duyệt

Thiếu gói kiểm thì chưa được chuyển thẻ sang `CHO_CEO`.

### Feedback video (bước 5b) — Codex chỉ viết khi CEO ra lệnh
File `05_feedback/vNN.md`, đúng 4 phần:
1. **Ý CEO** — nguyên văn, ưu tiên cao nhất.
2. **Codex đối chiếu kịch bản** — bảng: Cảnh | giây | Kịch bản nói | Video đang làm | Sửa thế nào | Mức (`CHAN` / `NEN` / `TUY`).
3. **Việc cho Claude** — danh sách gộp từ (1) và (2), xếp theo ưu tiên, mỗi dòng một việc làm được ngay.
4. **Codex không kiểm được** — vd độ mượt chuyển động, âm nhạc, những gì ảnh chụp không thể hiện.

Ý Codex trái với ý CEO thì làm theo CEO; Codex chỉ ghi một dòng "Codex khác ý CEO ở: …" để CEO biết.

## 6. Bảng việc `board/`

- Mỗi video một thẻ `board/<ID>.md` (mẫu `board/_MAU_video.md`). Việc khác một thẻ `board/T_<yyyymmdd>_<ten>.md` (mẫu `board/_MAU_viec.md`).
- **Khối trạng thái** (phần giữa hai dòng `---` đầu thẻ): chỉ người đang giữ việc được sửa. Khi bàn giao: đổi `buoc`, `nguoi_giu`, `trang_thai`, `han`, rồi thêm một dòng vào **Lịch sử**.
- `trang_thai` chỉ nhận: `CHUA_LAM` · `DANG_LAM` · `CHO_CEO` · `CAN_SUA` · `BI_CHAN` · `XONG`.
- `nguoi_giu` ghi dạng `Claude/Video`, `Codex/Kich_ban`, `CEO`…
- **Bảng Duyệt**: chỉ ghi khi CEO quyết qua một trong hai đường: (a) nói trực tiếp trong phiên (vd "duyệt sườn CCS-001", "cần sửa: …"); (b) chọn ở cột **Anh quyết** trong tab **Tập** của Google Sheet. Ghi nguyên văn lời CEO, đường nào, thời gian. **Không bao giờ tự đánh dấu duyệt.**
- **Google Sheet** (Master Workspace v3, tab Tập · Kho link · Báo cáo) là màn hình của CEO; `board/` là hồ sơ gốc. Chỉ Claude/Manager ghi vào Sheet, theo `vai/claude_manager.md`. CEO chỉ sửa 2 cột vàng.
- **Nhắc** và **Lịch sử**: chỉ thêm dòng mới ở cuối.
- **Kho link**: mọi link của video (Canva, Drive, render, TikTok…) ghi vào bảng này trong thẻ, không để rải rác.

## 7. Dí việc và thông báo

- Khi CEO gõ `/di-viec` (sau này chạy theo lịch): Manager đồng bộ Sheet, đọc toàn bộ `board/`. Thẻ nào quá `han` thì thêm một dòng vào **Nhắc** của thẻ, rồi gửi CEO danh sách: thẻ nào, ai giữ, trễ bao lâu, CEO đang nợ duyệt gì.
- Mở phiên mới: đọc mục **Nhắc** của thẻ mình giữ trước khi làm việc khác.
- Thẻ chuyển sang `CHO_CEO` hoặc `BI_CHAN` → báo CEO. Kênh Telegram sẽ được bật ở bước 7; trước đó ghi vào `logs/nhat_ky.md` và nói trong phiên.

## 8. Nhật ký

Mỗi lần đổi trạng thái thẻ hoặc tạo file đầu ra, thêm đúng một dòng vào cuối `logs/nhat_ky.md`:

```
2026-10-24 18:50 | Claude/Video | CCS-001 | DANG_LAM -> CHO_CEO | v02 dựng xong, gói kiểm ở videos/CCS-001/04_dung/v02/audit_pack
```

Phòng agent (bước 8) đọc `board/` và `logs/` để hiển thị — viết đúng định dạng.

## 9. Gọi việc

- **Claude Code:** CEO gõ lệnh tắt, vd `/suon CCS-002`. Danh sách lệnh ở `.claude/commands/`.
- **Codex:** CEO nói tên vai và mã video, vd "viết kịch bản CCS-002", "làm creative CCS-002", "feedback CCS-001 v02: <ý CEO>". Codex mở sổ tay vai tương ứng trong `vai/` rồi làm.

## 10. Cách viết cho CEO

- Tiếng Việt có dấu, ngắn, đọc được trên điện thoại.
- Xong việc thì nói đủ 3 ý: làm ra file gì, nằm ở đâu, CEO cần làm gì tiếp.
