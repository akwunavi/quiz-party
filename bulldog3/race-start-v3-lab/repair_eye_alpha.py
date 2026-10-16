#!/usr/bin/env python3
"""Restore source eye RGB in small enclosed holes made by the alpha model.

Only holes fully inside the face ROI are eligible. Dog motion and opaque pixels
outside these holes remain byte-identical to the pipeline RGBA frames.
"""
import argparse
import json
from pathlib import Path
import cv2
import numpy as np


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--rgba', type=Path, required=True)
    p.add_argument('--source-frames', type=Path, required=True, help='pipeline frames/f0018.png etc.')
    p.add_argument('--out', type=Path, required=True)
    a = p.parse_args()
    a.out.mkdir(parents=True, exist_ok=True)
    report = []
    for frame in range(16, 54):
        rgba = cv2.imread(str(a.rgba / f'r{frame:04d}.png'), cv2.IMREAD_UNCHANGED)
        source = cv2.imread(str(a.source_frames / f'f{frame:04d}.png'), cv2.IMREAD_COLOR)
        if rgba is None or source is None:
            raise FileNotFoundError(frame)
        inv = (rgba[:, :, 3] < 128).astype(np.uint8)
        count, labels, stats, _ = cv2.connectedComponentsWithStats(inv, connectivity=8)
        fixed = []
        for i in range(1, count):
            x, y, w, h, area = [int(v) for v in stats[i]]
            if 250 <= area <= 1200 and 740 <= x <= 900 and 200 <= y <= 400 and w <= 55 and h <= 55:
                hole = labels == i
                # One-pixel rim covers anti-aliased false transparency at the eye edge.
                region = cv2.dilate(hole.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
                rgba[region, :3] = source[region]
                rgba[region, 3] = 255
                fixed.append({'bbox': [x, y, w, h], 'holePixels': area})
        cv2.imwrite(str(a.out / f'r{frame:04d}.png'), rgba)
        if fixed:
            report.append({'frame': frame, 'repairs': fixed})
    (a.out / 'eye_repairs.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report))


if __name__ == '__main__':
    main()
