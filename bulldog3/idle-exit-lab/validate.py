#!/usr/bin/env python3
"""Validate all 240 exit paths, source-frame continuity and delivered MP4s."""
import json
import subprocess
from pathlib import Path

from build import WINDOWS, decide

HERE = Path(__file__).resolve().parent
DATA = json.loads((HERE / "DELAY_MAP.json").read_text())
ROWS = DATA["delayByPhase"]


def main():
    assert len(ROWS) == 240
    for phase, row in enumerate(ROWS):
        method, target, path = decide(phase)
        assert row["phase"] == phase
        assert row["method"] == method and row["entryPhase"] == target
        assert row["waitFrames"] == len(path)
        assert any(lo <= target <= hi for lo, hi in WINDOWS)
        if path:
            assert abs(path[0] - phase) == 1
            assert path[-1] == target
            travel = [phase] + path
            steps = [b-a for a, b in zip(travel, travel[1:])]
            assert all(abs(step) == 1 for step in steps)
            pivots = [travel[i] for i in range(1, len(steps))
                      if steps[i] != steps[i-1]]
            assert pivots in ([], [74], [113]), (phase, pivots)
    for phase_text, scene in DATA["scenarios"].items():
        phase = int(phase_text)
        assert scene["preIdlePhases"][-1] == phase
        assert len(scene["pendingIdlePhases"]) == scene["waitFrames"]
        assert scene["selectedOutputFrames"][1] - scene["selectedOutputFrames"][0] + 1 == 121
        assert scene["returnOutputFrames"][1] - scene["returnOutputFrames"][0] + 1 == 97
        assert scene["finalIdleOutputFrames"][1] - scene["finalIdleOutputFrames"][0] + 1 == 240
        output = HERE / scene["output"]
        probe = json.loads(subprocess.check_output(("ffprobe", "-v", "error",
            "-show_entries", "stream=codec_name,pix_fmt,r_frame_rate,nb_frames,width,height",
            "-of", "json", str(output))))["streams"][0]
        assert (probe["codec_name"], probe["pix_fmt"], probe["r_frame_rate"]) == (
            "h264", "yuv420p", "24/1")
        assert (probe["width"], probe["height"]) == (1920, 1080)
        assert int(probe["nb_frames"]) == scene["totalFrames"]
    browser = json.loads((HERE / "BROWSER_CHECK.json").read_text())
    assert browser["htmlControlsWorked"]
    assert len(browser["playedVideoResults"]) == len(DATA["scenarios"])
    assert all(item["ended"] and not item["error"] for item in browser["playedVideoResults"])
    print("240 exit paths and 14 MP4s verified")


if __name__ == "__main__":
    main()
