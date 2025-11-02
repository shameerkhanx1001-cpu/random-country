# Random Country Generator - Design Guidelines

## Design Approach

**Selected Approach**: Reference-Based with Modern Utility Focus

Drawing inspiration from:
- **Duolingo**: Playful, encouraging interactions with clear CTAs
- **Google Material Cards**: Clean information hierarchy and card-based layouts
- **Interactive Map Interfaces**: Smooth, engaging geographic exploration

**Core Principle**: Create an inviting, educational discovery experience that makes learning about countries feel like an adventure rather than reading a database.

---

## Layout System

**Spacing Scale**: Use Tailwind units of **2, 4, 6, 8, 12, and 16** for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Element gaps: gap-4 to gap-6

**Container Strategy**:
- Main content: max-w-4xl mx-auto (optimal reading/viewing width)
- Map sections: max-w-6xl mx-auto (wider for geographic context)
- Mobile: px-4, Desktop: px-6

---

## Typography System

**Primary Font**: Inter or DM Sans (modern, clean, highly readable)
**Accent Font**: Space Grotesk or Outfit (for headings with character)

**Hierarchy**:
- H1 (Page title): text-4xl md:text-5xl font-bold tracking-tight
- H2 (Country name): text-3xl md:text-4xl font-bold
- H3 (Section headers): text-xl md:text-2xl font-semibold
- Body (Country facts): text-base md:text-lg leading-relaxed
- Labels (Data categories): text-sm font-medium uppercase tracking-wide
- Map caption: text-sm

---

## Core Layout Structure

### Initial State (Pre-Generation)
**Centered Welcome Section**:
- Vertical centering with min-h-screen flex layout
- Large heading introducing the concept
- Engaging subheading explaining the experience
- Prominent "Generate Random Country" button (w-full max-w-md, py-4 text-lg)
- Optional: Simple animated globe icon or world map silhouette above content
- Footer with minimal links at bottom

### Generated State (Post-Click)
**Sticky Header Bar**:
- Compact navigation with logo/title
- "Generate Another Country" button (always accessible)
- Optional country counter ("Explored: X countries")

**Country Display Card** (main content):
- Large flag image at top (aspect-ratio-3/2, full card width)
- Country name below flag (prominent, centered)
- Grid layout for key facts (2 columns on mobile, 3-4 on desktop)

**Information Grid Layout**:
```
[Icon] Region: Asia
[Icon] Capital: Tokyo  
[Icon] Population: 125M
[Icon] Language: Japanese
[Icon] Currency: Yen
[Icon] Size: 377,975 km²
[Icon] National Flower: Cherry Blossom
[Icon] National Dish: Sushi
```

**Interactive Map Section**:
- Full-width container below facts
- Embedded map with country highlighted
- Zoom controls visible
- Map height: h-96 on mobile, h-[500px] on desktop

---

## Component Specifications

### Primary CTA Button
- Large, rounded (rounded-xl to rounded-2xl)
- Substantial padding (px-8 py-4 to px-12 py-5)
- Bold text with icon (globe or shuffle icon)
- Shadow for depth (shadow-lg)
- Smooth scale animation on hover (hover:scale-105 transition-transform)

### Country Information Card
- Rounded corners (rounded-2xl)
- Subtle shadow (shadow-xl)
- Padding: p-6 md:p-8
- Background: elevated surface treatment

### Fact Display Items
- Grid layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
- Each item: Rounded container with icon, label, and value
- Icon: 24x24px from Heroicons (outline style)
- Label: Muted, uppercase, small
- Value: Prominent, larger font

### Flag Display
- Full width of card
- Rounded top corners matching card
- Aspect ratio maintained
- Shadow or border for definition
- Alt text for accessibility

### Loading State
- Animated skeleton screens for card
- Pulsing effect on button during generation
- Smooth fade-in for country reveal (animate-fade-in)

---

## Interaction Patterns

### Generation Flow
1. **Initial Click**: Button expands, shows loading indicator
2. **Data Fetch**: Skeleton card appears below button
3. **Reveal**: Smooth fade-in of flag, then facts cascade in
4. **Map Load**: Map animates into view after fact display
5. **Completion**: Button transforms to "Generate Another"

### Navigation
- Minimal top bar appears only after first generation
- Always-accessible regenerate action
- Smooth scroll to top on new generation
- Optional: Share button for current country

---

## Accessibility Requirements

- Keyboard navigation for all interactive elements
- Focus indicators on all clickable items (ring-2 ring-offset-2)
- Aria labels for icon-only buttons
- Alt text for all flags and images
- Sufficient contrast ratios (AA minimum)
- Screen reader announcements for new country loads

---

## Animation Strategy

**Use Sparingly**:
- Button hover scale (subtle)
- Card fade-in on generation (300ms duration)
- Skeleton pulse during loading
- Smooth scroll on navigation

**Avoid**:
- Excessive background animations
- Parallax effects
- Continuous auto-playing animations
- Distracting transitions between facts

---

## Images

**No Large Hero Image Required**

**Flag Images**:
- Source: REST Countries API provides flag URLs
- Display: Full width of country card, aspect-ratio-3/2
- Treatment: Subtle border or shadow for definition
- Placement: Top of country information card

**Optional Decorative Elements**:
- Simple world map silhouette on initial welcome screen (SVG, muted opacity)
- Globe icon in primary CTA button
- Flag icons for previously explored countries (breadcrumb trail)

---

## Mobile Optimization

- Stack all grid layouts to single column below md breakpoint
- Reduce text sizes appropriately (text-3xl → text-2xl for headings)
- Touch-friendly button sizes (minimum 44x44px)
- Map remains interactive with touch gestures
- Sticky header with compact layout
- Bottom padding for comfortable thumb reach (pb-8)