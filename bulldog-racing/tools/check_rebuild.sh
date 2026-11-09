#!/usr/bin/env bash
# Проверка воспроизводимости атласов (попиксельно): Фрэнк (рецепт его пакета) и Луна (build_luna_atlas.py).
# Зефир, Рокки, Пупс: рецепты лежат в tools/ собак, но пересборку из alpha здесь не запускали — см. VALIDATION_REPORT.md.
set -uo pipefail
ROOT=$(cd "$(dirname "$0")/../.." && pwd); T=$(mktemp -d); OUT=$ROOT/bulldog-racing/reports/rebuild_check.json
res_frenk=$(bash "$ROOT/bulldog1-frenk/integration_v1/tools/rebuild_atlas.sh" "$T/frenk" 2>&1 | tail -1)
python3 "$ROOT/bulldog-racing/tools/build_luna_atlas.py" "$T/luna" >/dev/null 2>&1
res_luna=$(python3 - "$ROOT/bulldog-racing/assets/dogs/luna/atlas" "$T/luna" <<'PY'
import sys,json,numpy as np
from PIL import Image
a,b=sys.argv[1:3];ja,jb=json.load(open(a+'/atlas.json')),json.load(open(b+'/atlas.json'))
bad=[k for k in ja['sheets'] if not np.array_equal(np.asarray(Image.open(f'{a}/luna_{k}.png').convert('RGBA')),np.asarray(Image.open(f'{b}/luna_{k}.png').convert('RGBA')))]
if ja!=jb: bad.append('atlas.json')
print('IDENTICAL' if not bad else 'DIFFERENT: '+', '.join(bad))
PY
)
printf '{"frenk":"%s","luna":"%s"}\n' "$res_frenk" "$res_luna" | tee "$OUT"
