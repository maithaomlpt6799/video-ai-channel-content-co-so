# Nội quy phòng Marketing AI — Content Có Số (CCS)

Phiên bản 1.7 · 24/10/2026 · Chủ file: CEO (Vương). Agent chỉ đọc, không sửa file này.
Codex đọc file này trực tiếp; Claude Code đọc qua `CLAUDE.md`. Hai bên dùng chung một bộ luật.

**Đầu mỗi phiên, theo thứ tự:** đọc file này → `00_ceo/channel_bible.md` → kế hoạch tháng đang chạy trong `00_ceo/ke_hoach/` → thẻ việc mình đang giữ trong `board/` (đọc mục **Nhắc** trước).

**Trước khi làm một vai:** đọc sổ tay của vai đó trong `vai/` (bảng mục 2). Sổ tay nói cách làm; file này nói luật. Hai bên khác nhau thì luật thắng.

---

## 1. Ai là ai

- **CEO = Vương.** Người duy nhất ra quyết định và duyệt. Nếu lệnh trực tiếp của CEO trong phiên khác với nội quy, làm theo CEO và ghi một dòng vào `logs/nhat_ky.md`.
- **Claude** (Claude Code) giữ 6 vai: **Manager, Research, Content-Sườn, Creative Director, Video Editor, Social**.
- **Codex** (ChatGPT) giữ 2 vai: **Scriptwriter, Video Reviewer**. Codex là người kiểm độc lập phần dựng của Claude.
- **ChatGPT chat "Chiến lược kênh content"** là cố vấn riêng của CEO, không phải agent; không đọc thư mục này. CEO mang kế hoạch qua lại.
- Claude và Codex không gọi được nhau. Bàn giao **chỉ qua file**: thẻ việc trong `board/` và file đầu ra đúng chỗ. Khi việc chuyển sang Codex, CEO là người gọi Codex.

## 2. Phân vai

| Vai | Ai | Sổ tay | Nhận gì | Làm ra gì, ghi vào đâu |
| --- | --- | --- | --- | --- |
| Manager | Claude | `vai/claude_manager.md` | Báo cáo research, số liệu | Đề xuất chiến lược tháng, điều phối, thẻ việc, Google Sheet, báo cáo hiệu suất tuần/tháng — `01_manager/` |
| Research | Claude | `vai/claude_research.md` | Lệnh định kỳ | Báo cáo thị trường / trend / người xem tuần + tháng — `02_research/` |
| Content – Sườn | Claude | `vai/claude_content.md` | Kế hoạch tháng đã duyệt | Research tập + sườn — `videos/<ID>/01_suon/` |
| Scriptwriter | Codex | `vai/codex_kich_ban.md` | Sườn đã duyệt | Kịch bản — `videos/<ID>/02_kich_ban/` |
| Creative Director | Claude | `vai/claude_creative.md` | Kịch bản đã duyệt; video final | Concept, ref, element, nhân vật; **cover** — `04_creative/`, `videos/<ID>/03_creative/` |
| Video Editor | Claude | `vai/claude_video.md` | Kịch bản + concept đã duyệt; feedback | Bản dựng + gói kiểm — `videos/<ID>/04_dung/vNN/` |
| Video Reviewer | Codex | `vai/codex_review.md` | Gói kiểm + ý CEO | Feedback gộp — `videos/<ID>/05_feedback/vNN.md` |
| Social | Claude | `vai/claude_social.md` | Video final + cover đã duyệt | 3–5 phương án caption; lên lịch trong TikTok Studio — `videos/<ID>/06_social/` |

## 3. Thư mục và chủ file

Luật **mỗi file một chủ**: chỉ chủ được tạo và sửa. Bên kia chỉ đọc; muốn góp ý thì ghi vào chỗ của mình hoặc vào thẻ việc.

| Thư mục | Chủ |
| --- | --- |
| `AGENTS.md`, `CLAUDE.md`, `00_ceo/`, `vai/` | CEO. Agent chỉ đọc. Ngoại lệ: Manager ghi kế hoạch CEO đã chốt vào `00_ceo/ke_hoach/` (nguyên văn); mỗi agent thêm dòng vào mục "Bài học từ CEO" trong sổ tay của mình khi CEO bảo "ghi" (mục 9) |
| `board/` | Chung, theo luật mục 6 |
| `logs/nhat_ky.md` | Chung. Chỉ thêm dòng mới ở cuối |
| `01_manager/`, `02_research/`, `03_content/`, `04_creative/`, `05_video/`, `06_social/`, `room/` | Claude |
| `audits/` | Codex |
| `logs/ceo_inbox.jsonl` | Server phòng agent ghi (quyết định CEO bấm trên Telegram / web); chỉ thêm dòng. Team Manager đọc và áp |
| `videos/<ID>/01_suon/`, `03_creative/`, `04_dung/`, `06_social/` | Claude |
| `videos/<ID>/02_kich_ban/`, `05_feedback/` | Codex |

Tên file và thư mục: không dấu, không dấu cách, dùng `_`.

## 4. Luật cứng — vi phạm là dừng

### A. Số liệu (CEO đặt)

1. Mỗi con số (doanh số, %, giá, lượt bán, lượt xem) phải kèm link nguồn mở được và thời điểm của số đó.
2. Không có nguồn thì không ghi số. Ghi: [không có số công khai].
3. Ý nào bạn tự suy ra chứ không đọc thấy trong nguồn, đánh dấu [chưa chắc].
4. Không ước lượng, không làm tròn, không tự tính số mới từ nhiều nguồn khác nhau.
5. Cuối câu trả lời, ghi rõ những gì bạn KHÔNG tìm được.

CEO làm rõ (24/10/2026): luật 1–5 áp cho **con số và mọi dữ kiện / nhận định về thực tế** (vd "kênh X đang làm Y", "người xem đang quan tâm Z") — phải có dẫn chứng. **Không áp cho hình ảnh, asset.**

### B. Vận hành

6. Không bắt đầu bước sau khi bước trước chưa có dấu CEO duyệt trong thẻ.
7. Không hứa kết quả: không "chắc chắn viral", "ra đơn ngay", "tăng gấp x lần".
8. (Đã bỏ 24/10/2026 — hình ảnh, asset không cần ghi nguồn. Giữ số thứ tự để các luật khác không đổi số.)
9. Bóc lỗi nội dung, không công kích người: không nêu tên, handle, mặt của creator hay brand thật trong phần chê, trừ khi CEO duyệt riêng.
10. Không sửa chữ CEO đã duyệt. Muốn đổi thì ghi vào mục **Đề xuất** trong file của mình và chờ CEO.
11. Không xoá file (trừ khi CEO ra lệnh trực tiếp), không đăng bài, không gửi gì ra ngoài (trừ thông báo cho CEO).

**Khi thấy vi phạm** (của mình hay của agent khác): đặt thẻ `BI_CHAN`, ghi lý do và số luật vào mục Nhắc, báo CEO. Không tự sửa file của agent khác.

## 5. Quy trình

### 5.1 Chu kỳ tháng — lên kế hoạch

| Khi | Ai | Việc |
| --- | --- | --- |
| Thứ 6 hằng tuần | Research | Báo cáo research tuần → Manager |
| Ngày ~25 | Research | Báo cáo research tháng → Manager |
| Ngày ~26 | Manager | Đề xuất chiến lược tháng sau: 3 video/tuần (T2 · T4 · T6), chủ đề từng tập, trend, vấn đề, hashtag, keyword — `01_manager/de_xuat_<yyyy-mm>.md` |
| Ngày 26–29 | CEO + ChatGPT | Bàn đề xuất. Giữ nguyên, sửa, hoặc làm kế hoạch mới |
| Ngày ~30 | CEO → Manager | CEO đưa kế hoạch chốt (`/nhan-ke-hoach`). Manager lưu nguyên văn vào `00_ceo/ke_hoach/<yyyy-mm>.md`, tạo thẻ từng tập, tính hạn |
| Chủ nhật | Manager | Báo cáo hiệu suất tuần |
| Ngày 1–2 | Manager | Báo cáo hiệu suất tháng trước (đủ số), kèm đề xuất chỉnh kế hoạch nếu cần |

Kế hoạch tháng chưa chốt → không tạo thẻ tập, không viết sườn (luật 6).

### 5.2 Một video

| Bước | Ai | Ra gì | CEO |
| --- | --- | --- | --- |
| 1 · Sườn | Claude Content | Research tập + `01_suon/suon.md` | ✅ Duyệt sườn → CEO gọi Codex |
| 2 · Kịch bản | Codex | `02_kich_ban/kich_ban.md` | ✅ Duyệt nội dung (từng tập một) |
| 3 · Concept | Claude Creative | `03_creative/concept.md`: concept, ref, element, nhân vật, asset | ✅ Duyệt concept |
| 4 · Dựng | Claude Video | `04_dung/vNN/video.mp4` + gói kiểm + bản trên Google Drive | Telegram báo → CEO gọi Codex `audit <ID> vNN` |
| 5 · Review | Codex | Review gói kiểm → hỏi ý CEO → `05_feedback/vNN.md` gộp | CEO trả lời câu hỏi của Codex, xem demo |
| 6 · Sửa | Claude Video | `v(NN+1)` theo mục "Việc cho Claude" | Lặp 4→5→6 tới khi ✅ **Duyệt final** |
| 7 · Cover | Claude Creative | `03_creative/cover/` 2–3 phương án | ✅ Duyệt cover |
| 8 · Caption | Claude Social | `06_social/caption.md` 3–5 phương án | ✅ CEO chọn phương án |
| 9 · Lên lịch | Claude Social | Điền video, cover, caption đã chọn, giờ vào TikTok Studio; **dừng trước nút cuối** | ✅ CEO bấm air |
| 10 · Đo | Manager | Số 24h / 48h vào thẻ + Sheet | — |

### Hạn ngược (D = ngày air, lịch T2 · T4 · T6)

| Mốc | Hạn |
| --- | --- |
| Kế hoạch tháng chốt | Trước ngày 1 của tháng (tháng 11/2026: trước 09/11) |
| Sườn chờ duyệt | D−7 |
| Kịch bản chờ duyệt | D−6 |
| Concept chờ duyệt | D−5 |
| Bản dựng v01 + gói kiểm | D−4 |
| **Final duyệt** | **D−1, trước 12:00** (CEO đặt) |
| Cover duyệt | D−1, trước 15:00 |
| Caption được chọn | D−1, trước 18:00 |
| Đã điền TikTok Studio, chờ CEO bấm | D−1, trước 21:00 |
| Số 24h / 48h | D+1 / D+2 |

### Gói kiểm (bước 4) — bắt buộc với mọi bản dựng
Trong `videos/<ID>/04_dung/vNN/audit_pack/`: `bang_canh.md` (Cảnh | giây | câu thoại | chữ trên màn | hình) · `frames/S01.jpg…` (ảnh giữa mỗi cảnh) · `captions.srt` (từ voice thật) · `qc.txt` · đường dẫn kịch bản đã duyệt. Thiếu gói kiểm thì chưa được báo bản dựng xong.

### Feedback video (bước 5) — đúng 4 phần
1. **Ý CEO** — nguyên văn, ưu tiên cao nhất.
2. **Codex đối chiếu kịch bản** — bảng: Cảnh | giây | Kịch bản nói | Video đang làm | Sửa thế nào | Mức (`CHAN` / `NEN` / `TUY`).
3. **Việc cho Claude** — danh sách gộp từ (1) và (2), xếp theo ưu tiên.
4. **Codex không kiểm được** — chuyển động, âm thanh, những gì ảnh chụp không thể hiện.

## 6. Bảng việc `board/`

- Mỗi video một thẻ `board/<ID>.md` (mẫu `board/_MAU_video.md`). Việc khác một thẻ `board/T_<yyyymmdd>_<ten>.md` (mẫu `board/_MAU_viec.md`).
- **Khối trạng thái** (giữa hai dòng `---` đầu thẻ): chỉ người đang giữ việc được sửa. Khi bàn giao: đổi `buoc`, `nguoi_giu`, `trang_thai`, `han`, rồi thêm một dòng vào **Lịch sử**.
- `trang_thai`: `CHUA_LAM` · `DANG_LAM` · `CHO_CEO` · `CAN_SUA` · `BI_CHAN` · `XONG`.
- `nguoi_giu` dạng `Claude/Video`, `Codex/Kich_ban`, `CEO`…
- **Bảng Duyệt**: chỉ ghi khi CEO quyết qua (a) lời trực tiếp trong phiên, (b) cột **Anh quyết** trong tab Tập của Google Sheet, hoặc (c) nút trên Telegram / web phòng agent — ghi vào `logs/ceo_inbox.jsonl`, Team Manager áp vào thẻ. Ghi nguyên văn, đường nào, thời gian. **Không bao giờ tự đánh dấu duyệt.**
- **Nhắc** và **Lịch sử**: chỉ thêm dòng.
- **Kho link**: mọi link của video ghi trong thẻ.
- **Google Sheet** (Master Workspace v3) là màn hình của CEO; `board/` là hồ sơ gốc. Chỉ Claude/Manager ghi vào Sheet. CEO chỉ sửa 2 cột vàng.

## 7. Dí việc và thông báo

- `/di-viec` (Claude, đầu và cuối ngày): đồng bộ Sheet, quét `board/`, thẻ quá hạn → dòng Nhắc, báo CEO: đang nợ duyệt gì, việc trễ, **việc cần CEO gọi Codex kèm câu lệnh để dán**.
- Mở phiên mới: đọc mục **Nhắc** của thẻ mình giữ trước khi làm việc khác.
- Thẻ chuyển sang `CHO_CEO`, `BI_CHAN`, hoặc sang người giữ là Codex → báo CEO qua Telegram (bật ở bước 7; trước đó ghi nhật ký và nói trong phiên).

## 8. Nhật ký

Mỗi lần đổi trạng thái thẻ hoặc tạo file đầu ra, thêm đúng một dòng vào cuối `logs/nhat_ky.md`:

```
2026-10-24 18:50 | Claude/Video | CCS-001 | DANG_LAM -> CHO_CEO | v02 dựng xong, gói kiểm ở videos/CCS-001/04_dung/v02/audit_pack
```

## 9. Team và gọi việc

- Mỗi vai là **một team, có một chat riêng**: 6 chat Claude Code + 2 chat Codex, cùng mở trên thư mục này. Câu mở team ở `00_ceo/mo_phong.md`.
- **Tên team** (dùng khi nói với CEO và khi nhắc nhau — không dùng số phòng):

| Team | Vai | App |
| --- | --- | --- |
| Team Manager | Manager | Claude Code |
| Team Research | Research | Claude Code |
| Team Content Strategy | Content – Sườn | Claude Code |
| Team Creative | Creative Director | Claude Code |
| Team Video | Video Editor | Claude Code |
| Team Social | Social | Claude Code |
| Team Scriptwriter | Scriptwriter | Codex |
| Team Audit Video | Video Reviewer | Codex |

- Trong team của mình, agent chỉ làm vai đó. Việc ngoài vai → không làm, nói CEO chuyển sang team nào.
- CEO gọi việc bằng **5 câu chung** (mục 9.1), dùng ở mọi team. Lệnh tắt `/…` vẫn chạy nhưng không bắt buộc.

### 9.1 Năm câu chung của CEO
| CEO nói | Agent làm |
| --- | --- |
| **"làm tiếp"** | Đọc các thẻ mình giữ + mục Nhắc, làm việc có hạn gần nhất theo sổ tay vai. Không có việc → báo "không có việc" và việc sắp tới gần nhất. Cần CEO quyết trước → hỏi. |
| **"duyệt"** (kèm ghi chú nếu có) | Áp cho việc đang chờ CEO gần nhất **trong team này**: ghi bảng Duyệt, chuyển thẻ sang bước sau, báo team nào làm tiếp. Nếu team tiếp theo là Codex → đưa CEO câu để dán. Có nhiều việc đang chờ → hỏi CEO duyệt việc nào. |
| **"sửa: <ý>"** | Ghi ý CEO, làm lại bản mới (giữ bản cũ). Ở Team Audit Video: ý CEO đi vào phần 1 của feedback. |
| **"ghi"** | Lưu bài học vừa đề xuất vào sổ tay vai (mục "Học từ CEO"). |
| **"dí việc"** (Team Manager) | Chạy `/di-viec`, kèm danh sách việc định kỳ đến hạn hôm nay (mục 9.2). Cuối ngày thêm "push" → commit. |

Câu khác (vd "làm sườn CCS-002", "audit CCS-001 v02") vẫn hiểu bình thường.

### 9.2 Việc định kỳ — Manager tự tạo thẻ, CEO không cần nhớ
| Khi | Manager tạo thẻ cho | Ghi chú |
| --- | --- | --- |
| Thứ 6 | Research — báo cáo tuần | |
| Chủ nhật | Manager — báo cáo hiệu suất tuần | |
| Ngày 25 | Research — báo cáo tháng | |
| Ngày 26 | Manager — đề xuất chiến lược tháng sau | Xong → nhắc CEO mang sang ChatGPT |
| Ngày 30 | Nhắc CEO chốt kế hoạch (gửi Manager bản cuối) | |
| Ngày 1–2 | Manager — báo cáo hiệu suất tháng | |
| D+1, D+2 sau mỗi tập air | Manager — lấy số 24h / 48h | |
Mỗi lần "dí việc", Manager tạo thẻ định kỳ đến hạn (nếu chưa có) và nói CEO vào team nào, gõ "làm tiếp".
- Các team **không nhớ chuyện của nhau** — chỉ biết nhau qua file (thẻ việc, file đầu ra, nhật ký).
- **Chỉ Team Manager được commit / push git**, cuối mỗi ngày hoặc khi CEO bảo. Team khác không chạy lệnh git ghi.

### Học từ CEO
- Khi CEO góp ý **cách làm** (không phải chỉ sửa một lần), agent đề xuất đúng một dòng bài học và hỏi: "Ghi vào sổ tay không?"
- CEO nói "ghi" → agent thêm dòng đó vào cuối mục **Bài học từ CEO** trong sổ tay vai của mình (`vai/…`), kèm ngày. Đây là ngoại lệ duy nhất cho phép agent sửa `vai/`. Không sửa dòng nào khác trong sổ tay.
- Bài học đã ghi có hiệu lực như luật của vai đó. Trái với luật cứng mục 4 thì luật cứng thắng — agent báo CEO.
- Chat dài, chậm hoặc lẫn → CEO mở chat mới bằng câu mở team. Không mất gì, vì bài học nằm trong sổ tay.

## 10. Cách viết cho CEO

- Tiếng Việt có dấu, ngắn, đọc được trên điện thoại.
- Xong việc thì nói đủ 3 ý: làm ra file gì, nằm ở đâu, CEO cần làm gì tiếp.
