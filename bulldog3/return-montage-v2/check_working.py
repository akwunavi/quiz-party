#!/usr/bin/env python3
"""Verify browser playback and visible alpha of working Rocky RETURN D."""
import functools
import http.server
import json
import socketserver
import threading
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
FILE = "assets/DOG3_RETURN_D_ALPHA_97.webm"


def main():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(HERE))
    handler.log_message = lambda *args, **kwargs: None
    server = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path="/usr/bin/chromium", headless=True,
                                         args=["--no-sandbox", "--autoplay-policy=no-user-gesture-required"])
            page = browser.new_page(viewport={"width": 1276, "height": 720},
                                    device_scale_factor=1)
            url = f"http://127.0.0.1:{server.server_address[1]}/{FILE}"
            page.set_content(f'<body style="margin:0;background:#00df36"><video id="v" '
                             f'src="{url}" muted playsinline autoplay '
                             f'style="width:1276px;height:720px"></video></body>')
            page.wait_for_function("document.getElementById('v').readyState >= 3", timeout=20000)
            page.wait_for_function("document.getElementById('v').currentTime >= 0.8", timeout=10000)
            path = HERE / "CHROMIUM_RETURN_D_ALPHA_ON_GREEN.png"
            page.screenshot(path=str(path))
            pixel = Image.open(path).convert("RGB").getpixel((8, 8))
            assert pixel == (0, 223, 54), pixel
            page.wait_for_function("document.getElementById('v').ended", timeout=10000)
            details = page.evaluate("""() => {const v=document.getElementById('v');
                return {duration:v.duration, width:v.videoWidth, height:v.videoHeight,
                        ended:v.ended, error:v.error ? v.error.message : null}}""")
            browser.close()
    finally:
        server.shutdown()
    assert details["ended"] and details["error"] is None, details
    (HERE / "return_d_browser_check.json").write_text(json.dumps({
        "file": FILE, **details, "greenCornerPixel": list(pixel),
        "alphaVisibleInChromium": True,
    }, indent=2) + "\n")
    print(json.dumps(details))


if __name__ == "__main__":
    main()
