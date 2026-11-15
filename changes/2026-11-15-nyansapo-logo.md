---
title: Nyansapo Systems logo, final vector files
date: 2026-11-15
owner: Joseph Etse
contributors: []
issue: "#4"
pr: ""
ai_used: yes
---

# Nyansapo Systems logo, final vector files

## What changed

`docs/brand/` now holds the final logo:
- the full lockup, the mark on its own, an all-maroon version and a reversed version, as SVG
- the mark as PNG at 512 px and 32 px
- a review sheet showing all three lockups
- the generated direction sheet
- the authentic Nyansapo glyph used as the drawing base, with its source cited
- a usage note in `docs/brand/README.md`

The repo README now shows the logo.

## Why

#4: the concept-board mark was a sketch. The final logo had to be drawn from the authentic glyph.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Picked direction C, directed the redraw, and checked the exports at full size, 32 px and 16 px |

## AI use

| Part | Tool | What the AI did | What a person checked |
|---|---|---|---|
| Logo directions A–C | OpenAI image generation | Made three raster directions from the authentic glyph (`logo-directions.png`) | Joseph chose C |
| Vector redraw | AI coding assistant | Redrew the mark as cubic SVG paths over the glyph, and turned the Futura wordmark into outlines | Joseph reviewed `logo-review.png`; the 16 px check is noted in `docs/brand/README.md` |
| Commit and docs | Claude Code | Copied the files into the repo, checked the SVGs for scripts and external links, and wrote the font licence note | Joseph |

## How to check it

Open `docs/brand/logo-review.png`. Open `docs/brand/mark.svg` in a browser and zoom out to favicon size.
