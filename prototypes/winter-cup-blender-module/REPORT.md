# Snow Cup B+C — one spectator module

## Outcome

I built and rendered one actual Blender scene, exported independent RGBA
props, and composed them in a moving browser camera. The technical asset path
works. **The art does not yet match the approved B+C concept quality.** This
module is for review, not an approved arena or a complete route.

## Measured environment

| Check | Result |
| --- | --- |
| Blender | 4.3.2 installed; background Python and Cycles CPU renders completed |
| Unreal Engine | No Unreal editor binary found |
| GPU | No NVIDIA tooling or `/dev/dri` device exposed |
| CPU / memory | 5 AMD EPYC 9V74 vCPUs; 33 GiB RAM |
| Disk | About 22 GiB free at start |
| Browser | Chromium with Canvas 2D; screenshot at 1920×1080 |
| Export | Blender source `.blend`; transparent PNG props; H.264 MP4 review |

Cycles ran on CPU. The Blender scene uses authored meshes and procedural
materials for the tiered timber stand, railings, roof snow, bunting, 54
spectators, chalet, snow-covered firs, lanterns and five ice lanes. The source
is editable and its components are separate collections. This is not an image
prompt or a flattened concept sheet.

## Browser implementation

Five-lane track texture is a 4096×900 Cycles render, displayed as one long
strip to avoid seams as the camera travels. The stand, chalet, trees and
lamps are separate transparent renders with independent world positions and
parallax factors. Canvas draws a dusk sky and light snowfall. One unchanged
approved Rocky alpha still can be toggled for scale; no dog animation or
race state is connected. The screenshot shows the dog fitting into one lane.

This 2D compositor is the practical browser export for this module: it keeps
individual props and camera motion while avoiding the software WebGL cost
found in the earlier Three.js lab. Future dogs remain a separate layer over
the road. It is not a test of a five-dog race.

## Performance and recording

The unrecorded Chromium run at 1920×1080 measured **54.1 FPS average** over
the rolling 240 browser frame intervals, p95 frame interval **33.3 ms**, with
**3 intervals longer than 50 ms**. The run was on this cloud CPU; projector
hardware is not tested. The browser's live MediaRecorder capture was much
slower and saved only 64 frames over 6.8 seconds. The delivered H.264 MP4
therefore uses 24 FPS deterministic frame stepping of the **same browser
scene**. That MP4 demonstrates camera motion and composition, not live FPS.

## B+C comparison

- **B retained:** tiered sports stand, five clearly separated lanes, safety
  rail, spectators, winter chalet and race signage.
- **C retained:** indigo dusk, warm lanterns, decorated trees and snow.
- **Gap:** B/C references have more varied buildings, dense believable crowd,
  irregular snow/ice and stronger lighting integration. Here the spectator
  figures and trees still read as low-poly geometry, and the road surface is
  visually repetitive. The static Rocky marker also lacks matching scene
  light, so it still appears composited. See `review/BC_CONCEPT_VS_MODULE.png`.

This distinction matters: working Blender/Canvas automation is proven, while
the requested final artistic bar and natural dog integration are **not**.

## Next artistic work, if this direction is pursued

The strongest automated improvement would be to replace the simple authored
crowd and fir geometry with detailed reusable, properly licensed source
models, give them consistent texture/light treatment in the existing `.blend`,
and rerender only the independent layers. Then inspect an animated dog under
matching contact light at the actual projector size. This needs no Unreal,
cloud GPU, manual Blender work by the user, or Race V3 changes. Licensing and
download sources must be verified before incorporating third-party models.

## Scope

No Race V3 physics, dog library, production component, merge, deployment or
paid generation service was changed or used.
