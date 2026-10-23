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
- **Motion:** one easing, `cubic-bezier(.22,1,.36,1)`.
  - The hero name rises out of its line, and the details follow.
  - Selected blocks reveal once on entry.
  - The giant words drift slightly with scroll, and the contact circle grows in as the section arrives. Both use CSS scroll timelines, as progressive enhancement.
  - The nav pill moves on a critically damped spring.
  - With reduced motion, all of this is off and nothing is hidden.

## Content rule
This is a personal site for an entrepreneur. There are no projects, research, skills lists or invented business facts.
