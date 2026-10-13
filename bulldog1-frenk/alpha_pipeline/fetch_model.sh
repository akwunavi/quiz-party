#!/bin/sh
# Downloads BiRefNet-general (lite, Swin-tiny) in ONNX form from the rembg project's GitHub release and checks its hash.
set -e
cd "$(dirname "$0")"; mkdir -p models
F=models/BiRefNet-general-bb_swin_v1_tiny-epoch_232.onnx
URL=https://github.com/danielgatis/rembg/releases/download/v0.0.0/BiRefNet-general-bb_swin_v1_tiny-epoch_232.onnx
SHA=5600024376f572a557870a5eb0afb1e5961636bef4e1e22132025467d0f03333
[ -f "$F" ] || curl -L --fail -o "$F" "$URL"
echo "$SHA  $F" | sha256sum -c -
