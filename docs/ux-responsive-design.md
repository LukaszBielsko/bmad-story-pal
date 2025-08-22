# StoryMagic Responsive Design Specifications

## Mobile-First Design Strategy

### Device Categories & Breakpoints
StoryMagic is designed exclusively for mobile devices, with responsive adaptations across the spectrum of phone sizes available in the Polish market.

```
Device Categories (based on Polish smartphone usage data 2024):
├── Compact Phones: 320-374px width (iPhone SE, older Android phones)
├── Standard Phones: 375-413px width (iPhone 12/13/14, Samsung Galaxy A series)
├── Large Phones: 414-428px width (iPhone Pro Max, Samsung Galaxy S series)
└── Extra Large: 429px+ width (Samsung Galaxy Note, foldables when unfolded)

Screen Heights:
├── Short: 568-667px (older iPhones, compact Android)
├── Standard: 668-811px (iPhone 12/13/14)
├── Tall: 812-926px (iPhone Pro Max, modern Android)
└── Extra Tall: 927px+ (Samsung Galaxy S Ultra, foldables)
```

## Responsive Breakpoint System

### CSS Breakpoint Implementation
```css
/* Mobile-first approach with min-width breakpoints */
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

/* Base styles for compact phones (320px+) */
.container {
  padding: 0 16px;
  max-width: 100%;
}

.story-card {
  width: 160px;
  height: 120px;
  margin: 8px;
}

.button-primary {
  height: 48px;
  font-size: 18px;
  padding: 0 16px;
}

/* Standard phones (375px+) */
@media (min-width: 375px) {
  .container {
    padding: 0 20px;
  }
  
  .story-card {
    width: 170px;
    height: 128px;
    margin: 12px;
  }
  
  .button-primary {
    height: 52px;
    font-size: 20px;
    padding: 0 20px;
  }
}

/* Large phones (414px+) */
@media (min-width: 414px) {
  .container {
    padding: 0 24px;
  }
  
  .story-card {
    width: 180px;
    height: 135px;
    margin: 16px;
  }
  
  .grid-three-column {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Extra large phones (429px+) */
@media (min-width: 429px) {
  .container {
    padding: 0 28px;
  }
  
  .hero-section {
    padding: 40px 0;
  }
  
  .story-card {
    width: 190px;
    height: 142px;
  }
}
```

### React Native Responsive Implementation
```javascript
import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device categorization
const DeviceTypes = {
  COMPACT: screenWidth < 375,
  STANDARD: screenWidth >= 375 && screenWidth < 414,
  LARGE: screenWidth >= 414 && screenWidth < 429,
  EXTRA_LARGE: screenWidth >= 429
};

// Responsive value function
const responsiveValue = (compact, standard, large, extraLarge) => {
  if (DeviceTypes.COMPACT) return compact;
  if (DeviceTypes.STANDARD) return standard;
  if (DeviceTypes.LARGE) return large;
  return extraLarge;
};

// Responsive spacing
const ResponsiveSpacing = {
  xs: responsiveValue(4, 4, 6, 8),
  sm: responsiveValue(8, 8, 12, 16),
  md: responsiveValue(16, 16, 20, 24),
  lg: responsiveValue(24, 24, 28, 32),
  xl: responsiveValue(32, 32, 36, 40)
};

// Responsive font sizes
const ResponsiveFonts = {
  caption: responsiveValue(12, 14, 14, 16),
  body: responsiveValue(16, 18, 18, 20),
  headline: responsiveValue(20, 22, 24, 26),
  display: responsiveValue(24, 28, 30, 32)
};

// Responsive component dimensions
const ResponsiveDimensions = {
  storyCard: {
    width: responsiveValue(150, 160, 170, 180),
    height: responsiveValue(110, 120, 128, 135)
  },
  
  profileCard: {
    width: responsiveValue(160, 180, 190, 200),
    height: responsiveValue(180, 200, 210, 220)
  },
  
  themeSelector: {
    width: responsiveValue(110, 120, 130, 140),
    height: responsiveValue(110, 120, 130, 140)
  },
  
  buttonHeight: {
    primary: responsiveValue(44, 48, 52, 56),
    secondary: responsiveValue(40, 44, 48, 52)
  },
  
  touchTarget: {
    minimum: 44, // Never goes below 44px for accessibility
    recommended: responsiveValue(44, 48, 52, 56)
  }
};
```

## Screen-Specific Responsive Layouts

### 1. Welcome Screen Responsive Layout

#### Compact Phones (320-374px)
```
┌─────────────────────────────────────┐
│  Status Bar (20px)                  │
├─────────────────────────────────────┤
│  🌙 StoryMagic (24px font)          │
│  Good evening! (16px)               │ ← Reduced greeting size
│                                     │
│  Recent Stories (Single Row)        │
│  ┌─────┐ ┌─────┐                   │ ← 2 cards only, larger touch
│  │Emma │ │Alex │                   │   targets (150x110px)
│  │Space│ │Pet  │                   │
│  └─────┘ └─────┘                   │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │    Create New Story (44px)      │ │ ← Minimum height
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │    Story Library (40px)         │ │ ← Secondary action smaller
│  └─────────────────────────────────┘ │
│                                     │
│  Bottom Navigation (16px padding)   │
└─────────────────────────────────────┘
```

#### Standard/Large Phones (375-428px)
```
┌─────────────────────────────────────┐
│  Status Bar (20px)                  │
├─────────────────────────────────────┤
│  🌙 StoryMagic (28px font)          │
│  Good evening, Sarah! (18px)        │ ← Full personalized greeting
│                                     │
│  Recent Stories (Horizontal Scroll) │
│  ┌─────┐ ┌─────┐ ┌─────┐           │ ← 3 cards visible,
│  │Emma │ │Alex │ │Emma │           │   standard size (160x120px)
│  │Space│ │Pet  │ │Magic│           │
│  └─────┘ └─────┘ └─────┘           │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │    Create New Story (48px)      │ │ ← Comfortable height
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │    Story Library (44px)         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Quick Actions (if space allows)    │ ← Additional shortcuts
│  [Profile] [Settings] [Help]        │
└─────────────────────────────────────┘
```

### 2. Story Creation Flow Responsive Layouts

#### Child Profile Selection
```javascript
// Responsive grid for profile cards
const ProfileGrid = {
  compact: {
    columns: 1, // Single column for very small screens
    cardWidth: '90%',
    spacing: 16
  },
  
  standard: {
    columns: 2, // Standard 2-column grid
    cardWidth: 160,
    spacing: 20
  },
  
  large: {
    columns: 2, // Still 2 columns, larger cards
    cardWidth: 180,
    spacing: 24
  },
  
  extraLarge: {
    columns: 3, // 3 columns for very wide screens
    cardWidth: 170,
    spacing: 20
  }
};

const responsiveProfileLayout = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveSpacing.md,
    paddingVertical: ResponsiveSpacing.lg
  },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: DeviceTypes.COMPACT ? 'center' : 'space-between'
  },
  
  profileCard: {
    width: ResponsiveDimensions.profileCard.width,
    height: ResponsiveDimensions.profileCard.height,
    marginBottom: ResponsiveSpacing.md
  }
});
```

#### Theme Selection Grid
```javascript
// Responsive theme selector layout
const ThemeGrid = {
  compact: {
    columns: 2,
    cardSize: 110,
    spacing: 12,
    rows: 3 // 6 themes in 2x3 grid
  },
  
  standard: {
    columns: 2,
    cardSize: 120,
    spacing: 16,
    rows: 3
  },
  
  large: {
    columns: 3,
    cardSize: 130,
    spacing: 16,
    rows: 2 // 6 themes in 3x2 grid
  },
  
  extraLarge: {
    columns: 3,
    cardSize: 140,
    spacing: 20,
    rows: 2
  }
};

const responsiveThemeLayout = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveSpacing.md
  },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  
  themeCard: {
    width: ResponsiveDimensions.themeSelector.width,
    height: ResponsiveDimensions.themeSelector.height,
    margin: ResponsiveSpacing.sm
  }
});
```

### 3. Story Reader Responsive Layout

#### Typography Scaling
```javascript
// Responsive story reader typography
const ReaderTypography = {
  compact: {
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 16,
    paragraphSpacing: 16
  },
  
  standard: {
    fontSize: 18,
    lineHeight: 28,
    marginHorizontal: 20,
    paragraphSpacing: 20
  },
  
  large: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 24,
    paragraphSpacing: 24
  },
  
  extraLarge: {
    fontSize: 22,
    lineHeight: 36,
    marginHorizontal: 28,
    paragraphSpacing: 28
  }
};

const storyReaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveSpacing.md,
    paddingVertical: ResponsiveSpacing.lg
  },
  
  storyText: {
    fontSize: ResponsiveFonts.body,
    lineHeight: ResponsiveFonts.body * 1.6,
    color: '#2C3E50',
    marginBottom: ResponsiveSpacing.lg
  },
  
  actionBar: {
    height: responsiveValue(60, 70, 80, 90),
    paddingHorizontal: ResponsiveSpacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
```

## Safe Area & Device-Specific Adaptations

### iPhone Adaptations
```javascript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const iPhoneAdaptations = () => {
  const insets = useSafeAreaInsets();
  
  return StyleSheet.create({
    // Handle notch and dynamic island
    headerContainer: {
      paddingTop: insets.top + 10,
      paddingBottom: 10
    },
    
    // Handle home indicator
    bottomContainer: {
      paddingBottom: insets.bottom + 16
    },
    
    // iPhone 14 Pro Max specific adjustments
    proMaxSpecific: {
      ...(screenWidth >= 428 && {
        fontSize: ResponsiveFonts.body + 2,
        padding: ResponsiveSpacing.lg + 4
      })
    }
  });
};
```

### Android Adaptations
```javascript
import { StatusBar, Platform } from 'react-native';

const AndroidAdaptations = {
  // Handle various Android navigation styles
  navigationBar: {
    // 3-button navigation
    threeButton: {
      paddingBottom: 48
    },
    
    // Gesture navigation
    gesture: {
      paddingBottom: 16
    }
  },
  
  // Handle Android status bar
  statusBar: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
    backgroundColor: '#2C3E50'
  },
  
  // Handle punch-hole cameras
  punchHole: {
    paddingTop: screenWidth >= 400 ? 32 : 24
  }
};
```

## Layout Constraints & Guidelines

### Content Density Rules
```javascript
const ContentDensity = {
  // Maximum items per screen to prevent overwhelming
  maxItemsPerScreen: {
    compact: 6,   // 2x3 grid maximum
    standard: 8,  // 2x4 or 4x2 grid
    large: 9,     // 3x3 grid maximum
    extraLarge: 12 // 3x4 or 4x3 grid
  },
  
  // Minimum spacing to prevent accidental touches
  minimumSpacing: {
    betweenCards: 12,
    betweenSections: 24,
    screenEdges: 16
  },
  
  // Content width limits for readability
  maxContentWidth: {
    text: screenWidth * 0.9, // Never wider than 90% of screen
    cards: screenWidth * 0.95,
    buttons: screenWidth * 0.92
  }
};
```

### Orientation Handling
```javascript
// Primarily portrait-focused with limited landscape support
const OrientationRules = {
  primary: 'portrait',
  
  landscapeSupport: {
    storyReader: true,    // Allow landscape for story reading
    navigation: false,    // Lock navigation screens to portrait
    storyCreation: false  // Lock creation flow to portrait
  },
  
  landscapeAdaptations: {
    storyReader: {
      columns: 2,         // Two-column text layout
      fontSize: ResponsiveFonts.body - 2,
      lineHeight: 1.5,
      maxWidth: '80%'     // Prevent overly wide text lines
    }
  }
};

// React Native orientation lock implementation
import Orientation from 'react-native-orientation-locker';

const ScreenComponent = ({ allowLandscape = false }) => {
  useEffect(() => {
    if (allowLandscape) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToPortrait();
    }
    
    return () => Orientation.lockToPortrait();
  }, [allowLandscape]);
};
```

## Performance Considerations

### Image & Asset Scaling
```javascript
// Responsive image loading
const ResponsiveImages = {
  storyCardIcons: {
    compact: require('./assets/icons/themes/compact/'),
    standard: require('./assets/icons/themes/standard/'),
    large: require('./assets/icons/themes/large/')
  },
  
  profileAvatars: {
    size: responsiveValue(60, 80, 90, 100),
    resolution: responsiveValue('1x', '2x', '2x', '3x')
  },
  
  // Automatic density selection
  getImageSource: (baseName) => {
    const density = PixelRatio.get();
    if (density >= 3) return `${baseName}@3x.png`;
    if (density >= 2) return `${baseName}@2x.png`;
    return `${baseName}.png`;
  }
};
```

### Memory Management
```javascript
// Responsive memory management
const MemoryOptimization = {
  // Lazy load images based on screen size
  lazyLoadThreshold: responsiveValue(2, 3, 4, 5),
  
  // Cache size based on device capabilities
  cacheSize: {
    images: DeviceTypes.COMPACT ? 50 : 100,
    stories: DeviceTypes.COMPACT ? 20 : 50
  },
  
  // Reduce quality on smaller devices if needed
  imageQuality: responsiveValue(0.7, 0.8, 0.9, 1.0)
};
```

This comprehensive responsive design specification ensures StoryMagic provides an optimal user experience across all mobile devices used by Polish families, while maintaining the core "Evening Sanctuary Design" principles regardless of screen size.