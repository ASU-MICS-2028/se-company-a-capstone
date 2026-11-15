# Nyansapo Systems brand — issue #4

Status: direction **C** selected by Joseph on 15 November 2026; final vector assets exported. Generated imagery is reference material, never the final logo.

Exploration: `logo-directions.png` (OpenAI image generation, 15 November 2026), conditioned on the attached `nyansapo-reference.png`. A and B use lighter bands; C is bolder. The model omitted the requested monochrome row and rendered two gold crossing accents rather than one; correct both in the selected manual redraw. The final redraw corrects those deviations and opens the central terminal gap for small-size rendering.

## Authentic glyph reference

- Source: [Nyansapo.png, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nyansapo.png).
- Original artwork: Bosomba Amosah, extracted from *Gyaman Adinkra Symbols*; crop by Pablo Busatto (14 August 2020).
- [Original reference image](https://upload.wikimedia.org/wikipedia/commons/f/f0/Nyansapo.png).
- Consulted 15 November 2026. The file page lists WTFPL and public-domain dedication information.
- Meaning corroborated by the [University of Michigan Department of Afroamerican and African Studies](https://prod.lsa.umich.edu/daas/engagement/adinkra_symbols.html): wisdom, ingenuity, intelligence and patience.

Use this glyph's actual silhouette and crossings as the drawing base, rather than the four-circle concept-board sketch. Preserve its identifiable structure when regularising the curves.

## Direction and production

Explore a faithful geometric treatment with uniform band weight and clear interlace gaps. Palette: maroon `#8a1c2b`, central gold accent `#e0a21b`, wordmark near-black `#22181a`. Wordmark: **Nyansapo**, with widely spaced **SYSTEMS** below.

Selected treatment: C, with bold, regularised bands. The mark was manually redrawn as cubic SVG paths using the authentic glyph silhouette as the base reference. Transparent masks establish over/under crossing gaps. One short gold segment accents the right central crossing. The paired vertical terminals are retained from the authentic glyph; this is an open-ended knot motif rather than a closed loop.

The wordmark uses locally installed Futura Bold / Medium converted to vector outlines through CoreText. No font files or raster images are embedded. Primary and monochrome SVGs have transparent backgrounds; the reversed lockup includes a maroon background.

Visually checked at full size, 32 px and 16 px. At 16 px the central opening and side loops remain visible; the tiny gold accent and interlace gaps are secondary details. Use the mark alone at small sizes, not the complete wordmark.

## Exports

| File | Use |
| --- | --- |
| `logo.svg` | Primary horizontal lockup, 760 × 256 |
| `mark.svg` | Square mark, 256 × 256 |
| `logo-mono.svg` | All-maroon horizontal lockup |
| `logo-reversed.svg` | White/gold horizontal lockup on maroon |
| `mark-512.png` | Transparent 512 × 512 raster export |
| `mark-32.png` | Transparent 32 × 32 raster export |
| `logo-review.png` / `logo-review.svg` | Overview of the three final lockups |

Production SVGs contain editable vector paths, with no external dependencies. PNGs are rendered from `mark.svg`.

## Font licence note

The wordmark outlines come from Futura as bundled with macOS. Apple's licence for bundled fonts is unclear about using them in logos. That is fine for a class project. Before any commercial use, redraw the wordmark in an open font such as Jost, which is a free Futura-like font.
