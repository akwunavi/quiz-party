# Dog 4 BUTTERFLY — asset check

Source: `kling_20261013_VIDEO_Create_a_s_589_0.mp4`; 1276×720, 24 fps, 121 frames (5.042 s). Source and previously approved RUN, STOP, and START were not changed.

## Processing

Reused the existing BiRefNet General Lite ONNX inference, optical-flow interpolation between key masks, temporal mask consistency, closed-form alpha matting, and foreground edge-color estimation. Inferred frames 0–120 every 8 frames plus 56, 59, and 60 near the ear; interpolated intervening masks. Applied a local cleanup to mask frame 61 for a two-pixel-level butterfly-edge residue in the empty area above/right of the ear. The source black background, embedded butterfly, and Kling watermark are absent from the output. All 121 frames were retained without changing motion or speed.

The butterfly is visible approximately frames 29–77. Its closest approach to the right ear is around frames 59–62. Full-resolution review of frames 59–62 found no butterfly occlusion of the dog. All masks were checked for disconnected foreground, and representative processed frames were checked on white, black, bright green, and beige backgrounds.

## Sequence in gameplay preview

| Output frames | Segment | Duration |
|---:|---|---:|
| 0–23 | RUN loop #11–22, twice | 1.000 s |
| 24–60 | Approved STOP #0–36 | 1.542 s |
| 61–181 | BUTTERFLY #0–120 | 5.042 s |
| 182–200 | Approved START #21–39 | 0.792 s |
| 201–259 | RUN #0–10 then loop #11–22 four times | 2.458 s |

Total: 260 frames, 10.833 s, H.264/yuv420p MP4, 1920×1080, 24 fps. The arena image and source sprite positions were not modified. The preview does not contain an independent butterfly object.

## Joins and remaining limits

STOP #36 → BUTTERFLY #0: silhouette IoU 0.963; body center differs by ~1.5 pixels in source coordinates. BUTTERFLY #120 → START #21: silhouette IoU 0.962; body center differs by ~1.4 pixels. Direct frame comparison shows no visible jump in size, feet or ground line at gameplay scale. There is a slight change in lighting/texture at both video boundaries; still-frame matching does not prove a perfectly seamless transition in every playback setting. No crossfade, morphing, or pose interpolation was applied.

WebM: VP9, 1276×720, 24 fps, 5.042 s, `alpha_mode=1`. Chrome/Chromium was tested by playing the whole clip to its end over bright green: alpha was visually present, with no black rectangle or embedded butterfly. The MP4 was also played to the end in Chromium. No obvious temporal contour flicker was observed in sampled frames and full playback.
