#!/usr/bin/env python3
"""Play all six isolated selection scenarios and exercise HTML controls."""
import functools
import http.server
import json
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
MAP = json.loads((HERE / "SELECTION_LAB_MAP.json").read_text())
FILES = [x["output"] for x in MAP["scenarios"].values()]


def main():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(HERE))
    handler.log_message = lambda *args, **kwargs: None
    server = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path="/usr/bin/chromium", headless=True,
                                         args=["--no-sandbox", "--autoplay-policy=no-user-gesture-required"])
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            base = f"http://127.0.0.1:{server.server_address[1]}"
            page.goto(base + "/index.html")
            assert page.locator("button").count() == 6
            page.get_by_role("button", name="Выбор на IDLE #1", exact=True).click()
            page.wait_for_function("document.getElementById('preview').readyState >= 3", timeout=20000)
            assert page.locator("#details").inner_text().find("9.958") >= 0
            assert page.evaluate("document.getElementById('preview').currentSrc").endswith(
                "DOG3_SELECTION_CHAIN_TRIGGER_001_GAME.mp4")

            urls = [base + "/" + name for name in FILES]
            tags = "".join(f'<video src="{url}" muted playsinline autoplay '
                           'style="width:200px;height:113px"></video>' for url in urls)
            page.set_content('<body style="margin:0;background:#ddd">' + tags + '</body>')
            page.wait_for_function("[...document.querySelectorAll('video')].every(v=>v.readyState>=3)",
                                   timeout=20000)
            page.wait_for_function("[...document.querySelectorAll('video')].every(v=>v.ended)",
                                   timeout=45000)
            results = page.evaluate("""() => [...document.querySelectorAll('video')].map(v => ({
                duration:v.duration, width:v.videoWidth, height:v.videoHeight,
                ended:v.ended, error:v.error ? v.error.message : null
            }))""")
            browser.close()
    finally:
        server.shutdown()
    data = [{"file": f, **r} for f, r in zip(FILES, results)]
    assert all(x["ended"] and x["error"] is None for x in data)
    (HERE / "selection_browser_check.json").write_text(json.dumps({
        "htmlControlPhase1": True, "videoResults": data,
    }, indent=2) + "\n")
    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    main()
