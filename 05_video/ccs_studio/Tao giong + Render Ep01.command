#!/bin/bash
# Nhấp đúp: AI đọc kịch bản Tập 01 → khớp phụ đề + nét vẽ theo giọng → render MP4.
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Chưa có Node.js. Cài bản LTS tại https://nodejs.org rồi chạy lại."; open "https://nodejs.org"; read -p "Nhấn Enter để đóng..."; exit 1
fi
if [ ! -f .env ] || grep -q "dien_" .env; then
  [ -f .env ] || cp .env.example .env
  echo "Mở file .env — hãy dán API key và Voice ID của ElevenLabs, lưu lại (Cmd+S), rồi nhấp đúp lại file này."
  open -e .env
  read -p "Nhấn Enter để đóng..."; exit 0
fi
npm install --no-audit --no-fund || { read -p "Cài lỗi. Nhấn Enter để đóng..."; exit 1; }
echo "== Đang tạo giọng đọc bằng ElevenLabs =="
node scripts/tts-elevenlabs.mjs ep01 || { read -p "Tạo giọng lỗi (xem dòng báo lỗi ở trên). Nhấn Enter để đóng..."; exit 1; }
echo "== Đang render video =="
npm run render:ep01 && open out/ep01-khong-thieu-y-tuong.mp4
read -p "Xong. Nhấn Enter để đóng..."
