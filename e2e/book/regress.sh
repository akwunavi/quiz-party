#!/usr/bin/env bash
# ═══ Регресс других тем при правках «Книги»: снимки «до/после» тех же сцен ═══
# usage: e2e/book/regress.sh <app-dir> <tag> [run-suffix]   (app-dir — vite build с VITE_SUPABASE_URL=http://127.0.0.1:7399/sb)
# PNG — в $QP_BOOK_SCRATCH/shots-png-regress-<theme>-<tag><suffix>/; сравнение — regress-compare.py.
set -euo pipefail
APP="$1"; TAG="$2"; RUN="${3:-}"
: "${QP_BOOK_SCRATCH:?нужен QP_BOOK_SCRATCH}"
SCENES="${QP_REGRESS_SCENES:-01-lobby-8,04-q-0img-long,08-q-4img,08c-q-4img-choices,10-recall-A,11-revealed-plain,12-revealed-answer-media}"
for th in ${QP_REGRESS_THEMES:-classic potter new_year ny_home enchanted_forest}; do
  QP_BOOK_THEME="$th" QP_BOOK_APP="$APP" node "$(dirname "$0")/shoot.cjs" --no-build --set "regress-$th-$TAG$RUN" \
    --out "$QP_BOOK_SCRATCH/regress-out/$th-$TAG$RUN" --only "$SCENES" --exact --vp 1920x1080 --no-reduced --mask
done
