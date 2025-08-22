# StoryMagic Wireframes & Screen Designs

## Screen Specifications Overview
All wireframes follow the "Evening Sanctuary Design" principle with:
- Large touch targets (minimum 44px)
- High contrast for tired eyes
- Minimal cognitive load
- One-handed operation support
- Immediate visual feedback

## 1. Welcome Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [Status Bar - System]              │
├─────────────────────────────────────┤
│                                     │
│    🌙 StoryMagic                   │
│    Good evening, Sarah              │ ← Personalized greeting
│                                     │
│  ┌─────────────────────────────────┐ │
│  │     Recent Stories              │ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐      │ │
│  │  │Emma │ │Alex │ │Emma │      │ │ ← Story cards (160x120px)
│  │  │Space│ │Pet  │ │Magic│      │ │
│  │  │ 🚀  │ │ 🐕  │ │ ✨  │      │ │
│  │  └─────┘ └─────┘ └─────┘      │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │     Create New Story            │ │ ← Primary CTA (64px height)
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │     Story Library               │ │ ← Secondary action
│  └─────────────────────────────────┘ │
│                                     │
│    [Profile] [Settings] [Help]      │ ← Bottom utility nav
└─────────────────────────────────────┘
```

### Design Specifications
- **Header**: Soft midnight blue (#2C3E50) with greeting text
- **Story Cards**: Rounded corners (12px), shadow for depth
- **Create New Story Button**: Warm lavender (#9B59B6), prominent placement
- **Typography**: Display (28px) for greeting, Headline (22px) for buttons
- **Spacing**: 20px margins, 16px between elements

### Interaction States
- **Story Cards**: Slight scale (1.02x) on touch, navigate to story reader
- **Create Button**: Press state with slight opacity (0.8), haptic feedback
- **Library Button**: Subdued press state, secondary navigation

## 2. Child Profile Selection Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [← Back]  Select Child  [+ Add]    │ ← Header with navigation
├─────────────────────────────────────┤
│                                     │
│   Step 1 of 3: Choose your child    │ ← Progress indicator
│   ●●○○○                            │
│                                     │
│  ┌─────────┐     ┌─────────┐       │
│  │   👧    │     │   👦    │       │ ← Child profile cards
│  │  Emma   │     │  Alex   │       │   (180x200px each)
│  │  Age 5  │     │  Age 7  │       │
│  │ Animals │     │ Sports  │       │ ← Key interests
│  │Favorite │     │         │       │
│  └─────────┘     └─────────┘       │
│                                     │
│  ┌─────────┐     ┌─────────┐       │
│  │    +    │     │         │       │ ← Add new profile option
│  │Add New  │     │         │       │
│  │ Child   │     │         │       │
│  └─────────┘     └─────────┘       │
│                                     │
│                                     │
│              [Continue]             │ ← Disabled until selection
└─────────────────────────────────────┘
```

### Design Specifications
- **Profile Cards**: Selected state with lavender border (3px)
- **Avatar Images**: Circular, 80px diameter within card
- **Card Layout**: 2-column grid with 16px gutters
- **Add New Card**: Dashed border, plus icon (32px)
- **Continue Button**: Only enabled after selection, full-width

### Interaction Patterns
- **Single Selection**: Radio button behavior, clear visual selection
- **Card Animation**: Gentle bounce on selection (200ms)
- **Add New Flow**: Modal/sheet for profile creation
- **Error Handling**: Minimum one profile required to continue

## 3. Theme Selection Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [← Back]  Choose Theme  [Skip]     │
├─────────────────────────────────────┤
│                                     │
│   Step 2 of 3: Pick a theme         │
│   ●●●○○                            │
│                                     │
│  ┌─────────┐     ┌─────────┐       │
│  │   🏰    │     │   🐕    │       │ ← Theme cards (120x120px)
│  │Adventure│     │Animals  │       │
│  └─────────┘     └─────────┘       │
│                                     │
│  ┌─────────┐     ┌─────────┐       │
│  │   👑    │     │   🚀    │       │
│  │Princess │     │ Space   │       │
│  └─────────┘     └─────────┘       │
│                                     │
│  ┌─────────┐     ┌─────────┐       │
│  │   💫    │     │   👫    │       │
│  │ Magic   │     │Friendship│      │
│  └─────────┘     └─────────┘       │
│                                     │
│              [Continue]             │
└─────────────────────────────────────┘
```

### Design Specifications
- **Theme Cards**: Large illustrated icons (48px), theme name below
- **Selected State**: Solid lavender background, white text
- **Grid Layout**: 2x3 grid, equal spacing (12px gaps)
- **Icons**: Custom illustrations matching theme (Adventure=castle, etc.)
- **Age Filtering**: Some themes hidden for younger children

### Accessibility Features
- **High Contrast**: Icons with thick outlines for visibility
- **Text Labels**: Always visible, not icon-only
- **Touch Targets**: Full 120px card area is tappable
- **Screen Reader**: Descriptive labels for each theme

## 4. Personalization Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [← Back]  Personalize  [Generate]  │
├─────────────────────────────────────┤
│                                     │
│   Step 3 of 3: Make it special      │
│   ●●●●●                            │
│                                     │
│   For Emma's Space Adventure:       │ ← Context reminder
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Favorite Color                  │ │ ← Dropdown/picker
│  │ Purple        [▼]              │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Pet Name (optional)             │ │ ← Optional text input
│  │ [                    ]          │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Special Detail (optional)       │ │ ← Optional text input
│  │ [                    ]          │ │
│  └─────────────────────────────────┘ │
│                                     │
│   All fields are optional.          │ ← Reassurance text
│   Emma will be the hero either way! │
│                                     │
│         [Generate Story]            │ ← Primary action
└─────────────────────────────────────┘
```

### Design Specifications
- **Form Fields**: 52px height for easy targeting, 16px internal padding
- **Optional Labels**: Clearly marked, lighter text color (#6C757D)
- **Dropdown**: Native iOS/Android picker for familiar interaction
- **Reassurance Text**: Body font (18px), friendly tone
- **Generate Button**: Coral accent color (#E74C3C), prominent

### Smart Defaults & Suggestions
- **Color Picker**: Common favorites (Pink, Blue, Purple, Green, Red)
- **Pet Suggestions**: Based on Polish preferences (dog names, cat names)
- **Auto-complete**: For common hobbies/interests from profile
- **Pre-filling**: Use profile data where available

## 5. Story Generation & Loading Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [× Cancel]     Generating...       │
├─────────────────────────────────────┤
│                                     │
│                                     │
│         ✨ Creating Emma's          │
│         Space Adventure...          │ ← Personalized message
│                                     │
│    ┌─────────────────────────────┐  │
│    │████████████░░░░░░░░░░░░░░░│  │ ← Progress bar
│    └─────────────────────────────┘  │
│                                     │
│         Almost ready! 🚀           │ ← Encouraging message
│                                     │
│    This usually takes 10-20 seconds │ ← Time expectation
│                                     │
│                                     │
│                                     │
│    [Try a Quick Story Instead]      │ ← Fallback option
│                                     │
└─────────────────────────────────────┘
```

### Loading States & Timing
- **0-10 seconds**: "Creating your story..." with progress animation
- **10-20 seconds**: "Almost ready!" with encouraging emoji
- **20-30 seconds**: "Taking a bit longer than usual..." with fallback option
- **30+ seconds**: Show error state with retry and fallback options

### Micro-Animations
- **Progress Bar**: Smooth fill animation, not discrete jumps
- **Sparkle Effects**: Subtle floating sparkles around text
- **Heartbeat**: Gentle scale animation on main message (1x to 1.05x)

## 6. Story Reader Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [× Close]   Emma's Space Adventure │ ← Story title header
├─────────────────────────────────────┤
│  ████████████████░░░░░░░░░░░░░░ 65% │ ← Reading progress
├─────────────────────────────────────┤
│                                     │
│   Emma put on her shiny purple      │
│   spacesuit and climbed into her    │ ← Story text (18px)
│   rocket ship. Her pet hamster      │   Line height: 24px
│   Fluffy was coming along on this   │   Margin: 24px
│   amazing adventure to the Moon!    │
│                                     │
│   "Are you ready, Fluffy?" Emma     │
│   asked as she pressed the big red  │
│   launch button. The rocket began   │
│   to shake and rumble...            │
│                                     │
│   [Next Page: The Moon Landing]     │ ← Page break indicator
│                                     │
├─────────────────────────────────────┤
│  [♡ Save] [← Prev] [Next →] [⋯ More]│ ← Action bar
└─────────────────────────────────────┘
```

### Typography Specifications
- **Story Text**: 18px regular, high contrast (#2C3E50 on #F8F9FA)
- **Line Height**: 1.6 for comfortable reading aloud
- **Paragraph Spacing**: 20px between paragraphs
- **Page Length**: 3-4 paragraphs maximum per page
- **Font**: System font for performance and familiarity

### Reading Features
- **Auto-Save Progress**: Remembers reading position
- **Page Indicators**: Clear breaks for pacing
- **Large Touch Zones**: Navigation arrows extend to screen edges
- **Night Mode**: Optional dark theme for dim lighting

## 7. Story Library Screen

### Layout Structure
```
┌─────────────────────────────────────┐
│  [← Back]   Story Library  [Search] │
├─────────────────────────────────────┤
│                                     │
│  [All] [Favorites] [Emma] [Alex]    │ ← Filter tabs
│                                     │
│  Recent Stories                     │ ← Section header
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Emma │ │Alex │ │Emma │           │ ← Story grid
│  │Space│ │Pet  │ │Magic│           │   (3 columns)
│  │ 🚀  │ │ 🐕  │ │ ✨  │           │
│  │Aug21│ │Aug20│ │Aug19│           │
│  │ ♡   │ │     │ │ ♡   │           │ ← Favorite indicators
│  └─────┘ └─────┘ └─────┘           │
│                                     │
│  Older Stories                      │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Alex │ │Emma │ │Alex │           │
│  │Ocean│ │Farm │ │Hero │           │
│  │ 🌊  │ │ 🐄  │ │ ⚔️   │           │
│  │Aug15│ │Aug12│ │Aug10│           │
│  │     │ │ ♡   │ │     │           │
│  └─────┘ └─────┘ └─────┘           │
└─────────────────────────────────────┘
```

### Organization Features
- **Filter Tabs**: Horizontal scrolling for multiple children
- **Sort Options**: Recent, Favorites, A-Z, by child
- **Search**: Real-time filtering by title or content
- **Infinite Scroll**: Load more stories as user scrolls
- **Offline Indicators**: Cloud icon for stories not cached locally

## Design System Integration

### Color Application
- **Primary Actions**: Soft midnight blue (#2C3E50)
- **Child Elements**: Warm lavender (#9B59B6)
- **Save/Favorite**: Gentle coral (#E74C3C)
- **Backgrounds**: Light gray scale (#F8F9FA to #E9ECEF)
- **Text Hierarchy**: Dark gray (#2C3E50) to light gray (#6C757D)

### Component Consistency
- **Touch Targets**: All interactive elements minimum 44px
- **Rounded Corners**: 12px for cards, 8px for buttons, 24px for primary CTAs
- **Shadows**: Subtle elevation (0 2px 8px rgba(0,0,0,0.1))
- **Animations**: 200-300ms timing for responsive feel
- **Loading States**: Skeleton screens, progress indicators, spinners

### Responsive Considerations
- **Small Phones (320px)**: Single column layouts, larger touch targets
- **Large Phones (414px+)**: Wider cards, more content per screen
- **Safe Areas**: Respect iPhone notch and Android gesture areas
- **Landscape**: Maintain usability but optimize for portrait use

This wireframe specification provides the foundation for implementing the "Evening Sanctuary Design" principle while ensuring the app remains highly functional and accessible for exhausted parents during bedtime routines.