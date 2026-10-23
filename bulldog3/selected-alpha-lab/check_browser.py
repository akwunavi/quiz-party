#!/usr/bin/env python3
"""Play the delivered SELECTED review files in Chromium to completion."""
import functools
import http.server
import json
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
FILES = (
    "assets/DOG3_SELECTED_ALPHA_121.webm",
    "DOG3_SELECTED_ALPHA_FOUR_BACKGROUNDS.mp4",
    "DOG3_SELECTED_ALPHA_SELECTION_SCALE.mp4",
    "DOG3_FRONT_STAND_TO_SELECTED_ALPHA.mp4",
)


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
            page = browser.new_page(viewport={"width": 1300, "height": 740})
            for name in FILES:
                url = f"http://127.0.0.1:{server.server_address[1]}/{name}"
                page.set_content(f'<body style="margin:0;background:#00df36"><video id="v" src="{url}" muted playsinline autoplay style="width:1276px;height:720px"></video></body>')
                page.wait_for_function("document.getElementById('v').readyState >= 3", timeout=20000)
                if name.endswith(".webm"):
                    page.wait_for_timeout(800)
                    page.screenshot(path=str(HERE / "CHROMIUM_ALPHA_ON_GREEN.png"))
                page.wait_for_function("document.getElementById('v').ended", timeout=14000)
                data = page.evaluate("""() => { const v=document.getElementById('v'); return {
                    duration:v.duration, videoWidth:v.videoWidth, videoHeight:v.videoHeight,
                    currentTime:v.currentTime, ended:v.ended,
                    error:v.error ? v.error.message : null
                }}""")
                results.append({"file": name, **data})
            browser.close()
    finally:
        server.shutdown()
    (HERE / "browser_check.json").write_text(json.dumps(results, indent=2) + "\n")
    assert all(item["ended"] and item["error"] is None for item in results)
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
