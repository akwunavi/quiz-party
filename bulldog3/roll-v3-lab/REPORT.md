# Rocky #3 — ROLL v2, isolated Race V3 integration

The user artistically approved the Kling ROLL v2 source. This package prepares the alpha and a separate gameplay lab for review. The original MP4, approved RUN/STOP/RACE_STAND/RACE_START, Race V3 physics, scoring and production components are unchanged. ROLL v1 is rejected and not used.

## Source and cut

- Source: [`../roll-generation-v2/DOG3_ROLL_V2_KLING_V3_ORIGINAL.mp4`](../roll-generation-v2/DOG3_ROLL_V2_KLING_V3_ORIGINAL.mp4), SHA-256 `7902405bfaae9b36fae0fd7b18307fe9b8a77122a073c62607668bebe28c8846`, H.264 1276×720, 24 FPS, source #0–120.
- Visual atlas: source #8–120 inclusive, then 32 frames of the approved RACE_STAND; 113 + 32 = 145 frames / 6.0417 s. Only the static lead-in is removed. Source #108–120, including the complete return to four feet and final head settling, is preserved. No speed change, interpolation, proportion change or sprite offset is applied.
- Atlas cell: 178×100; game draw size 207×116. The ROLL world anchor stays fixed during the physical event.
- Existing STOP: 37 frames; subsequent START: 24 physical frames. Accepted Rocky RUN phase logic presents source #68 immediately before STOP.

## Assets for review

- [Complete gameplay chain MP4](DOG3_ROCKY_ROLL_V2_FULL_CHAIN_GAMEPLAY.mp4): RUN → STOP → ROLL → RACE_STAND → RACE_START → RUN.
- [ROLL action MP4 in gameplay scale](DOG3_ROCKY_ROLL_V2_ACTION_GAMEPLAY.mp4).
- [Full chain close-up MP4](DOG3_ROCKY_ROLL_V2_CLOSEUP.mp4).
- [Four background alpha check MP4](DOG3_ROCKY_ROLL_V2_ALPHA_FOUR_BACKGROUNDS.mp4): white, black, bright green and beige.
- [Alpha VP9 WebM](assets/DOG3_ROLL_V2_ALPHA_145.webm), [sprite atlas](assets/rocky-roll.png), [interactive local lab](index.html).
- [Four background frame sheet](ALPHA_QA_WHITE_BLACK_GREEN_BEIGE.png), [detail sheet](ALPHA_DETAIL_FOUR_BACKGROUNDS.png), [frame map](retiming.json), [alpha verification](alpha_verify_report.json), [seam measurements](seam_metrics.json), [five-speed/model verification](verification.json), [Chromium playback verification](final_browser_check.json).

## Method and visual findings

BiRefNet-general-lite masks, Farneback temporal stabilization and closed-form alpha matting are run with the previously verified Rocky settings: strength 1, tau 12, inner/outer trimap radii 5/9, margin 24, 2× supersampling and minimum island area 1500. `exclude-rect=none` avoids removing any part of the rolling body. No floor-band or shadow-strip crop is used. Work masks and full-resolution RGBA intermediates are retained outside the repository at `/workspace/artifacts/bulldog-racing/dog3-rocky-roll-v2/work/` for later adjustments.

## Alpha verification

The final WebM is VP9 with `ALPHA_MODE=1`, 1276×720, 24 FPS, 145 frames. Full decode with `libvpx-vp9` produced alpha values 0–255; all four corners stay at alpha 0 in every frame. No isolated alpha components over 20 px were found. Chromium rendered the transparent video over magenta with no rectangle or decode error. It also played the lab and all four review MP4s to `ended`; the MP4s are H.264, `yuv420p`, `faststart` and silent.

I inspected the lowering, supine motion, paws around source #33–36 and #79–88, the motion-blurred roll at #90, the rise at #96–108, and the final #120 → RACE_STAND join on white, black, bright green and beige. Ears, muzzle, tongue, torso and visible paws remain in the mask. The spaces between limbs are transparent. No separate floor patch, original contact shadow or rectangular background appears in the inspected composited frames. The four-background MP4 shows all 145 frames for continuous edge review. The source's soft blur around #90 remains; it is not an alpha repair target and the approved motion is untouched.

## Timeline and transition checks

The actual V3 ROLL preset has STOP `[11.9583, 13.5000)` s, ROLL `[13.5000, 19.5417)` s and START `[19.5417, 20.5417)` s. The complete gameplay MP4 includes 3.000 s RUN before STOP and 3.000 s RUN after START: 350 frames / 14.5833 s. Action MP4 and four-background MP4 have 145 frames / 6.0417 s. The close-up covers the same 350-frame chain at a larger crop.

The lab uses the accepted RUN phase mapping: source #68 precedes STOP in the actual preset and in the five diagnostic speeds 0.75×, 0.90×, 1.00×, 1.10×, 1.25×. `verification.json` confirms a fixed world progress and zero speed throughout ROLL; there is no time or position discontinuity at the segment boundaries. The model's crossing/finish calculations are read without modification. All five speed categories were exercised in the browser lab. Gameplay size, lane and ground line are constant across the clips.

Silhouette checks (atlas resolution): STOP #36 → ROLL #0 IoU 0.9403, centre delta (0.04, 0.97) px; ROLL #112 (source #120) → ROLL #113 (approved RACE_STAND) IoU 0.9978, centre delta (0.01, 0.02) px; ROLL #144 → START #0 IoU 0.9620. The final ROLL → stand join also matches closely in the inspected large colour comparison. The lower RUN → STOP and START → RUN IoUs are inherited approved transitions; their assets and visual phase are unchanged.

## Remaining visual limits

The Kling source has a brief motion blur at source #90 during the turn, retained as approved. The physical 145-frame window leaves 32 still RACE_STAND frames (1.333 s) after the complete roll; this is the prescribed hold and may feel long depending on the full race context. At close range STOP → ROLL has a small expression/contour change, while feet, body scale and ground line stay aligned; gameplay review should decide whether it is noticeable. No source animation or approved neighbouring asset was retimed or altered to hide it. The user retains final gameplay visual approval.
