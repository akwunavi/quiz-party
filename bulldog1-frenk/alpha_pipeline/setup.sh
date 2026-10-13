#!/bin/sh
# Creates an isolated virtualenv (the system Python is not touched) and installs pinned dependencies + the model.
set -e
cd "$(dirname "$0")"
python3 -m venv .venv
. .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
./fetch_model.sh
echo "ready: . .venv/bin/activate && python dog_alpha.py IN.mp4 --work work/NAME --out OUT.webm"
