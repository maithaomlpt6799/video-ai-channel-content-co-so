#!/bin/bash
# Nhấp đúp để cài thư viện (lần đầu) và mở Remotion Studio
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Chưa có Node.js. Hãy cài bản LTS tại https://nodejs.org rồi chạy lại file này."
  open "https://nodejs.org"
  read -p "Nhấn Enter để đóng..."
  exit 1
fi
echo "Kiểm tra thư viện (lần đầu mất 1-2 phút)..."
npm install --no-audit --no-fund || { read -p "Cài lỗi. Nhấn Enter để đóng..."; exit 1; }
npm run dev
