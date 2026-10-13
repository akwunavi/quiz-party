# Bulldog Race V3 — bounded seed resolution and RUN cadence check

Isolated five lane Dog №4 lab. The agreed event, speed, scoring and winner rules remain unchanged. Approved video and arena assets were not modified. No production, Race Scenario V2, merge, or deployment changes.

## Seed resolution

`resolveRace(requestedSeed)` tries the requested uint32 seed first. If its position planner exhausts 4,096 attempts, it tries the next integer seed, stopping at the first admissible whole scenario. A search is limited to 64 candidates and the uint32 range. The returned race includes `requestedSeed`, `effectiveSeed`, `candidatesChecked`, and `rejectedCandidates` with code, reason and rejection counts. If none fit, `RaceScheduleError` has code `NO_ADMISSIBLE_SCENARIO` and structured `details`; no partial race is returned.

| Test | Result |
|---|---|
| Valid `20261013` | Remains `20261013`; identical crossings, event plan and finish order to the prior V3. |
| Rejected `20261423` | Uses first next admissible seed `20261424`; two candidates checked. Original failed 4,096 position attempts (4,096 vertical conflicts; 168 also had all five in actions). |
| Search limit one on `20261423` | Structured `NO_ADMISSIBLE_SCENARIO` error, one rejected candidate recorded. |
| Same requested seed after reset | Same effective seed, crossings and finish order. |
| 10,000 consecutive requested seeds | 32 fallbacks (0.32%); all resolved within two candidates. |

The resolved 10,000-race sample differs from the earlier 10,000 accepted-race sample by at most **0.030 percentage points** in event counts, event types, and initial or post-event speed shares. Details are in `fallback_results.json`. The resolved sample has 9,968 distinct effective seeds because a rejected seed and the following requested seed can resolve to the same race. This small duplicate bias is explicit; no distribution weights were changed.

Automated checks cover event count and spacing, no repeated SNIFF_PEE, no simultaneous stationary overlap within 8% of the track, no fully stationary five-dog action interval, continuous coordinates, speed category application after each event, a single STOP per ordinary event, analytic finish timing across 24/30/60/120 FPS sampling, and late crossing inside START at 99%. The late test crosses at **41.910386 s** during START. The 8% separation is about **94 px** on the 1,170 px course; the standing silhouette is roughly **87 px** wide at game scale. This threshold appears defensible for visible separation. Dense schedules still occasionally fail, hence the bounded seed search; the threshold was not changed.

## RUN comparison

`DOG4_V3_RUN_SPEED_COMPARISON.mp4` is a **14 s** H.264/yuv420p, 1920×1080, 24 FPS clip on the existing arena. Three Dog №4 copies run at physical multipliers 0.75, 1.00 and 1.25, then play the same STOP once and hold BASE_STAND. A and B are shown sequentially with labels; physical positions and STOP timings are identical between them.

| Method | RUN frame just before STOP: slow / normal / fast | 24 FPS cadence effect |
|---|---|---|
| A: approved fixed 1.00× loop | 22 / 22 / 22 | All three reach the approved STOP entry phase. |
| B: experimental 0.90 / 1.00 / 1.10× loop | 14 / 22 / 17 | Slow loop repeats 8 frames; fast loop skips 7 frames over the sampled RUN section. The slow and fast STOP cuts change leg pose visibly. |

At the same game scale, physical travel per 0.5 s at slow/normal/fast is about **10.45 / 13.93 / 17.41 px**. If normal is the reference stride, fixed cadence has an approximate ±3.48 px travel mismatch per cycle at the extremes. Capped cadence reduces that relative difference only modestly, while losing the approved frame #22 entry into STOP. Exact foot contact calibration would require further frame analysis and phase-aware scheduling.

**Recommendation: keep method A.** In this short game-scale check, its speed mismatch is a smaller visual issue than B's visible pose discontinuity at STOP. A production-quality adaptive cadence would need phase locking before STOP and a treatment for repeated/skipped integer frames, followed by fresh transition approval. It was not added to `model.mjs`.

## Files and local use

Changed: `scenario.mjs`, `app.mjs`, `record.mjs`, `browser_check.mjs`, `RANDOM_README.md`. Added: `fallback_validate.mjs`, `fallback_results.json`, `run_compare.html`, `run_compare.mjs`, the comparison MP4, and this report. The core movement model, approved sprite sheets, alpha-WebM source assets and arena remain untouched.

Open the MP4 directly. For the interactive lab, extract `DOG4_V3_SEED_RUN_LAB.zip`, run `python -m http.server 8765` in its directory, and open `http://127.0.0.1:8765/` or `/run_compare.html` in Chrome. Node and Playwright are needed only to rerun automated tests or render video, not to view the lab.

## Remaining risks

- A requested seed near the end of uint32 may have fewer than 64 successor candidates; exhaustion is surfaced as a structured error. Production does not yet handle this error.
- Method A may show a small amount of foot sliding at 0.75× and 1.25×. Method B's direct cadence scaling is unsuitable because of its STOP phase mismatch.
- The comparison tests RUN → STOP → BASE only. It does not reapprove transitions from other events or replace full-race visual review.
