#!/usr/bin/env python3
"""Real-time Chromium playback of all delivered RETURN review MP4s."""
import functools
import http.server
import json
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
FILES = tuple(f"DOG3_RETURN_{n}_CLOSE.mp4" for n in "ABC") + tuple(
    f"DOG3_SELECTED_RETURN_{n}_IDLE_GAME.mp4" for n in "ABC")


def main():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(HERE))
    handler.log_message = lambda *args, **kwargs: None
    server = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    results = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path="/usr/bin/chromium", headless=True,
                                         args=["--no-sandbox", "--autoplay-policy=no-user-gesture-required"])
            page = browser.new_page(viewport={"width": 1280, "height": 740})
            for name in FILES:
                url = f"http://127.0.0.1:{server.server_address[1]}/{name}"
                page.set_content(f'<body style="margin:0;background:#ddc9a7"><video id="v" src="{url}" muted playsinline autoplay style="width:1276px;height:720px"></video></body>')
                page.wait_for_function("document.getElementById('v').readyState >= 3", timeout=20000)
                page.wait_for_function("document.getElementById('v').ended", timeout=30000)
                data = page.evaluate("""() => { const v=document.getElementById('v'); return {
                    duration:v.duration, videoWidth:v.videoWidth, videoHeight:v.videoHeight,
                    ended:v.ended, currentTime:v.currentTime,
                    error:v.error ? v.error.message : null
                }}""")
                results.append({"file": name, **data})
            browser.close()
    finally:
        server.shutdown()
    (HERE / "browser_check.json").write_text(json.dumps(results, indent=2) + "\n")
    assert all(x["ended"] and x["error"] is None for x in results)
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
