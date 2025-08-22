# StoryMagic User Flow Diagrams

## Primary User Journey: Complete Story Creation Flow

### High-Level User Journey
```
[Parent Opens App] → [Welcome Screen] → [Create New Story] → [Select Child Profile] → [Choose Theme] → [Add Personalization] → [Generate Story] → [Read Story] → [Save/Favorite] → [Return to Library]
```

## Detailed User Flow: Core 3-Step Story Creation

### Flow 1: First-Time User - Complete Onboarding
```
START: App Launch (First Time)
├── Welcome/Onboarding Screen
│   ├── "Create your first child profile" CTA
│   └── Skip to sample stories (optional)
├── Child Profile Creation
│   ├── Enter child's name
│   ├── Select age (3-8)
│   ├── Choose avatar/photo
│   ├── Select 3-5 interests (animals, sports, etc.)
│   └── Save profile
├── First Story Creation
│   ├── Auto-select created child profile
│   ├── Theme Selection Screen
│   │   ├── 6 main themes displayed (2x3 grid)
│   │   ├── Adventure, Animals, Princess/Prince, Space, Friendship, Magic
│   │   └── Select theme → Continue
│   ├── Personalization Screen
│   │   ├── Favorite color (dropdown/picker)
│   │   ├── Pet name (optional text input)
│   │   ├── Special hobby/interest (optional)
│   │   └── Generate Story button
│   └── Story Generation & Display
│       ├── Loading state (max 30 seconds)
│       ├── Story display with clean reading interface
│       ├── Reading progress indicator
│       └── Save/Favorite actions
END: Return to Welcome Screen with saved story
```

### Flow 2: Returning User - Quick Story Creation
```
START: App Launch (Returning User)
├── Welcome Screen
│   ├── Recent stories (2-3 cards)
│   ├── Quick access to favorite stories
│   └── "Create New Story" button
├── Create New Story
│   ├── Child Profile Selection
│   │   ├── Visual grid of existing profiles
│   │   ├── "Add new child" option
│   │   └── Select profile → Continue
│   ├── Theme Selection (same as Flow 1)
│   ├── Personalization (pre-filled with profile data)
│   └── Story Generation
END: Story saved to library
```

### Flow 3: Emergency/Offline Access
```
START: No internet connection detected
├── Welcome Screen
│   ├── Offline indicator visible
│   ├── Access to previously saved stories only
│   └── "Saved Stories" highlighted
├── Story Library (Offline Mode)
│   ├── Filter: "Available Offline" (default)
│   ├── Grid of cached stories
│   └── Select story → Read immediately
END: Reading offline story
```

## Secondary User Flows

### Profile Management Flow
```
Settings → Child Profiles → [Select Profile] → Edit/Delete/Add New
├── Edit Profile
│   ├── Update name, age, interests
│   ├── Change avatar
│   └── Save changes
├── Delete Profile
│   ├── Confirmation dialog
│   └── Remove all associated stories warning
└── Add New Profile (same as first-time creation)
```

### Story Library Management Flow
```
Welcome → Story Library → [Browse/Search/Filter]
├── Browse All Stories
│   ├── Grid view with story cards
│   ├── Sort by: Recent, Favorites, Child, Theme
│   └── Infinite scroll or pagination
├── Search Stories
│   ├── Search by title, child name, or content keywords
│   └── Real-time results filtering
├── Filter Stories
│   ├── By child profile
│   ├── By theme
│   ├── By date range
│   └── Favorites only
└── Story Actions
    ├── Read story
    ├── Toggle favorite
    ├── Share story
    └── Delete story
```

## Error Handling Flows

### Story Generation Failure
```
Story Generation → Error Occurs
├── Network Error
│   ├── Show retry button
│   ├── Offer offline story alternatives
│   └── Cache personalization data for retry
├── Content Safety Failure
│   ├── Auto-retry with modified prompt
│   ├── Fallback to pre-approved story
│   └── No error shown to user
└── API Timeout (>30 seconds)
    ├── Show "Taking longer than usual" message
    ├── Offer to continue waiting or try again
    └── Suggest pre-generated story alternative
```

### Profile Management Errors
```
Profile Actions → Error Occurs
├── Network Error During Save
│   ├── Save locally first
│   ├── Sync when connection restored
│   └── Show "Saved locally" confirmation
└── Profile Deletion with Saved Stories
    ├── Warning dialog: "X stories will be moved to 'Unknown Child'"
    ├── Option to reassign stories to another profile
    └── Confirm deletion
```

## User Flow Decision Points

### Critical Decision Points for Parents
1. **Child Profile Selection**: Must be instant visual recognition (photos/avatars)
2. **Theme Selection**: Large, illustrated cards for tired-finger navigation
3. **Personalization Depth**: Optional fields to prevent decision fatigue
4. **Story Length**: Auto-determined by child's age, no user choice needed
5. **Save Decision**: Prominent but not intrusive during story reading

### Flow Optimization for "Evening Sanctuary Design"
- **Maximum 3 taps** from welcome to story generation
- **No mandatory text input** in critical path (all optional)
- **Large touch targets** (minimum 44px) for accuracy
- **Instant visual feedback** on all selections
- **Auto-save progress** if flow is interrupted
- **Graceful degradation** when network/AI fails

## Flow Timing Expectations
- **Profile Selection**: < 5 seconds
- **Theme Selection**: < 10 seconds  
- **Personalization**: < 15 seconds (all optional)
- **Story Generation**: < 30 seconds (hard requirement)
- **Total Flow Time**: < 60 seconds from app open to story ready

## Analytics & Optimization Points
Key metrics to track for flow optimization:
- Drop-off rates at each step
- Time spent on personalization screen
- Retry rates for failed generations
- Return usage patterns (quick access vs. new creation)
- Profile creation completion rates