# dog_alpha — Kling MP4 → VP9 WebM with real alpha (Bulldog №1…№5)

Reconstructed pipeline (the original Dog4 scripts were not available). It reproduces the *method* described in the Dog4/Dog1 reports
(BiRefNet-general-lite, temporal mask agreement, closed-form matting, colour clean-up on the edge only) and was **validated against the approved
`dog1-run-alpha.webm`** (see "Validation"). Nothing here touches the game, `docs/`, V3 or any Dog4 asset. Source videos are only read.

## What it does
| # | Stage | How |
|---|---|---|
| 1 | extract | `ffmpeg` → lossless PNG, source geometry and FPS kept |
| 2 | masks | BiRefNet-general (lite, Swin-tiny) ONNX on CPU at 1024×1024, sigmoid, resized back; cached `.npy` |
| 3 | stabilise | neighbour masks warped by Farneback optical flow and mixed in with a weight from photometric agreement; fast real motion gets weight ≈ 0, so legs are not smeared; tiny islands (watermark, specks) dropped |
| 4 | matte | trimap from the mask (certain-fg erosion `--r-in`, certain-bg dilation `--r-out`) → closed-form matting (PyMatting) on the dog's crop, **2× super-sampled** (removes stair-stepping of the H.264 edge) |
| 5 | colour | `estimate_foreground_ml` on the semi-transparent edge only; pixels with alpha ≥ 0.995 keep the **original RGB bytes** |
| 6 | encode | `libvpx-vp9`, `yuva420p`, `-crf 14 -b:v 0 -auto-alt-ref 0 -row-mt 1 -cpu-used 1 -deadline good`, `alpha_mode=1` tag, source FPS |

A hard colour key is never used. The mask is only a *starting point*; the final alpha comes from the image itself (matting).

## Install (isolated, system Python untouched)
```
cd alpha_pipeline
./setup.sh            # venv + pinned requirements + model download with SHA-256 check
```
Needs: Python ≥ 3.11 (tested 3.13.16), `ffmpeg`/`ffprobe` with `libvpx-vp9` (tested 6.1.1), ~1.5 GB free disk for the venv + model, 8 GB RAM, no GPU required.
Pinned versions: `requirements.txt`. For the Chromium test use an installed Chromium (`CHROMIUM=/path/to/chrome`, default `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).

### Model
`BiRefNet-general-bb_swin_v1_tiny-epoch_232.onnx` (BiRefNet "general lite"), from the rembg project's GitHub release `v0.0.0`
(`https://github.com/danielgatis/rembg/releases/download/v0.0.0/…`), 224 005 088 bytes,
SHA-256 `5600024376f572a557870a5eb0afb1e5961636bef4e1e22132025467d0f03333`. Not committed to git (`.gitignore`); `fetch_model.sh` downloads and verifies it.

## Run
```
. .venv/bin/activate
python dog_alpha.py INPUT.mp4 --work work/NAME --out dogN_clip_alpha.webm
# a segment only (0-based source frame numbers, inclusive):  --start 40 --end 120
# no Kling watermark in the video:                           --exclude-rect none
# resume/redo one stage:                                     --stages masks | stabilise | matte | encode
```
Defaults (all overridable): `--strength 1.0 --tau 12 --r-in 5 --r-out 9 --margin 24 --supersample 2 --min-area 600 --crf 14 --exclude-rect 1090,640,1276,720`
(the default rectangle blanks the "KlingAI" logo of the *watermarked* downloads; use `none` for watermark-free videos).
Every stage is cached in `--work`, so an interrupted run continues where it stopped.

## Verify (do this for every clip — an alpha channel alone proves nothing)
```
python verify_alpha.py dogN_clip_alpha.webm --out work/verify_NAME [--ref approved.webm --ref-offset K]
```
Reports: VP9 + `alpha_mode`, size/FPS/frames; decoder-side alpha (libvpx), transparent corners, coverage, **isolated islands** (floor/shadow/watermark
fragments), neighbour-frame mask IoU; contact sheets on white / black / beige / dark-gray; optional comparison with a reference alpha WebM;
**Chromium playback over magenta** (corners must stay magenta → no black rectangle). Always look at the sheets too.

## Validation against the approved Dog1 RUN alpha (13 source frames)
Frames 90–99 (consecutive) and 42, 72, 120 (isolated: motion blur, studio light stand in the background, big colour change) vs. `dog1-run-alpha.webm`:
mask IoU 0.991–0.994, mean |Δalpha| 0.4–0.7 / 255 over the whole frame, RGB error on common opaque pixels ≈ 0.5–1.4 / 255,
temporal alpha change energy 13.33 vs 13.36 (no extra flicker), no stray islands, transparent corners, plays in Chromium without a background box.

## Known limits
* CPU only: ≈ 11–15 s/frame for the neural mask (first frame ≈ 25 s), 4–7 s/frame for matting. See the report for a measured 5 s clip.
* The cut reproduces what is in the source: blur, ghosted limbs or morphing legs made by the video model are **not** repaired here.
* Source video is H.264: edge stair-steps are reduced by super-sampling but not removed.
* 4:2:0 chroma in VP9 slightly softens colour at the edge (unavoidable for `yuva420p`).
* Soft floor shadows are removed together with the background; add a contact shadow in the game if needed.
