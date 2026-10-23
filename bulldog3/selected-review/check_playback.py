#!/usr/bin/env python3
"""Check the full source and review MP4s in real time in local Chromium."""
import functools
import http.server
import json
import os
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
FILES = (
    "bulldog3/assets/incoming/bulldog_3_selected.mp4",
    "bulldog3/selected-review/DOG3_SELECTED_0-120_SOURCE_REVIEW.mp4",
    "bulldog3/selected-review/DOG3_SELECTED_0-120_SELECTION_SCALE.mp4",
    "bulldog3/selected-review/DOG3_FRONT_STAND_TO_SELECTED_REVIEW.mp4",
    "bulldog3/selected-review/DOG3_RETURN_REVERSE_DIAGNOSTIC_NOT_FOR_USE.mp4",
)

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(REPO))
handler.log_message = lambda *args: None
server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
threading.Thread(target=server.serve_forever, daemon=True).start()
result = {}
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            executable_path=os.environ.get("CHROMIUM", "/usr/bin/chromium"),
            headless=True,
            args=["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
        )
        page = browser.new_page()
        for file in FILES:
            url = f"http://127.0.0.1:{server.server_port}/{file}"
            page.set_content(f'<video id="clip" src="{url}" muted playsinline></video>')
            page.wait_for_function("document.querySelector('#clip').readyState >= 3", timeout=30000)
            page.eval_on_selector("#clip", "v => v.play()")
            page.wait_for_function("document.querySelector('#clip').ended", timeout=15000)
            result[file] = page.eval_on_selector("#clip", """v => ({
                duration:v.duration, currentTime:v.currentTime, ended:v.ended,
                width:v.videoWidth, height:v.videoHeight,
                error:v.error?.message || null,
                decodedFrames:v.getVideoPlaybackQuality?.().totalVideoFrames ?? null,
                droppedFrames:v.getVideoPlaybackQuality?.().droppedVideoFrames ?? null,
            })""")
        browser.close()
finally:
    server.shutdown()
(HERE / "browser_check.json").write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps(result, indent=2))
