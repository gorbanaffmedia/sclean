"""Copy ONLY the selected temporary donor images into public/assets/img as WebP.

Reads the read-only donor export (../assets/framerusercontent.com/images) and never
modifies it. Donor fonts are intentionally not copied.

Usage (from cleaning-site/):  python scripts/prepare-donor-assets.py
Requires Pillow.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DONOR = ROOT.parent / "assets" / "framerusercontent.com" / "images"
OUT = ROOT / "public" / "assets" / "img"

# slug -> (donor file, output widths)
ASSETS = {
    "hero-cleaner": ("MLjSz521MrQUJZ777RfPelM0opw.0xzbscj.png", [640, 1070]),
    "kitchen-wipe": ("jPLxnktD4qKXEeJo6mQp3JG7ZoE.0m8s1qp.png", [480, 900]),
    "vacuum-window": ("DEZ2J4qi1mM99OO7HLaYAMDeIY.0kec1jz.png", [480, 900]),
    "mop-living": ("95XxjrsYrBEKW0zdw7ryO1q08q4.0kec1jz.png", [480, 900]),
    "vacuum-sofa": ("UdwSjXUt6PFpFKgh5m8OjdEcjc.0kec1jz.png", [480, 900]),
    "room-yellow-chair": ("aeFCtLmLtuarEAy5VZ9IMpc0PxQ.1h8zeu8.png", [480, 900]),
    "kitchen-counter": ("qvOsZM4ZLuU7iIZk3vAu8qqIMvQ.1h8zeu8.png", [480, 900]),
    "window-wipe": ("6ICOxsFU8lYJ7KxVyvdg5X4Sfc.1h8zeu8.png", [480, 900]),
    "table-wipe": ("tiW0YU2eiKEygUD9gt0FIyapwnQ.0kec1jz.png", [480, 900]),
    "bathroom-sink": ("5dQ63uRtowBzBNL4fvuFuqzHuEE.0kec1jz.png", [480, 900]),
    "living-neutral": ("jSRAszwRKdOaKzCJaiPa4XBHeHU.1h8zeu8.png", [480, 900]),
    "kitchen-island": ("Hkdm2XuxDHd02fAiplKmM76vlo.0kec1jz.png", [480, 900]),
    "bathtub": ("JhZr3lSHdwY3fXbHjwMnZ0ZfUVU.1h8zeu8.png", [480, 900]),
    "team-1": ("5LQeRurkPORRHnTi2zNEYMdIfQ.19m19ax.png", [400, 700]),
    "team-2": ("OxwJTilIYnhkKmrERzJoY8rGQg.19m19ax.png", [400, 700]),
    "team-3": ("g97Im5mY0gnYBkppGM4wYmyM4fo.19m19ax.png", [400, 700]),
    "team-4": ("msW3TiCTVeDZjudqgKcYHQRBOWg.19m19ax.png", [400, 700]),
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    # client photos (scripts/prepare-client-photos.py) live in the same folder —
    # only this script's own slugs are overwritten, nothing is wiped
    total = 0
    for slug, (name, widths) in ASSETS.items():
        src = Image.open(DONOR / name).convert("RGB")
        for w in widths:
            im = src.copy()
            if im.width > w:
                im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            dest = OUT / f"{slug}-{w}.webp"
            im.save(dest, "WEBP", quality=80, method=6)
            total += dest.stat().st_size
            print(f"{dest.name:32} {im.width}x{im.height} {dest.stat().st_size // 1024} KB")
    print(f"total {total // 1024} KB")


if __name__ == "__main__":
    main()
