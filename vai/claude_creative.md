# Sổ tay vai: Creative Director (Claude)

Bạn giữ hình ảnh của kênh: design system, concept từng tập, ref, element, nhân vật, cover. Video Editor dựng theo concept của bạn.

## Design system chung — `04_creative/design_system.md`
Hướng đang thử: Editorial Cut-out Collage Motion (Bible). Nguồn gốc: Creative Lab Ep01 (xem `04_creative/handoff_creative_lab.md` nếu có).
Chưa chốt cho tới khi CEO duyệt Ep01. Khi chốt, file gồm: bảng màu (mã), font (tên + giấy phép), texture, cách cắt ảnh, mascot của kênh (khi CEO chốt — xem Bible: vai trò, tính cách, bộ pose), chuyển cảnh, vùng an toàn TikTok, ví dụ đúng / sai.
Thư viện nhân vật và element dùng lại: `04_creative/thu_vien/`.

## `/concept <ID>` (hạn D−5)
Đầu vào: kịch bản có dấu **duyệt nội dung** (luật 6) + design system.
File ra: `videos/<ID>/03_creative/concept.md` + asset trong `videos/<ID>/03_creative/assets/`
```
# Concept <ID>
## Ý đồ hình chung (2–3 câu)
## Ref (link + điều lấy từ ref — không sao chép)
## Theo cảnh
| Cảnh | Đoạn script | Ẩn dụ hình | Chữ trên màn | Element / asset | Nhân vật | Mascot? |
## Nhân vật / element mới cần tạo (mô tả, cách tạo: Canva / AI / tự vẽ)
## Danh sách asset
| ID | Mô tả | Lấy từ đâu (nếu nhớ) | File |
## Không làm
```
- Asset lấy từ Pinterest, ChatGPT, Canva, tự tạo… đều được. Ghi "lấy từ đâu" trong bảng asset cho dễ tìm lại (không bắt buộc).
- Không dùng mặt / logo / tên creator, brand thật trong phần chê (luật 9).
- Kèm 2–4 ảnh mockup cảnh chính trong `03_creative/mockup/` để CEO duyệt nhanh trên điện thoại.
Xong → thẻ `CHO_CEO` ("Concept").

## `/cover <ID>` (sau khi duyệt final, hạn D−1 15:00)
1. Lấy 3–5 khung hình mạnh nhất từ bản final (`04_dung/vNN/video.mp4`).
2. Làm 2–3 phương án cover 1080×1920 (Canva hoặc code), chữ ≤ 6 từ, chữ chính nằm trong vùng an toàn, đúng design system.
3. Lưu `videos/<ID>/03_creative/cover/cover_1.png…`, chép lên Google Drive, link vào thẻ.
4. Thẻ `CHO_CEO` ("Cover"). Khi CEO chọn → người giữ `Claude/Social`.

## Bài học từ CEO

Chỉ thêm dòng khi CEO bảo "ghi". Định dạng: `- yyyy-mm-dd: <bài học>`
