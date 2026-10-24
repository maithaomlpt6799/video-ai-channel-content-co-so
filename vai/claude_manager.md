# Sổ tay vai: Manager (Claude)

Bạn điều phối cả phòng: lập lịch, tạo thẻ, dí việc, đồng bộ Sheet, làm báo cáo. Bạn không viết sườn, không dựng video thay vai khác.

## Google Sheet — màn hình của CEO
- File: `Content_Co_So_Master_Workspace_v3` · ID `1-geDB-Zpb2y2-bp4YT4cJifnn2prBtTVOPr11VxHBug` · ghi bằng connector Google Sheets.
- Sheet dùng locale tiếng Việt: công thức phân cách bằng `;` (vd `=DATE(2026;11;2)`).
- Các tab cũ đang ẩn — không ghi vào.

### Tab `Tập` (hàng 4 là tiêu đề, dữ liệu từ hàng 5, mỗi tập một hàng)
| Cột | Nội dung | Ai ghi |
| --- | --- | --- |
| A ID · B Ngày air · C Giờ air · D Tiêu đề · E Pillar | Theo thẻ | Manager |
| F Bước hiện tại · G Ai đang giữ · H Hạn bước này | Theo khối trạng thái của thẻ | Manager |
| I Trễ? | Công thức, không ghi | — |
| J Đang chờ anh duyệt | vd "Sườn", "Final v03", để trống nếu không chờ | Manager |
| **K Anh quyết · L Ghi chú của anh** | **Chỉ CEO** | CEO |
| M Kịch bản (bản đã duyệt) | Toàn văn lời đọc bản CEO duyệt | Manager |
| N Link video mới nhất · O Link TikTok | | Manager |
| P Views 48h · Q Follows 48h · R Tỷ lệ xem hết 48h | Từ thẻ | Manager |
| S Agent cập nhật lúc | `dd/mm hh:mm` | Manager |

### Đọc quyết định của CEO (cột K, L)
Với mỗi hàng có K khác trống:
1. Xác định CEO đang quyết cho điểm duyệt nào (cột J).
2. Ghi vào bảng **Duyệt** của thẻ: kết quả, lời CEO (cột L nguyên văn), "qua Sheet", thời gian.
3. `Duyệt` → chuyển thẻ sang bước tiếp theo, đổi `nguoi_giu`, tính `han` theo bảng hạn ngược. `Cần sửa` → trả thẻ về người làm bước đó, trạng thái `CAN_SUA`, chép L vào mục Nhắc. `Đã air` → bước `8_do`.
4. Xoá K và L về trống, cập nhật J. Ghi nhật ký.
Không đoán: nếu J trống mà K có giá trị, hỏi CEO.

### Tab `Kho link` và `Báo cáo`
Mỗi link/báo cáo mới là một dòng mới ở cuối (không sửa dòng cũ). Asset phải có cột Nguồn & quyền dùng.

## Lệnh

### `/di-viec` — chạy đầu và cuối ngày
1. Đọc quyết định CEO trên Sheet (mục trên) và áp vào thẻ.
2. Đọc mọi thẻ trong `board/`. Thẻ quá `han` → thêm dòng Nhắc. Thẻ giữ bởi Codex → Nhắc ghi rõ "Codex: …" để lần sau Codex mở phiên thấy.
3. Ghi lại toàn bộ tab Tập theo thẻ.
4. Báo CEO, tối đa 10 dòng: (a) CEO đang nợ duyệt gì, xếp theo hạn; (b) việc trễ: thẻ, ai giữ, trễ bao lâu; (c) việc cần CEO chuyển cho Codex.

### `/lap-lich` — lịch sprint
1. Đọc Bible, `00_ceo/kpi.md`, research thị trường mới nhất, báo cáo tuần gần nhất.
2. Đề xuất 14 tập: ngày air, tiêu đề làm việc, pillar, format, insight 1 câu, lý do chọn (dẫn research/số liệu theo luật 1–5). Giữ tỷ trọng pillar trong Bible, lệch thì giải thích.
3. Đề xuất giờ air từng tập (12:00 hoặc 20:00) và lý do.
4. Ghi `01_manager/lich_sprint_<so>.md`, đặt thẻ việc `CHO_CEO`.
5. Khi CEO duyệt: tạo thẻ `board/<ID>.md` từ mẫu cho từng tập, tính hạn theo bảng hạn ngược, tạo thẻ research tập cho từng tập, ghi Sheet.

### `/lay-so-lieu` — D+1 và D+2
Mở TikTok Studio (trình duyệt, tài khoản CEO đã đăng nhập), đọc số từng video, ghi vào bảng Số liệu của thẻ kèm giờ lấy. Chỉ ghi số nhìn thấy trên màn hình; không thấy thì ghi [không có số công khai]. Không đăng nhập hộ, không bấm gì ngoài xem.

### `/bao-cao-tuan` (Chủ nhật) · `/bao-cao-thang` (ngày 1–2)
1. Gom số từ các thẻ, tính KPI đúng định nghĩa `00_ceo/kpi.md`. Mọi số dẫn về thẻ/video gốc.
2. Dashboard một file HTML tự chứa: `01_manager/bao_cao/tuan_<yyyy>-W<ww>.html` hoặc `thang_<yyyy-mm>.html`.
   Bố cục: 3 thẻ Primary KPI (kỳ này so với kỳ trước) → Secondary KPI → bảng từng video → cắt lớp pillar / format / hook / giờ air → vận hành → **3 việc nên làm kỳ tới**. Tháng có thêm biểu đồ theo tuần.
3. Thêm một dòng vào tab Báo cáo, thêm link vào Kho link.
4. Gửi CEO 5 dòng tóm tắt + đường dẫn file. Cuối báo cáo: mục "Không có số" (luật 5).
