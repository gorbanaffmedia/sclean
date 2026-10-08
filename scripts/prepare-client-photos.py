"""Convert the selected client photos from images/ into public/assets/img as WebP.

Reads images/ (read-only, never modified). Each photo is cropped to the ratio of
its slot around a manual focus point so faces/subjects are not cut by object-fit.
Only the listed slugs are (re)written; other files in public/assets/img stay.

Usage (from cleaning-site/):  python scripts/prepare-client-photos.py
Requires Pillow.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
OUT = ROOT / "public" / "assets" / "img"

# slug -> (source file, crop ratio w/h, focus x, focus y, output widths)
ASSETS = {
    # hero, desktop only
    "hero-steam-window": ("31bce58a-e887-4e24-8da0-23f80013ca73.jfif", 1145 / 1374, 0.5, 0.5, [640, 1070]),
    # products, 4:3 cards
    "product-chandelier": ("d377920f-0c98-4ff2-8b77-818b77a0335b.jfif", 4 / 3, 0.5, 0.35, [480, 900]),
    "product-renovation-team": ("d68a44c3-6cf4-430d-b195-52aed348088d.jfif", 4 / 3, 0.5, 0.35, [480, 900]),
    "product-entrance": ("221e8cab-2204-413c-9606-1ade8f911b79.jfif", 4 / 3, 0.5, 0.42, [480, 900]),
    "product-mattress-steam": ("0386641b-0bc9-4b6f-87e3-e16eb03ed7e3.jfif", 4 / 3, 0.5, 0.4, [480, 900]),
    "product-clean-room": ("39355451-a1e6-4159-aa40-7c486c8b52b2.jfif", 4 / 3, 0.5, 0.6, [480, 900]),
    "product-windows-duo": ("4f9e0ba1-4b03-4f2e-adf9-3b9db6e0a683.jfif", 4 / 3, 0.5, 0.35, [480, 900]),
    "product-dirty-window": ("79f93939-3137-4078-803e-a8b8ff73f94a.jfif", 4 / 3, 0.5, 0.62, [480, 900]),
    "product-mirror-wipe": ("103c2c2b-035e-4369-b7a5-2babb360b2b6.jfif", 4 / 3, 0.5, 0.4, [480, 900]),
    # scope tabs: «Генеральная» mosaic + single panels
    "scope-kitchen-oven": ("9d232393-9c7b-4e55-aed3-a1993ad5b6d4.jfif", 4 / 3, 0.5, 0.35, [480, 900]),
    "scope-bathroom": ("1afef96d-1244-41af-940a-b2949239101e.jfif", 4 / 3, 0.5, 0.6, [480, 900]),
    "scope-floor-vacuum": ("896f6f92-11fd-471b-95a8-6d050ffa3963.jfif", 4 / 3, 0.5, 0.55, [480, 900]),
    "scope-kitchen-hood": ("38a5d07b-7bd4-4963-add0-142a0d4ffa24.jfif", 4 / 3, 0.5, 0.45, [480, 900]),
    "scope-renovation-ceiling": ("18a48e87-aacc-43fd-8162-2a4fa04d30e4.jfif", 1, 0.5, 0.45, [480, 900]),
    "scope-kitchen-hood-panel": ("38a5d07b-7bd4-4963-add0-142a0d4ffa24.jfif", 1, 0.5, 0.45, [480, 900]),
    "scope-bathroom-panel": ("1afef96d-1244-41af-940a-b2949239101e.jfif", 1, 0.5, 0.55, [480, 900]),
    # approach: careful work on a delicate surface
    "approach-wood-cornice": ("922474b9-bc5d-4eac-9e99-d1d03354be53.jfif", 1, 0.5, 0.4, [480, 900]),
}


def crop(im: Image.Image, ratio: float, fx: float, fy: float) -> Image.Image:
    w, h = im.size
    if w / h > ratio:
        cw, ch = round(h * ratio), h
    else:
        cw, ch = w, round(w / ratio)
    x = min(max(round(fx * w - cw / 2), 0), w - cw)
    y = min(max(round(fy * h - ch / 2), 0), h - ch)
    return im.crop((x, y, x + cw, y + ch))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for slug, (name, ratio, fx, fy, widths) in ASSETS.items():
        src = crop(ImageOps.exif_transpose(Image.open(SRC / name)).convert("RGB"), ratio, fx, fy)
        for w in widths:
            im = src.copy()
            if im.width > w:
                im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            # never upscaled: a small source is saved at its own width (see images.ts)
            dest = OUT / f"{slug}-{im.width}.webp"
            im.save(dest, "WEBP", quality=80, method=6)
            total += dest.stat().st_size
            print(f"{dest.name:36} {im.width}x{im.height} {dest.stat().st_size // 1024} KB")
    print(f"total {total // 1024} KB")


if __name__ == "__main__":
    main()
