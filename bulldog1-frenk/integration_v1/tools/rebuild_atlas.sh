#!/usr/bin/env bash
# Rebuild the Frenk atlas from the committed alpha sources and compare it PIXEL-EXACTLY with the committed atlas/.
# Needs: git (the RUN alpha is read from a git object of another branch), ffmpeg with libvpx-vp9, python3 with Pillow + numpy.
# usage: tools/rebuild_atlas.sh [WORKDIR]   (default: a new temp dir; nothing in the repo is written)
set -euo pipefail
PKG=$(cd "$(dirname "$0")/.." && pwd); B=$(cd "$PKG/.." && pwd); W=${1:-$(mktemp -d)}; D=$W/dec; O=$W/atlas
mkdir -p "$D"/{run,v1f,g3f,v4,sniff,bf,roll} "$O"
dec(){ ffmpeg -v error -y -c:v libvpx-vp9 -i "$1" -pix_fmt rgba -vsync 0 "$2"; }
git -C "$B" show 8e30e5152fdd54e85a0dcebf44dc15b2a0a6f43c:dog1-run-alpha.webm > "$W/dog1-run-alpha.webm"
echo "d2c2762797a393f03eca8ec28213d39f43783c52cddbaab59bed9f60a3347075  $W/dog1-run-alpha.webm" | sha256sum -c --quiet
dec "$W/dog1-run-alpha.webm"                                                   "$D/run/f%03d.png"
dec "$B/race_start_v1/DOG1_RACE_START_v1_alpha.webm"                           "$D/v1f/f%03d.png"
dec "$B/race_start_gen3/DOG1_RACE_START_gen3_alpha.webm"                       "$D/g3f/f%03d.png"
dec "$B/stop_v4/alpha/DOG1_STOP_v4_alpha_k38-k73.webm"                         "$D/v4/f%03d.png"
dec "$B/stop_v4/alpha/DOG1_RACE_STAND_v3_alpha_1276.webm"                      "$D/stand.png"
dec "$B/sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT_alpha_v3_ribbonfix.webm" "$D/sniff/f%03d.png"
dec "$B/butterfly_v1/DOG1_BUTTERFLY_v1_alpha_game_f1-f93.webm"                 "$D/bf/f%03d.png"
dec "$B/roll_v1/alpha/DOG1_ROLL_v1_alpha.webm"                                 "$D/roll/f%03d.png"
python3 "$PKG/tools/build_atlas.py" "$D" "$O"
python3 - "$PKG/atlas" "$O" <<'PY'
import sys,json,numpy as np
from PIL import Image
a,b=sys.argv[1],sys.argv[2];ja,jb=json.load(open(f'{a}/frenk_atlas.json')),json.load(open(f'{b}/frenk_atlas.json'))
bad=[k for k in ja['sheets'] if not np.array_equal(np.asarray(Image.open(f'{a}/frenk_{k}.png').convert('RGBA')),np.asarray(Image.open(f'{b}/frenk_{k}.png').convert('RGBA')))]
if ja!=jb: bad.append('frenk_atlas.json')
print('REBUILD', 'IDENTICAL' if not bad else 'DIFFERENT: '+', '.join(bad)); sys.exit(1 if bad else 0)
PY
