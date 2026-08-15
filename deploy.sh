#!/usr/bin/env bash
# ═══ Деплой quiz-party на GitHub Pages (одна команда: ./deploy.sh) ═══
set -e
if [ ! -f .env ]; then
  echo "❌ Нет .env — создай с VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY (вшиваются в билд)"; exit 1
fi
npm run build
rm -rf docs && cp -r dist docs && touch docs/.nojekyll
git add -A && git commit -m "deploy $(date +%Y-%m-%d_%H:%M)" && git push
echo "✅ Запушено. Через ~1 мин: https://akwunavi.github.io/quiz-party/"
