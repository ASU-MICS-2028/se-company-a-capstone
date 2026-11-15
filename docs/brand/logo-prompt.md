# Logo prompt (issue #4)

The logo does not exist yet. The concept board only has a sketch (four circles and a gold diamond). Use the prompt below with an image model to explore directions, then **redraw the chosen direction as clean SVG** from the authentic Nyansapo glyph. A generated raster image is a reference, not the final logo.

Before generating, find a reference image of the authentic Nyansapo Adinkra symbol and attach it to the image model. Cite where the reference came from in `docs/brand/README.md`.

## Prompt

> A flat, minimal vector logo for a software company called "Nyansapo Systems". The mark is a clean, geometric redrawing of the Ghanaian Adinkra symbol Nyansapo, the "wisdom knot": one continuous band that loops into a symmetrical knot, matching the attached reference glyph. Use uniform stroke weight, with small gaps where the band crosses over and under itself so the interlace reads clearly. Colour the mark deep maroon #8a1c2b, with one small accent in kente gold #e0a21b at the centre where the loops cross. To the right of the mark, set the wordmark "Nyansapo" in a bold, modern geometric sans-serif in near-black #22181a, with "SYSTEMS" below it in small, widely spaced capitals. Plain white background, no gradients, no shadows, no 3D, no extra decoration, and no other Adinkra symbols. The mark must stay recognisable at 16 px. Centred composition with generous padding.

**Variations to ask for:**
- Mark only, square.
- One colour, all maroon.
- Reversed: white mark and gold accent on a maroon #8a1c2b background.

**Negative prompt** (if the tool supports one): gradient, 3D, glossy, shadow, photo, texture, clip art, extra symbols, misspelled text, African map, lightbulb, brain.

## After generating

1. Pick one direction as a team.
2. Trace it to SVG, by hand or with Figma's pen tool, using the authentic glyph as the base layer.
3. Export `logo.svg`, `mark.svg`, `logo-mono.svg`, `logo-reversed.svg`, and `mark-512.png` / `mark-32.png` to `docs/brand/`.
4. Log the change in `changes/` and declare the image model in its AI-use table.
