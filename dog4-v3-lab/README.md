# Isolated Dog №4 V3 lab

Run `python -m http.server 8765` in this directory, then open `http://127.0.0.1:8765/` for the five lane race or `http://127.0.0.1:8765/run_compare.html` for the RUN cadence comparison. Enter a requested uint32 seed in the race page; it shows the effective seed if bounded fallback was needed.

The approved arena and sprite sheets are included. The diagnostic comparison does not change the race model. For the full report and downloadable videos, see the repository root files `DOG4_V3_SEED_AND_RUN_REPORT.md`, `DOG4_V3_RUN_SPEED_COMPARISON.mp4`, and `DOG4_V3_SEED_RUN_LAB.zip`.

Run `node fallback_validate.mjs 10000` for the bounded seed diagnostic. The browser/record scripts additionally require Playwright Core, Chromium and FFmpeg in the local environment.
