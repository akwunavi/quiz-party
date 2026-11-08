# Snow Cup B+C spectator module

This is one isolated winter spectator section. Nothing here is wired into
Race V3 or the production RaceBoard. The approved dog asset copied into
`assets/rocky-reference.png` is shown only as an optional static scale marker.

## Files

- `source/WINTER_CUP_SPECTATOR_MODULE.blend` — editable Blender source with
  separate GRANDSTAND, CHALET, TREES, LAMPS and TRACK collections.
- `source/create_module.py` — rebuilds the Blender scene and its overview.
- `source/export_assets.py` — renders each collection as an independent
  transparent PNG. The long ice track is baked as one 4096-pixel strip.
- `assets/*_alpha.png` — browser props exported from Blender Cycles.
- `index.html` and `main.js` — 1920×1080 Canvas 2D compositor with independent
  camera factors for scenery and track. No application runtime or packages.
- `review/WINTER_CUP_BC_CAMERA_PREVIEW.mp4` — seven-second H.264 art preview,
  frame-stepped from the browser canvas at 24 FPS. It is not an FPS test.
- `review/BROWSER_SCENE_1920x1080.png` — browser screenshot.
- `review/BROWSER_METRICS.json` — live browser frame cadence with no recorder.
- `review/BC_CONCEPT_VS_MODULE.png` — B/C references next to the actual result.
- `REPORT.md` — evaluation and limitations.

## Run locally

```bash
cd prototypes/winter-cup-blender-module
python -m http.server 8765
```

Open `http://localhost:8765`. The slider adjusts the camera. Playback starts
automatically; the check box shows or hides the one static dog scale marker.
The MP4 and PNG review files need no local server.

## Rebuild art assets

Requires Blender 4.3 and Python with Pillow and NumPy for review helpers.

```bash
blender -b -t 5 --python source/create_module.py
blender -b source/WINTER_CUP_SPECTATOR_MODULE.blend -t 5 --python source/export_assets.py
```

The provided source `.blend` and PNGs are already built; running Blender is
only necessary to change the art. `capture.py` measures the browser and
`render_camera_video.py` generates the review MP4 using the browser scene.
