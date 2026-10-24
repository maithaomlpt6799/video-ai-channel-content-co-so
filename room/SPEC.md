# Đặc tả bước 7 + 8 — Telegram và Phòng agent

Chủ: Claude (thư mục `room/`). Người xây: chat "Xây hệ thống" trên Claude Code (cùng environment Self_Marketing_AI_Studio). Đọc `AGENTS.md` trước khi xây.
Phong cách hình (thị trấn 3D như video mẫu) làm **sau**; bản này chỉ cần chạy đúng và dễ thay giao diện.

---

## 0. Kiến trúc

Một chương trình chạy nền trên Mac: `room/server/` (Node.js, không cần build). Nó làm 3 việc:

1. **Theo dõi** `board/*.md` và `logs/nhat_ky.md` (đọc lại mỗi 30 giây, so với ảnh chụp trạng thái lần trước ở `room/.state.json`).
2. **Telegram bot** (long polling — không cần mở cổng, không cần domain).
3. **Web phòng agent** ở `http://localhost:4747`.

Mọi quyết định của CEO từ Telegram hoặc web ghi vào **một chỗ**: `logs/ceo_inbox.jsonl` (mỗi dòng một JSON, chỉ thêm). Team Manager áp quyết định vào thẻ — giống cột "Anh quyết" trên Sheet. Server **không tự chuyển bước thẻ**, để logic chuyển bước chỉ nằm một nơi (sổ tay Manager).

```
board/ + logs/ ──đọc──► server ──► Telegram (báo + nút)
                          │  ──► Web phòng agent
CEO bấm nút ──► logs/ceo_inbox.jsonl ──► Team Manager áp vào thẻ (dí việc)
```

Bí mật: `.env` ở gốc thư mục (đã có trong `.gitignore`): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ROOM_PORT=4747`. Không in token ra log, không commit.

## 1. Đọc dữ liệu

- Thẻ: khối YAML giữa hai dòng `---` đầu file (`id, tieu_de, ngay_air, gio_air, buoc, nguoi_giu, trang_thai, han, version`) + bảng **Duyệt**, **Kho link**, mục **Nhắc** (dòng cuối).
- Bỏ qua file bắt đầu bằng `_` (mẫu).
- `nguoi_giu` → team: `Claude/Manager`→Team Manager · `Claude/Research`→Team Research · `Claude/Content`→Team Content Strategy · `Claude/Creative`→Team Creative · `Claude/Video`→Team Video · `Claude/Social`→Team Social · `Codex/Kich_ban`→Team Scriptwriter · `Codex/Review`→Team Audit Video · `CEO`→CEO.
- File thẻ hỏng định dạng: không sập; hiện cảnh báo "thẻ <tên> sai định dạng" trên web và trong bản tin.

## 2. Bước 7 — Telegram

### 2.1 Cài lần đầu
1. CEO tạo bot qua @BotFather, nhắn Start cho bot.
2. Người xây ghi token vào `.env`, gọi `getUpdates` lấy `chat_id` của CEO, ghi vào `.env`.
3. Gửi tin thử: "CCS bot đã nối. Gõ /help để xem lệnh."
4. **Chỉ trả lời chat_id của CEO.** Tin từ người khác: bỏ qua.

### 2.2 Tin tự động (khi thẻ đổi)
| Sự kiện | Tin gửi | Nút |
| --- | --- | --- |
| Thẻ sang `CHO_CEO` | "🟡 CCS-002 · chờ anh duyệt **Sườn** · hạn …" + link file / Drive trong Kho link | **Duyệt** · **Cần sửa** |
| Chờ chọn caption | "CCS-002 · chọn caption" + 3–5 phương án (rút từ `06_social/caption.md`) | **1** · **2** · **3** · **4** · **5** · **Cần sửa** |
| `nguoi_giu` sang Codex | "➡️ Việc cho **Team Scriptwriter**: mở Codex, dán:" + câu lệnh trong khối code để bấm copy (`viết kịch bản CCS-002` / `audit CCS-001 v02`) | — |
| Thẻ `BI_CHAN` | "🔴 CCS-003 bị chặn — <dòng Nhắc cuối>" | — |
| Có bản dựng mới | "🎬 CCS-001 v02 xong — xem: <link Drive>" | — |

Gộp: nhiều sự kiện trong cùng 1 phút → một tin. Không gửi lại sự kiện đã gửi (lưu trong `.state.json`).

### 2.3 Nút bấm
- **Duyệt** → ghi `{"t":"…","id":"CCS-002","diem":"Sườn","ket_qua":"Duyệt","ghi_chu":"","qua":"Telegram"}` vào `logs/ceo_inbox.jsonl`, trả lời "Đã ghi. Team Manager sẽ chuyển việc."
- **Cần sửa** → bot hỏi "Anh muốn sửa gì?", tin nhắn kế tiếp của CEO là `ghi_chu`, ghi `ket_qua:"Cần sửa"`.
- **Số caption** → `ket_qua:"Chọn caption"`, `ghi_chu:"<số>"`.
- Ghi xong, nếu máy có lệnh `claude` (Claude Code CLI): chạy nền `claude -p "dí việc"` trong thư mục dự án để Team Manager áp ngay. Không có CLI → chờ lần "dí việc" kế tiếp, và nói rõ điều đó trong câu trả lời.

### 2.4 Bản tin định kỳ — 08:00 và 20:00
Tính trực tiếp từ thẻ (không cần AI):
1. Anh đang nợ duyệt gì (xếp theo hạn).
2. Việc trễ: thẻ, team, trễ mấy ngày.
3. Việc đang chờ Codex + câu để dán.
4. Việc định kỳ hôm nay (theo `AGENTS.md` mục 9.2): "Hôm nay Thứ 6 → Team Research: làm tiếp".
5. Tập air hôm nay / mai.
Nếu có CLI `claude`: trước bản tin 08:00 chạy `claude -p "dí việc"` để Sheet và thẻ được đồng bộ.

### 2.5 Lệnh gõ trong Telegram
`/hom_nay` (bản tin ngay) · `/cho_duyet` · `/tap CCS-002` (tình trạng một tập) · `/help`.

## 3. Bước 8 — Phòng agent (web) — bản 1

Một trang, mở ở `http://localhost:4747`, đọc được trên điện thoại (bề ngang 390px).

### 3.1 Màn hình
1. **Phòng** — 8 bàn làm việc, mỗi bàn một team: tên team, app (Claude / Codex), trạng thái (Rảnh · Đang làm · Chờ CEO · Bị chặn · Trễ), thẻ đang giữ + hạn. Bấm vào bàn → khung bên: danh sách việc của team, dòng Nhắc, file đầu ra gần nhất, **câu để dán** vào chat của team đó (nút copy).
2. **Chờ anh duyệt** — danh sách + nút Duyệt / Cần sửa (ô nhập) / chọn số caption. Ghi vào `logs/ceo_inbox.jsonl` y như Telegram.
3. **Lịch** — các tập theo ngày air (T2 · T4 · T6), thanh tiến độ theo bước 1→10.
4. **Kho link** — gom từ Kho link của mọi thẻ, lọc theo tập / loại.
5. **Nhật ký** — 50 dòng cuối `logs/nhat_ky.md`.

### 3.2 Giao việc
Nút "Giao việc" → chọn team, mô tả, hạn → tạo `board/T_<yyyymmdd>_<ten>.md` theo `board/_MAU_viec.md` (`giao_boi: CEO`, `nguoi_giu` theo team, `CHUA_LAM`), thêm dòng nhật ký, báo Telegram. Team nhận việc ở lần "làm tiếp" kế tiếp.

### 3.3 Không có ở bản 1
- **Chat trực tiếp với agent trên web.** Bản 2: nếu máy có `claude` / `codex` CLI, khung chat gửi lệnh qua `claude -p` / `codex exec` trong thư mục dự án với câu mở team tương ứng (`00_ceo/mo_phong.md`), lưu lịch sử ở `room/chat/<team>.jsonl`. Lưu ý: lịch sử này **tách** với chat trong app desktop.
- Giao diện 3D / nhân vật. Giữ dữ liệu và giao diện tách nhau (`/api/*` trả JSON; trang chỉ vẽ) để sau thay giao diện không đụng logic.

### 3.4 API (để sau thay giao diện)
`GET /api/teams` · `GET /api/cards` · `GET /api/pending` · `GET /api/links` · `GET /api/log` · `POST /api/decision` · `POST /api/task`.

## 4. Chạy và truy cập

- Chạy tự động khi Mac khởi động: `launchd` (`~/Library/LaunchAgents/com.ccs.room.plist`), log ở `room/server/server.log`. Có lệnh bật/tắt ghi trong `room/README.md`.
- Server chỉ nghe `127.0.0.1` + địa chỉ Tailscale (nếu có). **Không mở ra internet.**
- **Điện thoại:** Telegram dùng được ở mọi nơi. Muốn mở web phòng agent trên điện thoại: cài Tailscale trên Mac và điện thoại (cùng tài khoản), mở `http://<tên-máy>:4747`.
- Mac tắt / ngủ → bot và web dừng. Thẻ không mất; bật lại sẽ gửi bù sự kiện bị lỡ (so với `.state.json`).

## 5. Kiểm thử trước khi báo xong

1. Tạo thẻ thử `board/CCS-999.md` trạng thái `CHO_CEO` → Telegram nhận tin có nút trong ≤ 1 phút.
2. Bấm Duyệt → có dòng mới trong `logs/ceo_inbox.jsonl`.
3. Bấm Cần sửa + gõ ý → dòng có `ghi_chu` đúng nguyên văn.
4. Đổi `nguoi_giu` sang `Codex/Review` → tin có câu dán `audit CCS-999 v01`.
5. Web: 8 bàn hiện đúng; CCS-999 nằm ở "Chờ anh duyệt"; bấm Duyệt trên web → thêm dòng inbox.
6. Giao việc trên web → có file `board/T_…`.
7. Gõ `/hom_nay` → nhận bản tin.
8. Tắt server, đổi thẻ, bật lại → nhận tin bù.
9. Xoá CCS-999 và các dòng thử trong inbox (CEO cho phép), commit.
