# Bulldog Race V3 — seeded random race

Isolated Dog №4 five lane prototype, 13 October 2026. No production code, Race Scenario V2, approved clips, or Visual Pass 3 were changed. No merge or deployment.

## Rules implemented

- Every dog receives 1, 2, or 3 events before the race, at weights 70% / 20% / 10%. Events are BUTTERFLY / ROLL / SNIFF_PEE at initial weights 40% / 35% / 25%. A dog cannot receive SNIFF_PEE twice; subsequent draws after SNIFF_PEE use the normalized 40:35 weights.
- Initial speed and the speed after every event are drawn independently from VERY_FAST / FAST / NORMAL / SLOW / VERY_SLOW at 5% / 20% / 50% / 20% / 5%, with multipliers 1.25 / 1.12 / 1.00 / 0.88 / 0.75. The existing four course bands retain their 0.98–1.02 variation. New speed begins in START with a smooth acceleration from zero.
- Target event positions are seeded over the full 0–96% course, at least 25% apart for one dog. STOP starts before the action coordinate. Events too close to the start for a complete START → RUN → STOP are explicitly handled from BASE (recorded as `early`, with actual coordinate 0). The planner never silently moves a later action by more than 2% of the course in the tested races.
- The planner rejects any position set with simultaneously stationary dogs closer than 8% of the course. The 1,170 px rendered course makes this approximately 94 px, just over the roughly 87 px visible standing silhouette. It also rejects a candidate if all five dogs are in stationary actions at once. Event counts, kinds and speed categories are held fixed while positions are retried, up to 4,096 times. An impossible seed is reported and skipped; it is not changed into an easier scenario.
- Finish crossing is solved inside any positive-motion segment, including START. FINISH_DECELERATE follows the measured crossing. Results and ranking are independent of render FPS.

## Diagnostics: 10,000 accepted races

Seed sequence starts at `20261013`. The test skipped 32 unsuitable seeds and ended at `20271044`. Full machine-readable data: `random_results.json`.

| Measure | Result |
|---|---:|
| Dogs with 1 / 2 / 3 events | 35,080 / 9,974 / 4,946 (70.16% / 19.95% / 9.89%) |
| Initial speeds VF / F / N / S / VS | 2,469 / 10,087 / 25,010 / 9,925 / 2,509 |
| Speeds after events VF / F / N / S / VS | 3,494 / 13,951 / 34,986 / 13,921 / 3,514 |
| Event types BUTTERFLY / ROLL / SNIFF_PEE | 28,875 / 25,088 / 15,903 (41.33% / 35.91% / 22.76%) |
| Mean winner time | 47.50 s |
| Median and P95 full race duration | 65.98 s / 74.07 s |
| Mean gap between first and second | 3.11 s |
| Finish gaps under 1 s | 23.41% |
| Winners with 1 / 2 / 3 events | 9,849 / 150 / 1 |
| Winners by final speed VF / F / N / S / VS | 1,062 / 3,307 / 4,588 / 915 / 128 |
| Early events from BASE | 5,284 of 69,866 events |
| Events targeted at 95% or later | 1,318 of 69,866 events |
| Races with overlapping actions in different places | 9,813 / 10,000 |
| Races with action starts within 1 s in different places | 3,219 / 10,000 |
| Rejected position candidates | 394,780; 7,633 also had all five in actions |
| Entire seeds rejected after 4,096 position attempts | 32 of 10,032 considered |

The no-repeat SNIFF_PEE rule changes the final event mix: SNIFF_PEE was 22.76%, below its initial 25% draw weight. No compensation was applied. Dogs with 2–3 events won only 1.51% of races. That is a visible balance consequence of long actions and independent speed draws; no catch-up rule was introduced.

### Finish regression and state tests

The 99% ROLL regression crosses at **41.910386 s**, during START at **41.041667–42.041667 s**. The old end-of-START timing would be **0.131281 s late** in this setup. The regression also checks an early event at 0.1% and a late event at 95%. All 50,000 dogs had continuous, nondecreasing position, exact analytic crossing, and final BASE state. 24, 30, 60 and 120 FPS sampling did not change model finish times. Existing A/B/C preset validation passed. Headless Chromium played A/B/C and the seeded race to completion, reset them, and regenerated the same seeded results without page errors.

### Control race

`DOG4_V3_RANDOM_SEED_20261013.mp4` is the **first admissible seed** in the predetermined sequence, not a handpicked winner. The full recording has 1,549 frames at 24 FPS (64.541667 s), 1920×1080 H.264/yuv420p, with a complete FFmpeg decode and a final BASE state for all five dogs. The race ends in the model at 64.522917 s; the final encoded frame samples that endpoint.

## Remaining limitations

- The approved RUN loop retains a fixed 24 FPS cadence while translation ranges from 0.75× to 1.25×. Fast and slow dogs can show some foot sliding. The approved frames and STOP transition were deliberately left unchanged.
- Repeated BUTTERFLY or ROLL actions are allowed. Their full-race combinations should be judged visually before integration; this task did not create new transition clips.
- Early actions too close to the start take place at BASE position 0. The diagnostic records their requested and actual positions explicitly.
- Because events last several seconds, planning can take many position attempts and 0.32% of tested seeds had no acceptable layout in 4,096 attempts. The UI displays this instead of substituting a different race.
- A frozen frame review and complete browser playback confirmed technical behavior; seamlessness of each original approved animation was not reapproved in this task.

## Files and reproduction

Changed in the isolated lab: `model.mjs`, `app.mjs`, `index.html`, `record.mjs`, `browser_check.mjs`. Added: `scenario.mjs`, `random_validate.mjs`, `random_results.json`, `RANDOM_README.md`, this report, and the control MP4. The ZIP contains the interactive lab, current sprite sheets and diagnostics. See `RANDOM_README.md` for local commands.
