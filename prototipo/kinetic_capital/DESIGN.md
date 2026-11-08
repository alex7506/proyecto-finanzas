---
name: Kinetic Capital
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#45464d'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  tabular-figure-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  tabular-figure-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system targets modern, financially conscious individuals and independent professionals demanding absolute clarity over their net worth, cash flow, and recurring commitments. The brand personality balances institutional precision with approachable, contemporary digital craft: trustworthy, razor-sharp, analytical, yet optimistic and calm.

The visual direction merges **Modern Corporate Precision** with subtle **Tactile FinTech Elegance**. Interfaces feel balanced, serene, and legible under high cognitive load. High-contrast typography emphasizes numerical clarity, supported by crisp surface tiers, subtle hairline borders, and targeted color-coded status badges that eliminate ambiguity across accounts, budgets, and balance sheets.

## Colors

The palette establishes an immediate hierarchy between structural foundation, transactional flow, and state alerts:

- **Primary (`#0F172A` - Midnight Slate)**: Anchors key structural elements, top-level navigation, primary buttons, and critical header metrics. Provides deep, reassuring contrast.
- **Secondary (`#6366F1` - Electric Indigo)**: Applied to interactive highlights, primary active states, data analytics markers, and forward-looking forecast indicators.
- **Positive Balance / Growth (`#10B981` - Emerald Green)**: Exclusively signals cash inflows, investment appreciation, savings goals attained, and healthy budget health.
- **Alert / Outflow (`#F43F5E` - Vivid Rose/Coral)**: Reserved strictly for debit outflows, negative deltas, overdraft risks, and urgent payment notices. Never used decoratively.
- **Neutral Core (`#334155` - Muted Slate)**: Drives high-legibility secondary text, metadata labels, icon strokes, and balanced tabular figures.
- **Surfaces (`#FFFFFF` and `#F8FAFC`)**: Crisp canvas backdrops paired with distinct card containers to prevent visual clutter while framing micro-metrics cleanly.

## Typography

The type system blends the energetic geometry of **Plus Jakarta Sans** for prominent financial values and sectional headlines with the systematic, neutral legibility of **Inter** for transactional lists, data labels, and interface controls.

All numerical currency entries, transaction logs, and ledger totals must utilize OpenType tabular figures (`font-variant-numeric: tabular-nums` / `tnum`) to maintain structural vertical alignment across dynamic lists and balance sheets. Tracked labels (`label-sm`, `label-md`) use uppercase formatting or slightly expanded tracking to clarify metadata, timestamps, and card category tags.

## Layout & Spacing

The layout operates on a standard 12-column responsive grid underpinned by an 8pt base layout rhythm:

- **Mobile (< 768px)**: 4-column fluid layout with `margin` of `1rem` and `gutter` of `1rem`. Stack multi-metric widgets into single-column cards.
- **Tablet (768px - 1024px)**: 8-column layout with `margin-md` of `2rem` and `gutter-md` of `1.5rem`. Secondary panels and monthly charts sit alongside primary account cards.
- **Desktop (> 1024px)**: 12-column structured layout capped at a max-width of `1440px`, centered with `margin-lg` of `3rem` and `gutter-lg` of `2rem`. The left navigation rail anchors utility, while main content and side contextual insights split into a 8/4 grid hierarchy.

Component padding adheres strictly to `space-sm` for inline badges, `space-md` to `space-lg` for micro-cards and ledger cells, and `space-xl` for sectional boundaries.

## Elevation & Depth

Visual hierarchy uses a refined combination of **tonal layers** and **ambient shadows** bordered with micro-hairlines:

- **Base Layer (Canvas)**: Background is tinted `#F8FAFC`, avoiding sterile pure white across expansive monitors.
- **Surface Layer (Cards & Modules)**: Pure white `#FFFFFF` paired with an ultra-fine border (`1px solid #E2E8F0`). Subtle drop shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Interactive Floating Layer (Modals, Dropdowns, Action Sheets)**: Elevated surface with `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)` and `border: 1px solid #CBD5E1`.
- **Hover Micro-States**: Cards and interactive table rows subtly elevate by translating `y: -1px` while darkening borders to `#CBD5E1` without loud shadow jumps.

## Shapes

The design system incorporates geometric, modern contours:

- **Primary Cards & Panels**: Formed with `rounded-xl` (1.5rem / 24px) for prominent dashboard balance banners, and standard `rounded-lg` (1rem / 16px) for micro-cards, account tiles, and modal windows.
- **Interactive Controls & Inputs**: Form inputs, select menus, and regular action buttons use `rounded-md` (0.5rem / 8px) to retain structured, software-grade precision.
- **Status & Indicator Badges**: Pill-shaped (`rounded-full`) geometry is reserved for status flags, tags, category badges, and numerical change chips to immediately visually separate categorical metadata from standard actionable boxes.

## Components

### Buttons
- **Primary**: Solid Midnight Slate (`#0F172A`) with pure white text, `0.5rem` border radius, padding `0.625rem 1.25rem`. Active state: subtle scale down (`0.98`) and hover state `#1E293B`.
- **Secondary**: Crisp white background with Slate border (`#E2E8F0`), `#0F172A` text, hover state `#F8FAFC` with border `#CBD5E1`.
- **Accent / CTA**: Electric Indigo (`#6366F1`) solid with white text for primary financial flows (e.g., "Transfer Funds", "Link Account").
- **Destructive**: Subdued rose tint (`#FFE4E6`) with text `#E11D48`, transitioning to `#F43F5E` solid on confirmation.

### Pill Badges & Chips
- **Income / Surplus**: Emerald background tint (`#ECFDF5`), bold emerald text (`#047857`), and hairline border (`#A7F3D0`). Includes small directional arrow or dot.
- **Expense / Warning**: Rose tint (`#FFF1F2`), deep coral text (`#BE123C`), border (`#FECDD3`).
- **Neutral Category Tag**: Slate tint (`#F1F5F9`), neutral text (`#475569`), border (`#E2E8F0`). Completely pill-shaped (`rounded-full`), padded `0.25rem 0.75rem`.

### Financial Micro-Cards
- Container: Clean white base, `1rem` radius, `1px` subtle outline (`#E2E8F0`), padding `1.25rem`.
- Layout: Top line carries category icon and pill badge; center contains bold tabular value (`tabular-figure-lg`); bottom row holds percentage delta vs. previous cycle and muted timestamp.

### Lists & Transaction Rows
- Compact rows with border-b (`#F1F5F9`). Includes merchant/institution icon inside a soft `0.5rem` rounded slate container (`#F8FAFC`), followed by merchant title and categorization label.
- Trailing right side aligns amount (`tabular-figure-md`): green with positive prefix for deposits, standard dark slate for regular expenditures.

### Form Inputs & Search
- Surface: `#FFFFFF` with `1px solid #CBD5E1`, `0.5rem` radius, inset height `44px` for accessibility.
- Focus State: Border color transitions to `#6366F1` with an outer ring `0 0 0 3px rgba(99, 102, 241, 0.15)`.
- Monospace prefix for currency indicators (e.g., `$`, `€`, `£`) anchored in `#64748B`.

### Checkboxes & Radios
- Square checkbox (`0.25rem` radius) and circular radio with standard `18px` size. `#0F172A` filled when checked with crisp white icon checkmark. Inactive state features `#CBD5E1` border on white base.

### Specialized FinTech Components
- **Budget Progress Trackers**: Track height of `6px` or `8px`, track background `#E2E8F0`, progress fill colored dynamically: `#10B981` (< 85%), `#F59E0B` (85%-99%), `#F43F5E` (>= 100%).
- **Account Aggregator Switcher**: Horizontal sliding container with active account highlighted by a thin indigo underline and slate surface background.