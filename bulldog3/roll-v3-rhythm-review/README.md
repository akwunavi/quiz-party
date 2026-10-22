# ROLL v2 A/B rhythm review

Use the MP4s listed in [REPORT.md](REPORT.md) for direct viewing. A is the unchanged control in [`../roll-v3-lab/`](../roll-v3-lab/); B is an isolated candidate with the same 145-frame Race V3 window.

For the optional browser lab, run this from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/bulldog3/roll-v3-rhythm-review/` for the full B chain, action and five speeds. Open `http://127.0.0.1:8000/bulldog3/roll-v3-rhythm-review/compare.html` for the synchronized A/B action view. The MP4s require no server.

`build_variant_b.py` assembles B from the preserved source alpha and approved stand. Supply `--rgba /path/to/original/rgba` to use the original lossless pipeline intermediates if available. `verify_rhythm.mjs`, `seam_check.py`, `record.mjs`, `record_compare.mjs` and `check_browser.mjs` reproduce the timeline, transition measurements and previews without changing Race V3.
