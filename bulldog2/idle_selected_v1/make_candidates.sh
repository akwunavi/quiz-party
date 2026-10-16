#!/usr/bin/env bash
# Rebuild the Bulldog No.2 IDLE v1 / SELECTED v1 montage candidates from the unchanged sources (no generation, no alpha).
# usage: idle_selected_v1/make_candidates.sh [WORKDIR]
set -euo pipefail
H=$(cd "$(dirname "$0")" && pwd); B=$(cd "$H/.." && pwd); W=${1:-$(mktemp -d)}
mkdir -p "$W/idle" "$W/sel" "$W/seq_idle" "$W/seq_sel"
ffmpeg -v error -y -i "$B/assets/sources/bulldog_2_idle.mp4" "$W/idle/f%03d.png"
ffmpeg -v error -y -i "$B/assets/sources/bulldog_2_selected.mp4" "$W/sel/f%03d.png"
python3 - "$H/labels.json" "$W" <<'PY'
import json,os,sys
L=json.load(open(sys.argv[1]));W=sys.argv[2]
for key,src,out in (('IDLE_loop','idle','seq_idle'),('SELECTED','sel','seq_sel')):
    for i,n in enumerate(L[key]['sourceFrames']): os.symlink(f'{W}/{src}/f{n:03d}.png',f'{W}/{out}/f{i:04d}.png')
PY
enc(){ ffmpeg -v error -y -framerate 24 -i "$1/f%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 14 -preset slow "$2"; }
enc "$W/seq_idle" "$W/DOG2_IDLE_v1_loop_candidate.mp4"; enc "$W/seq_sel" "$W/DOG2_SELECTED_v1_candidate.mp4"
echo "written to $W"
