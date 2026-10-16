#!/usr/bin/env bash
# Frames for the RACE_STAND check page: source RUN frames #26..#99 (0-based), downscaled to 828x464 (= 4 x game sprite 207x116), JPEG.
# Opaque source frames (studio background): NO alpha is made here. usage: race_stand_check/build_frames.sh
set -euo pipefail
H=$(cd "$(dirname "$0")" && pwd); T=$(mktemp -d)
ffmpeg -v error -y -i "$H/../assets/sources/bulldog_02_run.mp4" "$T/f%03d.png"
for n in $(seq 26 99); do ffmpeg -v error -y -i "$T/f$(printf %03d $((n+1))).png" -vf scale=828:464:flags=lanczos -q:v 3 "$H/frames/r$(printf %03d $n).jpg"; done
echo "frames: $(ls "$H/frames" | wc -l)"
