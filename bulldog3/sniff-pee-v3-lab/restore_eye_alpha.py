#!/usr/bin/env python3
"""Restore enclosed eye holes misclassified as background by BiRefNet.

Uses the original Kling pixels inside the eye; all other alpha frames are linked
unchanged. The accepted animation and source remain untouched.
"""
import argparse
import json
import os
import shutil
from pathlib import Path

import cv2
import numpy as np

FRAMES = (20, 21, 24, 47, 48, 49, 54, 81, 82, 86)
ROI = (700, 150, 1000, 650)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--work', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    report = []
    for i in range(121):
        src = args.work / 'rgba' / f'r{i:04}.png'
        dst = args.out / f'r{i:04}.png'
        if dst.exists():
            dst.unlink()
        if i not in FRAMES:
            try:
                os.link(src, dst)
            except OSError:
                shutil.copyfile(src, dst)
            continue
        rgba = cv2.imread(str(src), cv2.IMREAD_UNCHANGED)
        original = cv2.imread(str(args.work / 'frames' / f'f{i:04}.png'))
        x0, y0, x1, y1 = ROI
        low = (rgba[y0:y1, x0:x1, 3] < 128).astype('uint8')
        count, labels, stats, _ = cv2.connectedComponentsWithStats(low, 8)
        selected = np.zeros(rgba.shape[:2], dtype='uint8')
        chosen = []
        for component in range(1, count):
            x, y, w, h, area = map(int, stats[component])
            left, top = x + x0, y + y0
            # Only the enclosed white sclera, never outer background or gaps.
            if (x > 0 and y > 0 and x + w < x1-x0 and y + h < y1-y0
                    and 100 < area < 1000 and 750 <= left < 950):
                selected[y0:y1, x0:x1][labels == component] = 255
                chosen.append({'bbox': [left, top, w, h], 'area': area})
        if len(chosen) != 1:
            raise RuntimeError(f'Frame {i}: expected one eye hole, got {chosen}')
        left, top, w, h = chosen[0]['bbox']
        ex0, ey0, ex1, ey1 = left - 12, top - 12, left + w + 12, top + h + 12
        bright = (original[ey0:ey1, ex0:ex1].min(axis=2) > 100).astype('uint8')
        nbright, blabels, bstats, _ = cv2.connectedComponentsWithStats(bright, 8)
        candidates = [(int(bstats[j, cv2.CC_STAT_AREA]), j) for j in range(1, nbright)
                      if 250 < int(bstats[j, cv2.CC_STAT_AREA]) < 1200]
        if not candidates:
            raise RuntimeError(f'Frame {i}: original white eye not found')
        _, eye_component = max(candidates)
        selected[ey0:ey1, ex0:ex1][blabels == eye_component] = 255
        selected = cv2.dilate(selected, np.ones((3, 3), 'uint8'), iterations=2) > 0
        rgba[selected, :3] = original[selected]
        rgba[selected, 3] = 255
        if not cv2.imwrite(str(dst), rgba):
            raise RuntimeError(f'Failed to write {dst}')
        report.append({'sourceFrame': i, 'eyeHole': chosen[0], 'restoredPixels': int(selected.sum())})
    (args.out.parent / 'eye_alpha_correction.json').write_text(json.dumps(report, indent=2) + '\n')


if __name__ == '__main__':
    main()
