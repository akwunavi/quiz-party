#!/usr/bin/env python3
"""Exercise the isolated HTML lab and play every delivered MP4 in Chromium."""
import functools
import http.server
import json
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
DATA = json.loads((HERE / "DELAY_MAP.json").read_text())
FILES = [x["output"] for x in DATA["scenarios"].values()]


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
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            base = f"http://127.0.0.1:{server.server_address[1]}"
            page.goto(base + "/index.html")
            page.wait_for_function("document.querySelectorAll('#choices button').length >= 14",
                                   timeout=15000)
            page.get_by_role("button", name="Выбор на IDLE #77", exact=True).click()
            page.wait_for_function("document.getElementById('preview').readyState >= 3",
                                   timeout=15000)
            assert page.evaluate("document.getElementById('preview').currentSrc").endswith(
                "DOG3_IDLE_EXIT_TRIGGER_077_GAME.mp4")
            assert "3.792" in page.locator("#details").inner_text()
            page.screenshot(path=str(HERE / "CHROMIUM_LAB_SCREEN.png"))
            for start in range(0, len(FILES), 4):
                group = FILES[start:start+4]
                html = "".join(f'<video src="{base}/{name}" muted playsinline autoplay '
                               'style="width:300px;height:169px"></video>' for name in group)
                page.set_content('<body style="margin:0;background:#ddc9a7">' + html + '</body>')
                page.wait_for_function("[...document.querySelectorAll('video')].every(v=>v.readyState>=3)",
                                       timeout=20000)
                page.wait_for_function("[...document.querySelectorAll('video')].every(v=>v.ended)",
                                       timeout=40000)
                played = page.evaluate("""() => [...document.querySelectorAll('video')].map(v=>({
                    duration:v.duration, width:v.videoWidth, height:v.videoHeight,
                    ended:v.ended, error:v.error ? v.error.message : null
                }))""")
                results.extend({"file": name, **item} for name, item in zip(group, played))
            browser.close()
    finally:
        server.shutdown()
    assert len(results) == len(FILES)
    assert all(x["ended"] and x["error"] is None for x in results)
    (HERE / "BROWSER_CHECK.json").write_text(json.dumps({
        "htmlControlsWorked": True, "playedVideoResults": results,
    }, indent=2) + "\n")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
