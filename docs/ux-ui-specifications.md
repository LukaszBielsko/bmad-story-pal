# StoryMagic UI Specifications & Design System Implementation

## Evening Sanctuary Design Principles

### Core Design Philosophy
The "Evening Sanctuary Design" creates a calming, intuitive experience optimized for cognitively depleted parents during bedtime routines. Every design decision prioritizes:

1. **Cognitive Load Reduction**: Minimal choices, clear hierarchy, familiar patterns
2. **Physical Accessibility**: Large touch targets, one-handed operation, tired-finger forgiveness
3. **Emotional Comfort**: Calming colors, gentle animations, reassuring messaging
4. **Reliability**: Consistent interactions, predictable outcomes, graceful error handling

## Extended Design System

### Color Palette & Usage

#### Primary Colors
```
Soft Midnight Blue (#2C3E50)
├── Usage: Primary navigation, headers, main CTAs
├── Accessibility: AAA contrast on white backgrounds
├── Psychology: Trustworthy, calming, professional
└── States: 
    ├── Hover: #34495E (10% lighter)
    ├── Active: #1B2631 (20% darker)
    └── Disabled: #5D6D7E (40% opacity)
```

#### Secondary Colors
```
Warm Lavender (#9B59B6)
├── Usage: Child-focused elements, profile cards, theme selections
├── Accessibility: AA contrast on white, AAA on light gray
├── Psychology: Playful, magical, child-friendly
└── States:
    ├── Hover: #A569BD (5% lighter)
    ├── Active: #8E44AD (15% darker)
    └── Disabled: #D7BDE2 (50% opacity)
```

#### Accent Colors
```
Gentle Coral (#E74C3C)
├── Usage: Save/favorite actions, important alerts
├── Accessibility: AA contrast on white backgrounds
├── Psychology: Warmth, attention, positive action
└── States:
    ├── Hover: #EC7063 (10% lighter)
    ├── Active: #CB4335 (15% darker)
    └── Disabled: #F1948A (50% opacity)
```

#### Neutral Gray Scale
```
Background Hierarchy:
├── Pure White (#FFFFFF) - Main content backgrounds
├── Soft Gray (#F8F9FA) - Card backgrounds, subtle containers
├── Light Gray (#E9ECEF) - Borders, dividers, inactive states
├── Medium Gray (#6C757D) - Secondary text, captions
├── Dark Gray (#495057) - Body text
└── Charcoal (#2C3E50) - Headlines, primary text
```

#### Semantic Colors
```
Success: Muted Green (#27AE60)
├── Usage: Successful story generation, save confirmations
└── States: Hover #2ECC71, Active #229954

Warning: Soft Orange (#F39C12)
├── Usage: Loading states, network issues
└── States: Hover #F5B041, Active #D68910

Error: Gentle Red (#E67E22)
├── Usage: Generation failures, validation errors
└── States: Hover #EB984E, Active #CA6F1E
```

### Typography Implementation

#### Font Stack
```css
/* iOS */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text';

/* Android */
font-family: 'Roboto', 'Noto Sans', sans-serif;

/* Fallback */
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Type Scale & Usage
```
Display (28px / 1.2 line-height / 700 weight)
├── Usage: Welcome greetings, section headers
├── Color: Charcoal (#2C3E50)
├── Letter-spacing: -0.02em (tighter tracking)
└── Responsive: 24px on small screens (<375px)

Headline (22px / 1.3 line-height / 600 weight)
├── Usage: Story titles, main CTAs, step headers
├── Color: Charcoal (#2C3E50) or Lavender (#9B59B6)
├── Letter-spacing: -0.01em
└── Responsive: 20px on small screens

Body (18px / 1.6 line-height / 400 weight)
├── Usage: Story text, form labels, descriptions
├── Color: Dark Gray (#495057)
├── Letter-spacing: 0 (normal)
└── Responsive: 16px on small screens with 1.5 line-height

Caption (14px / 1.4 line-height / 400 weight)
├── Usage: Metadata, timestamps, helper text
├── Color: Medium Gray (#6C757D)
├── Letter-spacing: 0.01em (slightly open)
└── Responsive: Remains 14px (minimum readable size)
```

### Component Library

#### 1. StoryCard Component
```
Dimensions: 160x120px (2:3 aspect ratio for optimal thumb reach)
Border Radius: 12px
Background: Soft Gray (#F8F9FA)
Shadow: 0 2px 8px rgba(44, 62, 80, 0.1)
Border: 2px solid transparent (for selection states)

Content Layout:
├── Icon Area: 48x48px centered icon, top 16px
├── Title: Headline font, 2 lines max, ellipsis overflow
├── Child Name: Caption font, single line
├── Date: Caption font, bottom 8px
└── Favorite Icon: 16x16px heart, top-right corner (8px padding)

States:
├── Default: Base styling
├── Hover: Scale 1.02x, shadow increases to 0 4px 12px
├── Selected: Lavender border (#9B59B6), background tint
└── Loading: Skeleton animation with shimmer effect
```

#### 2. ThemeSelector Component
```
Dimensions: 120x120px (square for grid layout)
Border Radius: 16px (more playful than story cards)
Background: White (#FFFFFF)
Shadow: 0 2px 6px rgba(44, 62, 80, 0.08)

Content Layout:
├── Icon: 64x64px illustrated theme icon, centered
├── Label: Headline font (20px), single line, centered
└── Selection Ring: 3px border when selected

Grid Layout:
├── Columns: 2 (with 16px gutter)
├── Rows: 3 (accommodates 6 main themes)
├── Container Padding: 20px horizontal, 16px vertical
└── Scroll: Vertical if more themes added

States:
├── Default: White background, subtle shadow
├── Hover: Slight scale (1.05x), shadow increases
├── Selected: Lavender background, white text/icon
└── Disabled: 40% opacity, no interaction
```

#### 3. ProfileCard Component
```
Dimensions: 180x200px (optimized for avatar + text)
Border Radius: 16px
Background: Soft Gray (#F8F9FA)
Shadow: 0 3px 10px rgba(44, 62, 80, 0.12)

Content Layout:
├── Avatar: 80x80px circular image, top center (20px from top)
├── Name: Headline font, single line, 16px below avatar
├── Age: Caption font, "Age X" format
├── Interests: Body font, 2 lines max, ellipsis
└── Selected Indicator: Checkmark in top-right corner

Layout Grid:
├── Columns: 2 on most phones, 3 on larger devices (>400px)
├── Gutters: 16px horizontal, 20px vertical
├── Add New Card: Same size, dashed border, plus icon
└── Scroll: Horizontal if more than 6 profiles

States:
├── Default: Subtle shadow, neutral colors
├── Selected: Coral border (#E74C3C), slight scale (1.03x)
├── Hover: Scale 1.02x, shadow increases
└── Add New: Dashed Lavender border, plus icon (32px)
```

#### 4. FormField Component
```
Dimensions: Full width, 52px height (optimal for thumb targeting)
Border Radius: 8px
Background: White (#FFFFFF)
Border: 2px solid Light Gray (#E9ECEF)

Content Layout:
├── Label: Caption font, outside field (8px above)
├── Input: Body font (18px), 16px horizontal padding
├── Placeholder: Medium Gray (#6C757D), italic
└── Optional Badge: "Optional" in smaller caption font

States:
├── Default: Light gray border
├── Focus: Lavender border (#9B59B6), no outline
├── Filled: Charcoal text (#2C3E50)
├── Error: Gentle red border (#E67E22)
└── Disabled: Light gray background, darker border

Input Types:
├── Text: Standard text input with auto-capitalization
├── Dropdown: Native picker with down arrow icon
├── Number: Numeric keypad on mobile
└── Optional: Clear visual indication, never required
```

#### 5. Button Components

##### Primary Button
```
Dimensions: Full width, 48px height (minimum touch target)
Border Radius: 24px (pill shape for friendly feel)
Background: Midnight Blue (#2C3E50)
Typography: Headline font (20px), white color, medium weight

States:
├── Default: Solid background, white text
├── Hover: 10% lighter background (#34495E)
├── Active: 20% darker background (#1B2631)
├── Loading: Spinner animation, "Creating..." text
└── Disabled: 40% opacity, no interaction

Usage: Main CTAs (Generate Story, Continue, Save)
```

##### Secondary Button
```
Dimensions: Full width, 44px height
Border Radius: 8px (less prominent than primary)
Background: Transparent
Border: 2px solid Midnight Blue (#2C3E50)
Typography: Headline font (18px), Midnight Blue color

States:
├── Default: Outlined style
├── Hover: Light background tint (5% blue)
├── Active: Medium background tint (10% blue)
└── Disabled: 40% opacity border and text

Usage: Secondary actions (Back, Cancel, Library)
```

##### Icon Button
```
Dimensions: 44x44px (minimum accessible size)
Border Radius: 22px (circular)
Background: Varies by context
Icon: 24x24px, centered

Variants:
├── Heart/Favorite: Coral background (#E74C3C), white heart
├── Close/Back: Light gray background, dark icon
├── More/Menu: Transparent background, medium gray icon
└── Add: Lavender background (#9B59B6), white plus

States: Standard hover/active with scale animations
```

### Layout System

#### Grid System
```
Mobile-First Breakpoints:
├── Small: 320px - 374px (iPhone SE, older Android)
├── Medium: 375px - 413px (iPhone 12/13/14, standard Android)
├── Large: 414px+ (iPhone Plus/Pro Max, large Android)

Container Widths:
├── Small: 100% width, 16px horizontal padding
├── Medium: 100% width, 20px horizontal padding  
├── Large: 100% width, 24px horizontal padding

Grid Columns:
├── Small: 1-2 columns maximum
├── Medium: 2-3 columns for cards
├── Large: 3 columns maximum (avoid complexity)
```

#### Spacing Scale
```
Micro: 4px   - Icon margins, border widths
Small: 8px   - Element padding, tight spacing
Base: 16px   - Standard margins, card gutters
Large: 24px  - Section spacing, page margins
XL: 32px     - Major section breaks
XXL: 48px    - Page-level spacing
```

#### Safe Areas & Notches
```
iOS Safe Areas:
├── Top: 44px (status bar) + 44px (notch on newer phones)
├── Bottom: 34px (home indicator) on newer phones
├── Sides: 0px (but respect dynamic island on iPhone 14 Pro)

Android System UI:
├── Top: 24px (status bar), can vary by device
├── Bottom: 48px (navigation bar) if using 3-button nav
├── Gesture Areas: 16px bottom margin for gesture navigation

Implementation:
├── Use safe-area-inset-* in CSS
├── React Native SafeAreaView for automatic handling
├── Minimum 16px margin from screen edges on all content
```

### Animation & Micro-Interactions

#### Timing Functions
```css
/* Standard easing for most interactions */
ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94)

/* Bouncy feel for playful elements */
ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)

/* Gentle ease for loading states */
ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1)
```

#### Animation Durations
```
Fast: 150ms      - Hover states, button presses
Standard: 200ms  - Card selections, modal openings
Medium: 300ms    - Page transitions, complex animations
Slow: 500ms      - Loading states, success confirmations
```

#### Micro-Animation Specifications

##### Card Selection Animation
```css
/* Scale up slightly with shadow increase */
transform: scale(1.02);
box-shadow: 0 6px 20px rgba(44, 62, 80, 0.15);
transition: all 200ms ease-out;
```

##### Button Press Feedback
```css
/* Slight scale down with haptic feedback */
transform: scale(0.98);
transition: transform 150ms ease-out;
/* Add haptic feedback via React Native Haptics API */
```

##### Loading Spinner
```css
/* Gentle rotation for story generation */
@keyframes spinner {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
animation: spinner 1.5s linear infinite;
```

##### Page Transition
```css
/* Slide in from right, slide out to left */
.page-enter {
  transform: translateX(100%);
  opacity: 0;
}
.page-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 300ms ease-out;
}
```

### Dark Mode Considerations
While not in MVP scope, the design system accommodates future dark mode:

```
Dark Mode Palette:
├── Background: Dark Navy (#1A1D23)
├── Surface: Charcoal (#2C3E50)
├── Primary: Light Lavender (#C8A2C8)
├── Text: Light Gray (#E9ECEF)
└── Accent: Soft Coral (#FF6B6B)

Implementation Strategy:
├── CSS Custom Properties for easy theme switching
├── Separate color tokens for light/dark modes
├── Test readability with blue light filters
└── Maintain WCAG AA contrast in both modes
```

This comprehensive UI specification ensures consistent implementation of the Evening Sanctuary Design principle while maintaining high usability standards for exhausted parents during bedtime routines.