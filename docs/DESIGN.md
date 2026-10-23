# Design: Swiss foundation, glass details

## Principles
- **Swiss grid first.** Everything sits on a 12-column grid (4 on phones):
  - Each section's index and label take columns 1–3; headings and text start at column 4.
  - The hero is a poster. Details sit small across the top, and the name is set very large along the bottom, with "Lewhan." offset to column 4.
- **Glass is a material, used in three places:**
  - the floating nav, which switches to dark glass over the Skyradix field
  - the frosted panel over the giant "Skyradix" word
  - the contact panel over a red Swiss circle

  Body text never sits on busy glass without an opaque enough tint.
- **Red is punctuation, not a fill.** It appears as the full stop after the name, small square markers, section indices, the primary button and the contact circle.

## Tokens
| Name | Hex | Use |
| --- | --- | --- |
| Paper | `#F3F1EC` | Page |
| Ink | `#16171A` | Text (15.9:1), Skyradix field |
| Ink 2 | `#5E5C57` | Secondary text (5.9:1) |
| Rule | `#D8D4CC` | Hairlines |
| Red | `#D42A1E` / `#C2241A` | Accent / text and buttons (5.0:1; white on it, 5.6:1) |

- **Type:** Inter Tight 600 for display, with −0.045 to −0.055em tracking and 0.86 leading. Inter (optical size) for reading text.
- **Motion system** (the tokens live in `globals.css`):
  - **Curves:** `--ease-out` for arrivals and hovers; `--ease-in-out` for lines and masks that travel.
  - **Durations:** 200ms (hover and press), 300ms (nav and surfaces), 560ms (content reveals), 900ms (hero type and image masks).
  - **Hero entrance** (about 1.16s, never blocks input), in this order:
    1. the nav fades in
    2. "Thisula" and "Lewhan." rise out of their lines
    3. the identity line, intro and actions follow in a stagger
    4. the bottom hairline draws, then the footer row appears
  - **Scroll reveals:** `data-reveal` on an element makes it fade and rise 16px once, as its top crosses about 90% of the viewport. There are three variants:
    - `rise`: a word rises out of its clipping line
    - `mask`: an image is uncovered from the bottom edge
    - `circle`: the contact circle scales in
  - **Rule draws:** a `.rule-draw` line inside a revealed element draws in from the left. Anything scrolled past (anchors, fast flings) is shown at once.
  - **Hover and press:**
    - Underlines draw in on hover.
    - Arrows nudge; external links nudge diagonally.
    - The Skyradix call to action swaps its arrow and lifts.
    - Buttons press down to 0.975 scale.
    - The copy-email control confirms in place.
  - **Nav:** rests lighter at the top of the page, firms up on scroll, turns to dark glass over Skyradix, and its pill moves on a critically damped spring.
  - **Hero portrait:** fills the last five columns at full hero height, beside a seven-column text block (identity, name, intro). Below 1024px it stacks under the name. It is uncovered from the bottom edge on load.
  - **Scroll-linked depth:** desktop only, via CSS scroll timelines. The giant words drift.
  - **Fallbacks:** with reduced motion, all of this is off and nothing is hidden. Without JavaScript, nothing is hidden either.

## Content rule
This is a personal site for an entrepreneur. There are no projects, research, skills lists or invented business facts.
