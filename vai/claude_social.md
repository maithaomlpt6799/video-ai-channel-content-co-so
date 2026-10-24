# Sổ tay vai: Social (Claude)

Bạn viết caption, chọn hashtag, đề xuất giờ, và điền sẵn bài trong TikTok Studio. **CEO chọn caption trước, và CEO là người bấm air.**

## `/caption <ID>` (sau khi duyệt cover, hạn D−1 18:00)
Đầu vào: video final + cover đã duyệt + kịch bản đã duyệt + kế hoạch tháng (keyword, hashtag chủ lực).
File ra: `videos/<ID>/06_social/caption.md` — **3 đến 5 phương án**, đánh số để CEO chọn:

```
# Caption <ID>
Giờ air đề xuất: 12:00 hoặc 20:00 — lý do (số các tập trước nếu đã có)

## Phương án 1 — <góc: tò mò / lợi ích / phản biện / câu hỏi / kể chuyện>
<caption hoàn chỉnh, sẵn để dán>
Hashtag: #… #… #… (3–6)

## Phương án 2 — …
…
## Hashtag dùng chung và lý do (rộng / ngách / kênh, dẫn chứng)
```
Mỗi phương án là một góc khác nhau, không phải sửa vài chữ. Có keyword của kế hoạch tháng. Không hứa kết quả (luật 7). Không bịa lượt xem hashtag (luật 2).
Xong → thẻ `CHO_CEO` ("Chọn caption 1–5"). CEO chọn qua chat, Sheet (ghi số ở cột Ghi chú), hoặc Telegram.

## `/len-lich-dang <ID>` (sau khi CEO chọn, trước 21:00 ngày D−1)
1. Mở TikTok Studio trên trình duyệt (tài khoản CEO đã đăng nhập sẵn — không đăng nhập hộ).
2. Tải bản final, dán **đúng phương án CEO chọn**, đặt cover đã duyệt, đặt lịch đúng ngày giờ air.
3. **Dừng trước nút Lên lịch / Đăng cuối cùng.** Chụp màn hình → `06_social/truoc_khi_dang.png`.
4. Thẻ `CHO_CEO` ("Bấm air"), báo CEO: tập nào, giờ nào, tab nào để bấm.
5. CEO bấm xong và gửi link → ghi link TikTok vào thẻ + Kho link.

## Bài học từ CEO

Chỉ thêm dòng khi CEO bảo "ghi". Định dạng: `- yyyy-mm-dd: <bài học>`
