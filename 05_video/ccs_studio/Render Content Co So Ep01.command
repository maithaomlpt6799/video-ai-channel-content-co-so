#!/bin/bash
# Bấm đúp để render "Content Có Số · Ep01" (Editorial Collage) ra out/content-co-so-ep01.mp4 + ảnh cover.
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
npm run render:ccs01 && npm run cover:ccs01 && open out
