"""Diagnostic montage from the approved Rocky Kling source; no alpha or interpolation."""

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "assets/DOG3_SNIFF_PEE_CLIP1_STAND_TO_POSE_ORIGINAL.mp4"
STAND = ROOT / "assets/DOG3_CLIP1_FIRST_RACE_STAND_1276.png"
ARENA = ROOT.parents[1] / "dog4-v3-lab/assets/arena.png"
FULL = ROOT / "DOG3_SNIFF_PEE_MONTAGE_REVIEW.mp4"
GAME = ROOT / "DOG3_SNIFF_PEE_GAME_SCALE_REVIEW.mp4"
COMPARE = ROOT / "DOG3_SNIFF_END_JOIN_COMPARISON.mp4"
ROUGH = ROOT / "assets/DOG3_CLIP1_REVERSE_LOWERING_ROUGH_PREVIEW_NOT_FINAL.mp4"


def run(*args):
    subprocess.run(args, check=True)


# Source 0..120; reverse 119..72; direct cut to original 7..0 backwards;
# then 63 exact copies of the approved RACE_STAND. The cut at 72 -> 7 is
# deliberately exposed for visual review. No crossfade/morph/optical flow.
run(
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SOURCE),
    "-loop", "1", "-framerate", "24", "-i", str(STAND),
    "-filter_complex",
    "[0:v]split=3[f0][r0][t0];"
    "[f0]trim=start_frame=0:end_frame=121,setpts=PTS-STARTPTS[f];"
    "[r0]trim=start_frame=72:end_frame=120,reverse,setpts=PTS-STARTPTS[r];"
    "[t0]trim=start_frame=0:end_frame=8,reverse,setpts=PTS-STARTPTS[t];"
    "[1:v]trim=end_frame=63,setpts=PTS-STARTPTS[s];"
    "[f][r][t][s]concat=n=4:v=1:a=0,fps=24,format=yuv420p[v]",
    "-map", "[v]", "-frames:v", "240", "-an", "-c:v", "libx264",
    "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", str(FULL),
)

# Match the 207 x 116 V3 sprite cell. The original Kling background is still
# visible in this diagnostic because alpha is intentionally out of scope.
run(
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(FULL),
    "-loop", "1", "-framerate", "24", "-i", str(ARENA),
    "-filter_complex",
    "[0:v]scale=207:116:flags=lanczos,setsar=1[dog];"
    "[1:v][dog]overlay=900:510:shortest=1,format=yuv420p[v]",
    "-map", "[v]", "-frames:v", "240", "-an", "-c:v", "libx264",
    "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", str(GAME),
)

# Compare the last 1.5 s of the rough preview with the same absolute period
# in the new montage. Left: Claude rough, right: direct source-frame join.
run(
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
    "-ss", "6.5", "-i", str(ROUGH), "-ss", "6.5", "-i", str(FULL),
    "-filter_complex",
    "[0:v]trim=end_frame=36,setpts=N/(24*TB),scale=640:360[l];"
    "[1:v]trim=end_frame=36,setpts=N/(24*TB),scale=640:360[r];"
    "[l][r]hstack=inputs=2,fps=24,format=yuv420p[v]",
    "-map", "[v]", "-frames:v", "36", "-an", "-c:v", "libx264",
    "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", str(COMPARE),
)
