#!/bin/bash
# Nhấp đúp để render video MP4 (H.264) vào thư mục out/
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Chưa có Node.js. Cài bản LTS tại https://nodejs.org rồi chạy lại."; open "https://nodejs.org"; read -p "Nhấn Enter để đóng..."; exit 1
fi
npm install --no-audit --no-fund || { read -p "Cài lỗi. Nhấn Enter để đóng..."; exit 1; }
npm run render && npm run render:ep01 && open out
read -p "Xong. Nhấn Enter để đóng..."
