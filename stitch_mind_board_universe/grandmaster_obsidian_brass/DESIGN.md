---
name: Grandmaster Obsidian & Brass
colors:
  surface: '#10141a'
  surface-dim: '#10141a'
  surface-bright: '#353940'
  surface-container-lowest: '#0a0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2eb'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#dfe2eb'
  inverse-on-surface: '#2d3137'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#93d7ff'
  on-tertiary: '#00354a'
  tertiary-container: '#3bbffa'
  on-tertiary-container: '#004b67'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#10141a'
  on-background: '#dfe2eb'
  surface-variant: '#31353c'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: 0em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0.01em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 9px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-3xs: 0.125rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem
  space-3xl: 3rem
  board-gutter: 0.25rem
  screen-edge-padding: 1rem
---

## Brand & Style

The design system merges the physical weight and prestige of an heirloom luxury game parlor with the sleek responsiveness of a competitive digital interface. It targets cerebral tacticians, lifelong board game enthusiasts, and aspirational players who value deliberate mastery, craftsmanship, and quiet prestige over chaotic arcade gamification.

The aesthetic philosophy fuses **Tactile / Skeuomorphic Luxury** with **Modern Sleek Glass & Glow**. Deep obsidian and brushed slate substrates mimic precision-cut basalt and polished ebony game boards. Accents draw inspiration from hand-burnished brass, lathed gold rings, and inlay wood marquetry. Interactive states shed vintage clunkiness in favor of high-fidelity precision: razor-thin luminous inner rims, calibrated depth bevels, and ethereal warm amber and celestial cyan glow channels for legal moves, celestial path nodes, and grandmaster masteries.

## Colors

The palette grounds the interface in profound shadow while using warm metallic illumination and crisp informational glows to guide movement and hierarchy.

- **Primary (`#D4AF37`) — Burnished Antique Gold**: Reserved for high-value iconography, crown status markers, progress star fillings, and primary grandmaster action buttons.
- **Secondary (`#F59E0B`) — Radiant Amber**: Applied to level completion banners, active path nodes, streak indicators, and tactile rim highlights.
- **Tertiary (`#38BDF8`) — Astral Cyan**: An electric, low-saturation azure used sparingly for legal board movement paths, active coordinate rings, and tactical assist callouts.
- **Neutral (`#0D1117`) — Deep Obsidian**: The infinite backdrop base. Supported by mid-layer Slate (`#161B22`), elevated surface panels (`#21262D`), and hairline structural borders (`#30363D`).

Functional overlays:
- **Board Square Light**: `#2D2824` (Smoked Walnut Tint)
- **Board Square Dark**: `#181412` (Ebonized Oak Tint)
- **Valid Move Highlight**: `rgba(56, 189, 248, 0.22)` with a solid core indicator `rgba(212, 175, 55, 0.9)`.

## Typography

The typographic scale deliberately balances high-fashion intellect with technical precision:

- **Headlines & Tournament Titles (`Bodoni Moda`)**: Evokes the prestige of classical master tournaments, engraved championship trophies, and literary strategy texts. Used exclusively for game variant headers, tier names, and modal announcements.
- **Interface & Narrative Body (`Plus Jakarta Sans`)**: Delivers supreme legibility under constrained viewport conditions. Used for match rules, player bios, chat logs, and game tooltips.
- **Board Coordinates, Clocks & Notation (`JetBrains Mono`)**: Strict, tabular, and monospace. Essential for SAN (Standard Algebraic Notation), turn counters, millisecond timers, and rank/file notation marks along board margins.

## Layout & Spacing

The interface employs a contextually centered fluid grid with a strict 4px/8px micro-spatial baseline rhythm:

- **Mobile Viewports (<640px)**: 16px lateral padding with board dimensions fixed to a strict `1:1` aspect-ratio container calculating `min(100vw - 32px, 480px)`. Opponent profile and status strips sit directly docked at the top edge; user controls and captured pieces tray remain docked at the thumb-reachable bottom zone.
- **Tablet / Foldable Viewports (640px - 1024px)**: Transition to an asymmetric split screen: Game canvas claims a dedicated 65% square zone with 24px safety margins, while move notation, live evaluation graphs, and player cards stack within a 35% lateral rail.
- **Desktop / Hybrid Proportions (>1024px)**: Center-weighted fixed board arena flanked symmetrically by tactile game piece repositories, chronometer hardware widgets, and journey campaign maps.

## Elevation & Depth

Visual hierarchy uses three-dimensional physical material stacking rather than flat overlays:

- **Base Layer (Level 0 - Ground)**: Raw `#0D1117` obsidian background with a faint vignette darkening toward the outer borders.
- **Board Frame & Panel Surface (Level 1)**: Slate `#161B22` with a subtle 1px dual border: outer `rgba(255, 255, 255, 0.05)`, inner top edge `rgba(212, 175, 55, 0.2)` simulating overhead gallery lighting grazing brass.
- **Floating Modals & Interactive Tiles (Level 2)**: Deep surface `#21262D` layered over a 16px backdrop blur, elevated by dual shadows:
  - Deep cast shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.85)`
  - Ambient bounce shadow: `0 4px 12px rgba(212, 175, 55, 0.06)`
- **Valid Move & Destination Nodes (Luminous Elevation)**: Elevated purely by self-illuminated glow channels: `0 0 16px rgba(56, 189, 248, 0.5)` with an inner pinhole specular highlight.

## Shapes

The interface balances sharp, deliberate strategy geometry with softly bevelled physical playing tokens. Structural containers, interactive buttons, and modals use an 8px (`0.5rem`) corner radius to evoke machined metal or polished hardwood corner joints. Circular tokens (checkers draughts, coordinate dots, and progress nodes) remain strictly round (`50%`). Badges and star level caps use an architectural clipped-corner or capsule silhouette to simulate stamped museum medallion seals.

## Components

### 1. Tactile Master Buttons
- **Primary (Burnished Brass)**: Gradient fill from `#F59E0B` to `#D4AF37` with an inset highlight (`inset 0 1px 0 rgba(255,255,255,0.4)`), deep bottom rim border (`2px solid #8A6D1E`), and dark embossed typography. On touch/click: 1px downward translation with reduced shadow to emulate mechanical click action.
- **Secondary (Obsidian Inlay)**: Background `#161B22`, border `1px solid rgba(212, 175, 55, 0.35)`, text `#D4AF37`. Hover/focus activates a warm radial gold haze beneath the element.

### 2. Campaign Journey Path Nodes
- Stepper circles connecting stages along the Grandmaster's Journey.
- **Completed Node**: Polished brass plate stamped with a 5-point primary gold star, linked via a solid gold 2px trail.
- **Current Active Node**: Multi-ringed brass chassis with an interior pulsing glow (`#38BDF8`), accompanied by an animated ambient radial aura.
- **Locked Node**: Matte obsidian bezel (`#161B22`) with a debossed lock icon in `#30363D` along a dashed slate trail.

### 3. Star Progression Badges
- Hexagonal or coin-shaped containers in `#21262D` framed in a 1px brass border. Inside, 1 to 3 stars fill progressively: unearned stars appear as engraved dark impressions, while earned stars cast a sharp golden bloom.

### 4. Interactive Game Boards (Chess, Turkish, & Chinese Checkers)
- **Border Rim**: Dark mahogany/brass edge strip marked with etched alphanumeric coordinates in `label-sm` (`JetBrains Mono`).
- **Squares / Pits**: Subtle micro-textures distinguishing opposing squares. Active selections gain a persistent 1.5px gold outline (`#D4AF37`).
- **Legal Move Rings**: Semi-transparent cyan rings (`#38BDF8`) floating above valid target squares; landing on an opponent piece shifts the glow from cyan to an incendiary amber-crimson rim.

### 5. Cards & Dossiers
- Player and scenario cards use stacked slate surfaces with an ultra-fine 1px border. The header features the player's rating badge, avatar with a brass rank ring, and an integrated country/guild emblem.

### 6. Inputs & Notation Lists
- **Text & Move Notation Inputs**: Background `#0D1117`, border `1px solid #30363D`, focused border `1px solid #D4AF37` with `box-shadow: 0 0 8px rgba(212, 175, 55, 0.25)`.
- **Notation Feed**: Two-column alternating tabular view with monospace moves; current step highlights with a `#21262D` pill tag.