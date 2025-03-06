#!/bin/bash

for file in *.png; do
  # Convert to WebP format with quality set to 80 (adjust as needed)
  ffmpeg -i "$file" -q:v 80 "${file%.png}.webp"
  
  # Optionally, remove the original PNG file
  rm "$file"
done

