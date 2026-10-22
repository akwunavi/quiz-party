# Rocky ROLL v2 — isolated Race V3 lab

The user approved the source ROLL v2 motion. This lab uses the original Kling MP4 unchanged, the previously approved Rocky RUN, STOP, RACE_STAND and RACE_START, and the unmodified Race V3 `buildDog`/`stateAt` model. Gameplay visual acceptance of this integration is pending.

Open the H.264 MP4 files directly for review. To use the interactive lab locally from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000/bulldog3/roll-v3-lab/`. The page provides full chain, action and five speed modes. The lab needs a local server because it loads local modules and assets.

The source and generated output files are listed in [REPORT.md](REPORT.md). `build_assets.py`, `verify_lab.mjs`, `seam_check.py`, `record.mjs` and `check_browser.mjs` reproduce the atlas, timeline checks, MP4 previews and browser playback checks from the saved alpha frames. The original and previously approved assets must not be overwritten.
