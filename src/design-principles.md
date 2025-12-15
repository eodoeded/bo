# Branded Objects Design System
## Visual Language & Design Principles

### Core Philosophy
**"Technical Precision, Organic Flow"** — A design system that balances rigid governance with fluid, human interaction. Every component reflects the product's core promise: strict rules, safe execution.

---

## 1. Visual Hierarchy Rules

### Depth & Layering
- **Background Layer**: `#261E19` (fixed, never scrolls behind)
- **Card Layer**: `#1A1614` with `border-white/10` (elevated, floating)
- **Interactive Layer**: Hover states reveal `#E3E3FD` glow
- **Overlay Layer**: Backdrop blur for navigation, modals

**Rule**: Never use more than 3 visible layers at once. Cards float above background, interactive elements glow above cards.

### Typography Hierarchy
- **Display**: PP Neue Montreal Medium — Hero text, major headlines (text-6xl to text-8xl)
- **Headings**: PP Neue Montreal Medium — Section headers (text-3xl to text-5xl)
- **Body**: PP Neue Montreal Book — Content, descriptions (text-base to text-xl)
- **Labels**: SF Mono — Technical labels, badges, system text (text-[9px] to text-xs)
- **Captions**: SF Mono uppercase — Metadata, timestamps (text-[8px] to text-[10px])

**Rule**: Mono font = system/technical. Display font = human/content. Never mix them in the same text block.

---

## 2. Color Usage Rules

### The Three-Color System
1. **Background** (`#261E19`) — The canvas. Never changes, always present.
2. **Signal** (`#E3E3FD`) — Interactive states, status, active elements. Use sparingly.
3. **Ink** (`#FFFFFF`) — Primary text. Use opacity for hierarchy: `white` (primary), `white/70` (secondary), `white/40` (tertiary).

### Lavender Signal Rules
- ✅ Use for: Active states, hover borders, status indicators, interactive feedback
- ❌ Don't use for: Backgrounds, large text blocks, decorative elements
- **Maximum usage**: 10% of any view should be lavender. It's a signal, not a color.

### Border System
- `border-white/10` — Default card/component borders
- `border-white/5` — Subtle dividers, internal separators
- `border-[#E3E3FD]/50` — Hover state (interactive elements only)
- `border-[#E3E3FD]/20` — Active/selected state

**Rule**: Borders are always subtle. Never use full opacity white borders.

---

## 3. Spacing & Rhythm

### Vertical Rhythm
- **Section spacing**: `py-20 md:py-32` (consistent breathing room)
- **Card padding**: `p-8 md:p-10` (generous, premium feel)
- **Internal spacing**: `gap-6` for grids, `space-y-6` for stacks
- **Content max-width**: `1400px` (never wider, maintains readability)

### Horizontal Rhythm
- **Container padding**: `px-6 md:px-12` (consistent margins)
- **Grid gaps**: `gap-6` (cards), `gap-4` (form elements), `gap-2` (tight groups)

**Rule**: Use 4px base unit. All spacing should be multiples of 4px (4, 8, 12, 16, 20, 24, 32).

---

## 4. Border Radius System

### Radius Hierarchy
- `rounded-lg` (8px) — Small elements, inputs, badges
- `rounded-2xl` (16px) — Icon containers, small cards, nodes
- `rounded-3xl` (24px) — Main cards, panels, major components
- `rounded-full` — Pills, status dots, circular icons

**Rule**: Larger components = larger radius. Cards always `rounded-3xl`. Never use sharp corners (`rounded-none`).

---

## 5. Interactive States

### Hover Pattern
1. **Border glow**: `hover:border-[#E3E3FD]/50`
2. **Background shift**: `hover:bg-[#2E2824]` (subtle, not dramatic)
3. **Icon color**: `hover:text-[#E3E3FD]` (for icon containers)
4. **Transition**: `transition-colors duration-300` (smooth, never jarring)

### Active/Selected Pattern
- Background: `bg-[#E3E3FD]/10`
- Border: `border-[#E3E3FD]/50`
- Text: `text-[#E3E3FD]` or `text-white`

**Rule**: Every interactive element must have a hover state. Never leave users guessing.

---

## 6. Card Component Rules

### Standard Card Structure
```jsx
<div className="bg-[#1A1614] border border-white/10 p-8 md:p-10 
                hover:border-[#E3E3FD]/50 hover:bg-[#2E2824] 
                transition-colors rounded-3xl relative group">
  {/* Icon Container */}
  <div className="w-14 h-14 border border-white/10 bg-white/5 
                  flex items-center justify-center mb-8 
                  group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
    <Icon size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
  </div>
  
  {/* Content */}
  {/* Badge/Label */}
  {/* Title */}
  {/* Description */}
</div>
```

**Rule**: All cards follow this pattern. Icon container always `w-14 h-14 rounded-2xl`. Content always has proper hierarchy.

---

## 7. Node & Connection Language

### Node Rules
- **Default nodes**: `rounded-2xl`, ports are circular (`rounded-full`)
- **Minimal nodes**: Smaller, simpler, for final outputs
- **Connections**: Curved (Bezier), not straight lines. Organic flow.
- **Active state**: Lavender glow, pulse animation

**Rule**: Nodes represent the system. Connections show flow. Always animate connections to show data movement.

---

## 8. Typography Contrast Rules

### Text Opacity Hierarchy
- `text-white` — Primary content, headings
- `text-white/70` — Secondary content, descriptions
- `text-white/60` — Tertiary content, metadata
- `text-white/40` — Captions, labels, disabled states
- `text-white/20` — Placeholders, subtle hints

**Rule**: Never use `text-white/10` or lower for readable text. If it's not readable, it shouldn't be text.

---

## 9. Animation & Motion

### Animation Principles
- **Duration**: 300ms for hovers, 500-800ms for page transitions
- **Easing**: `ease-in-out` for most, `ease-out` for entrances
- **Floating**: Subtle `y: [0, -4, 0]` for nodes, 6s duration
- **Pulse**: Status indicators use `animate-pulse` with lavender glow

**Rule**: Animations should feel organic, not mechanical. Slow and smooth, never snappy.

---

## 10. Studio-Specific Rules

### Tool Builder Aesthetic
- **Sidebars**: `bg-[#1A1614]` with `border-white/10`
- **Canvas**: `bg-[#0A0A0A]` (deepest background) with subtle grid
- **Toolbar**: Fixed, slim, `h-12`, matches nav height
- **Property controls**: Always show lock state (LOCKED/READ_ONLY/CLIENT_INPUT)

**Rule**: Studio views are denser, more technical. Still follow the same color/border system, but tighter spacing.

---

## 11. Background Pattern Rules

### Pattern Usage
- **Radial gradient dots**: `opacity-[0.03]` — Subtle, never distracting
- **Grid patterns**: `opacity-[0.02]` to `opacity-[0.05]` — Technical feel
- **Noise overlays**: `opacity-[0.05]` — Texture, never visible as pattern

**Rule**: Background patterns should be felt, not seen. If you notice them, they're too strong.

---

## 12. Icon Container Standard

### Icon Container Pattern
```jsx
<div className="w-14 h-14 border border-white/10 bg-white/5 
                flex items-center justify-center 
                group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
  <Icon size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
</div>
```

**Rule**: All icons live in containers. Never use bare icons. Container size: `w-14 h-14` (large), `w-12 h-12` (medium), `w-8 h-8` (small).

---

## 13. Badge & Label System

### Badge Types
- **System badges**: `font-mono text-[9px] uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full`
- **Status badges**: Live (lavender), Draft (white/40)
- **Labels**: Always mono, always uppercase, always `tracking-widest`

**Rule**: Badges are technical metadata. Always mono font, always small, always subtle.

---

## 14. What to Push Forward

### Visual Refinements Needed
1. **Consistent hover glow**: All interactive elements should have the same lavender glow intensity
2. **Better focus states**: Add visible focus rings for accessibility (lavender outline)
3. **Loading states**: Skeleton screens for cards, spinners for buttons
4. **Error states**: Red accent for errors (but keep it minimal, not breaking the dark theme)
5. **Success states**: Subtle green accent for success (but very subtle)

### Pages That Need Updates
1. **Tool Runner** (`/tool/:id`) — Should match Tool Builder aesthetic
2. **All form inputs** — Should match the email input style (rounded-lg, py-4, better borders)
3. **Mobile navigation** — Could be more premium (slide-in drawer with backdrop)
4. **Footer** — Could be more minimal, less cluttered

### Direction to Push
- **More breathing room**: Increase spacing slightly where it feels cramped
- **Stronger visual hierarchy**: Make headings more distinct from body text
- **Better use of lavender**: Use it more strategically for CTAs and key actions
- **Refined shadows**: Add subtle `shadow-2xl` to cards for more depth
- **Consistent animations**: All cards should have the same entrance animation

---

## 15. Anti-Patterns (What NOT to Do)

❌ **Never use**:
- Full opacity white borders (`border-white`)
- Sharp corners (`rounded-none`)
- Lavender backgrounds (it's a signal, not a color)
- Text smaller than `text-[8px]`
- Spacing that's not a multiple of 4px
- More than 3 font sizes in one component
- Animations faster than 200ms
- Borders thicker than 1px
- Background patterns above `opacity-[0.05]`

---

## 16. Navigation System Rules

### Navigation Component Standards

#### UnifiedNav (Primary Navigation)
- **Height**: `h-12 md:h-14` (48px mobile, 56px desktop)
- **Background**: `bg-[#261E19]` with `border-b border-white/5`
- **Backdrop Blur**: `backdrop-blur-md` for glass effect
- **Position**: `fixed top-0 left-0 w-full z-50`
- **Container**: `max-w-[1400px] mx-auto px-6 md:px-12` (consistent with page padding)

#### Brand/Logo
- **Text**: `font-mono text-sm tracking-widest uppercase` `[ BO ]`
- **Color**: `text-white` with `hover:text-[#E3E3FD]`
- **Transition**: `transition-colors`
- **Always clickable**: Links to home (`/`)

#### Context Indicators
- **Format**: `STUDIO` | `BUILDER` | `BRAND_GUIDELINES`
- **Font**: `font-mono text-[9px] md:text-[10px] uppercase tracking-widest`
- **Color**: `text-[#E3E3FD]` (primary context) or `text-white/60` (secondary)
- **Separator**: `h-4 w-px bg-white/10` between context items
- **Show when**: On studio pages, builder pages, guidelines pages

#### Navigation Links (Landing Page Only)
- **Font**: `font-mono text-[11px] uppercase tracking-widest`
- **Color**: `text-white/60` with `hover:text-white`
- **Underline**: Hover shows `bg-[#E3E3FD]` underline animation
- **Spacing**: `gap-12` between links
- **Position**: Centered absolutely (`absolute left-1/2 -translate-x-1/2`)

#### Action Buttons
- **Primary (CTA)**: `bg-[#E3E3FD] text-[#261E19] px-4 md:px-5 py-2 md:py-2.5 font-mono font-semibold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white transition-colors rounded-lg`
- **Secondary (Text)**: `font-mono text-[9px] md:text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors`
- **Icons**: Size `12px md:14px` for small icons

#### Mobile Navigation
- **Menu Toggle**: Only show on landing page
- **Icon**: `text-white/60 hover:text-white`, size `20px`
- **Drawer**: Slide-in from left, `w-[280px]`, `bg-[#1A1614]` with `border-r border-white/10`
- **Backdrop**: `bg-black/60 backdrop-blur-sm`
- **Menu Items**: `border border-white/5 rounded-lg` with hover states
- **Spacing**: `py-4 px-4` for menu items
- **Close Button**: Top-right in drawer header

#### Navigation Rules by Page Type

**Landing Page (`/`)**
- Logo | Center nav links | Request Access button
- Mobile: Hamburger menu

**Brand Guidelines (`/brand-guidelines`)**
- Logo | BRAND_GUIDELINES context | Back to Home link
- No mobile menu

**Login/SignUp (`/login`, `/signup`)**
- Logo | Back to Home link
- No mobile menu

**Studio Dashboard (`/studio`)**
- Logo | STUDIO context | Sign Out button
- No mobile menu

**Tool Builder (`/studio/builder/:id`)**
- Logo | STUDIO | BUILDER context | Back to Studio (desktop) | Sign Out
- No mobile menu

**Tool Runner (`/tool/:id`)**
- Custom client-branded navigation (different component)
- Follows client's branding settings

### Navigation States

#### Active/Current Page
- **Current route**: Use context indicators, not link highlighting
- **No breadcrumbs needed**: Context indicators serve this purpose

#### Hover States
- **Links**: `hover:text-white` transition
- **Buttons**: `hover:bg-white` (primary) or `hover:bg-white/10` (secondary)
- **Always smooth**: `transition-colors` required

#### Focus States
- **Keyboard navigation**: Visible focus rings (lavender)
- **Focus ring**: `focus:ring-1 focus:ring-[#E3E3FD] focus:outline-none`

### Navigation Hierarchy

```
UnifiedNav
├── Left: Brand/Logo + Context Indicators
├── Center: Navigation Links (landing only)
└── Right: Action Buttons + Menu Toggle (landing only)
```

### Route Structure

**Canonical Routes** (use these):
- `/` - Landing page
- `/brand-guidelines` - Brand guidelines (canonical)
- `/login` - Login page
- `/signup` - Sign up page
- `/studio` - Studio dashboard
- `/studio/builder/:id` - Tool builder
- `/tool/:id` - Tool runner (public)

**Legacy Routes** (redirect to canonical):
- `/designsystem` → `/brand-guidelines`
- `/brandguidelines` → `/brand-guidelines`

### Navigation Best Practices

1. **Consistency**: Always use UnifiedNav component
2. **Context**: Show context indicators for nested routes
3. **Back Navigation**: Provide "Back" links for auth pages and guidelines
4. **Mobile**: Use premium slide-in drawer (not dropdown)
5. **Accessibility**: Keyboard navigation, focus states, ARIA labels
6. **Performance**: Defer auth checks, don't block render

**Rule**: Navigation should feel invisible. Users should never think about it—it should just work.

---

## Summary: The Branded Objects Aesthetic

**Dark, moody, technical, organic.**

Think: A technical manual meets a luxury product. Every element is intentional. Every interaction is smooth. The system is strict, but the experience is fluid.

The lavender signal is your friend—use it to guide attention, not to decorate. The dark brown is your canvas—never fight it, work with it. The mono font is your system voice—technical, precise, trustworthy.

