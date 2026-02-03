#!/usr/bin/env bash

set -e

echo "Converting JPG, JPEG, PNG to WebP..."

shopt -s nullglob nocaseglob

files=(images/*.jpg images/*.jpeg images/*.png)

if [ ${#files[@]} -eq 0 ]; then
  echo "No images found in ./images"
  exit 0
fi

for f in "${files[@]}"; do
  echo "→ $f"
  cwebp "$f" -q 80 -metadata none -o "images/$(basename "${f%.*}").webp"
done

echo "Done."