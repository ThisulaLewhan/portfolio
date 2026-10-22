# Design: "Radix"

## Why the first version failed

- **Foundation:** an off-white page with polite type. It read as a light portfolio template, whatever the details.
- **Hero:** the stock "text on the left, illustration on the right" composition. The transit map was a good infographic, but it was not an identity.
- **Colour:** four primary line colours read as a corporate chart, not a personal brand.
- **Content:** projects and research made up most of the page, so the person was a footnote to the work.
- **Motion:** a single line-draw. Everything else was static stacked sections.

## Concepts considered

1. **Departure board.** The name is set on split-flap characters, and the roles flip into place.
   - Rejected: it's an existing cliché, and it only works as a gimmick.
2. **Night editorial.** A high-contrast serif on black, laid out like a magazine cover.
   - Rejected: it reads as fashion and luxury templating, and says nothing about business or technology.
3. **Radix (chosen).** The Skyradix name says it: *radix* is Latin for root, and the √ sign is called a radical.
   - The site is written as an expression under a root. A stroke of ultramarine light, the radical, carries the name.
   - The same mark recurs as each section's signature, and it closes the page as √ LET'S TALK.
   - It is personal (it comes from the business he founded), mathematical (technology) and graphic (brand), and it suggests growth: a short drop to the root, then a long rise.

## Art direction

- **Stage:** obsidian with film grain and a vignette. In the opening screen, the visitor's pointer is a light source that sweeps the dark and catches the lettering of the name.
- **One colour of light:** ultramarine. It is used for the radical, progress and focus, and as one full-bleed field for Skyradix (the "sky").

| Name | Hex | Role |
| --- | --- | --- |
| Obsidian | `#08090C` | Stage |
| Graphite | `#121419` | Raised surfaces, hover states |
| Bone | `#EDE7DC` | Primary text (16:1); warm, so it reads as human, not clinical |
| Ash | `#9A968E` | Secondary text (6.8:1) |
| Ultramarine | `#3550FF` | The radical, progress, focus |
| Sky field | `#1F33CC` | The Skyradix section (bone on it, 7.1:1) |

## Type

- **Big Shoulders** (optical size 72, weight 800–900, capitals): the name and display statements. Condensed and industrial, so it can fill a screen without shouting.
- **Instrument Sans** (width 75–100): body text and labels, always in sentence case.

## Composition

```text
┌─────────────────────────────────────────────────────────────┐
│ √ Thisula Lewhan          About  Perspective  Skyradix  ... │
│ ━━━━━━━━━ (scroll progress: the vinculum) ━━━━━━━━━━━━━━━━━ │
│        ╲━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  ╲    ╱  THISULA                                            │
│   ╲  ╱   LEWHAN            (pointer light)                  │
│    ╲╱  radix: root                                          │
│  Founder of Skyradix     Ideas are easy. I'm...   [Meet me] │
└─────────────────────────────────────────────────────────────┘
 About        large manifesto, lit word by word as you read
 Perspective  four huge outlined words; choose one to light it
 Skyradix     full-bleed ultramarine "sky"; the name splits into Sky | Radix
 Groundwork   MAS Holdings, IEEE, SLIIT, SLIM, as large rows
 Person       duotone portrait that turns to colour at a touch
 Contact      √ LET'S TALK, with four clear routes
```

## Motion

- **Opening:** one moment. The radical draws, the vinculum extends, and the letters rise into place. It lasts about 1.2 s, happens once per session, and never blocks content.
- **Springs:** critically damped by default (`bounce: 0`). They are used for the nav indicator, the perspective selector, the Skyradix split and the menu.
- **Scroll:** the vinculum at the top of the page is the progress bar, and the manifesto lights word by word. Neither hijacks scrolling.
- **Reduced motion:** no draw, no letter rise, no moving light, and the manifesto is fully lit. State changes cross-fade.

## Weakest decisions, revisited after review

See the final handoff notes.
