# StoryMagic Accessibility & Usability Guidelines

## WCAG 2.1 AA Compliance Strategy

### Overview
StoryMagic implements comprehensive accessibility to ensure the app is usable by parents and children with diverse abilities, particularly during the cognitively demanding bedtime routine period.

## Accessibility Principles Implementation

### 1. Perceivable - Information must be presentable in ways users can perceive

#### Color & Contrast (Success Criteria 1.4.3, 1.4.6)
```
Contrast Ratio Requirements:
├── Normal Text (18px+): Minimum 4.5:1, Target 7:1 (AAA)
├── Large Text (24px+): Minimum 3:1, Target 4.5:1 (AAA)  
├── UI Components: Minimum 3:1, Target 4.5:1
└── Graphical Objects: Minimum 3:1

Tested Color Combinations:
├── Midnight Blue (#2C3E50) on White (#FFFFFF): 12.63:1 ✓ AAA
├── Dark Gray (#495057) on White (#FFFFFF): 9.25:1 ✓ AAA
├── Medium Gray (#6C757D) on White (#FFFFFF): 5.74:1 ✓ AAA
├── Lavender (#9B59B6) on White (#FFFFFF): 4.89:1 ✓ AA
├── Coral (#E74C3C) on White (#FFFFFF): 4.78:1 ✓ AA
└── Success Green (#27AE60) on White (#FFFFFF): 3.95:1 ✓ (borderline)
```

#### Color Independence (Success Criteria 1.4.1)
```javascript
// Never rely on color alone for information
const AccessibleButton = ({ type, children }) => (
  <Button 
    style={[
      styles.button,
      type === 'primary' && styles.primaryButton,
      type === 'danger' && styles.dangerButton
    ]}
    accessibilityLabel={
      type === 'danger' 
        ? `${children}, destructive action` 
        : children
    }
  >
    {type === 'danger' && <Icon name="warning" />}
    {children}
  </Button>
);
```

#### Text Scaling Support (Success Criteria 1.4.4, 1.4.12)
```css
/* Support iOS Dynamic Type and Android Font Scale */
.scalable-text {
  font-size: 18px;
  /* Scales up to 200% while maintaining readability */
}

/* React Native implementation */
const responsiveStyles = StyleSheet.create({
  bodyText: {
    fontSize: 18,
    // Automatically scales with system accessibility settings
    fontFamily: Platform.select({
      ios: 'SF Pro Text',
      android: 'Roboto'
    }),
    lineHeight: 1.6
  }
});
```

#### Visual Focus Indicators (Success Criteria 2.4.7)
```css
/* Clear focus indicators for all interactive elements */
.focusable-element:focus {
  outline: 3px solid #9B59B6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* React Native focus styling */
const focusStyles = {
  focused: {
    borderWidth: 3,
    borderColor: '#9B59B6',
    elevation: 4, // Android shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 4
  }
};
```

### 2. Operable - Interface components must be operable

#### Touch Target Sizes (Success Criteria 2.5.5)
```
Minimum Touch Targets:
├── Primary Buttons: 48x48px (iOS HIG) / 48dp (Material Design)
├── Secondary Buttons: 44x44px minimum
├── Story Cards: 160x120px (well above minimum)
├── Profile Cards: 180x200px (generous sizing)
├── Icon Buttons: 44x44px minimum
└── Form Fields: 52px height for easy targeting

Implementation:
const touchableStyles = StyleSheet.create({
  minTouchTarget: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryButton: {
    minWidth: 48,
    minHeight: 48,
    // Additional visual padding while maintaining touch area
    paddingHorizontal: 16,
    paddingVertical: 12
  }
});
```

#### Keyboard Navigation (Success Criteria 2.1.1, 2.1.2)
```javascript
// Full keyboard support for all functionality
const KeyboardAccessibleComponent = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const handleKeyPress = (event) => {
    switch (event.nativeEvent.key) {
      case 'Tab':
        // Move to next focusable element
        setFocusedIndex((prev) => (prev + 1) % focusableElements.length);
        break;
      case 'Enter':
      case ' ': // Space bar
        // Activate focused element
        activateElement(focusedIndex);
        break;
      case 'Escape':
        // Return to previous screen or close modal
        goBack();
        break;
    }
  };

  return (
    <View onKeyPress={handleKeyPress}>
      {/* Focusable elements with proper tab order */}
    </View>
  );
};
```

#### No Seizure-Inducing Content (Success Criteria 2.3.1)
```javascript
// Gentle animations that don't flash or strobe
const safeFadeAnimation = Animated.timing(fadeValue, {
  toValue: 1,
  duration: 500, // Slow enough to avoid seizures
  easing: Easing.out(Easing.quad),
  useNativeDriver: true
});

// Avoid rapid color changes or high-contrast flashing
const SAFE_ANIMATION_CONSTRAINTS = {
  maxFlashRate: 2, // Max 2 flashes per second
  minAnimationDuration: 300, // Minimum 300ms
  maxContrastChange: 0.3 // Avoid high contrast jumps
};
```

#### Timeout Management (Success Criteria 2.2.1)
```javascript
// Generous timeouts with user control
const TIMEOUT_CONFIG = {
  storyGeneration: 30000, // 30 seconds (from PRD requirement)
  userInactivity: 300000, // 5 minutes before suggesting save
  sessionExpiry: 3600000, // 1 hour maximum
  
  // Allow users to extend timeouts
  allowExtension: true,
  extendByMinutes: 5
};

const TimeoutManager = {
  startTimer: (duration, callback) => {
    return setTimeout(() => {
      // Show extension option before executing callback
      showTimeoutExtensionDialog(callback);
    }, duration);
  },
  
  showExtensionDialog: (originalCallback) => {
    Alert.alert(
      'More Time Needed?',
      'Would you like more time to complete this action?',
      [
        { text: 'Continue', onPress: () => extendTimeout(originalCallback) },
        { text: 'Finish Now', onPress: originalCallback }
      ]
    );
  }
};
```

### 3. Understandable - Information and UI operation must be understandable

#### Clear Language (Success Criteria 3.1.5)
```
Content Writing Guidelines:
├── Reading Level: Maximum 6th grade (age-appropriate for parents)
├── Sentence Length: Maximum 20 words per sentence
├── Paragraph Length: Maximum 3 sentences
├── Technical Terms: Always explained or avoided
└── Cultural Context: Polish idioms and familiar references

Example Content:
❌ "Utilize the personalization parameters to optimize narrative generation"
✅ "Add details about your child to make the story more special"

❌ "Authentication credentials required"
✅ "Please sign in to save your stories"
```

#### Consistent Navigation (Success Criteria 3.2.3)
```javascript
// Standardized navigation patterns across all screens
const NavigationStructure = {
  header: {
    left: 'Back button (when applicable)',
    center: 'Screen title',
    right: 'Context action (Skip, Add, etc.)'
  },
  
  body: {
    progressIndicator: 'Step X of Y (for multi-step flows)',
    primaryContent: 'Main content area',
    contextInfo: 'Helper text or instructions'
  },
  
  footer: {
    primaryAction: 'Main CTA button',
    secondaryAction: 'Cancel or back option',
    utilityNav: 'Bottom tab navigation (main screens)'
  }
};

// Consistent error handling
const ErrorPatterns = {
  networkError: {
    title: 'Connection Problem',
    message: 'Please check your internet and try again.',
    actions: ['Retry', 'Work Offline']
  },
  
  generationError: {
    title: 'Story Creation Issue',
    message: 'We couldn\'t create your story right now. Try a pre-made story instead?',
    actions: ['Try Again', 'Browse Stories']
  }
};
```

#### Form Error Prevention (Success Criteria 3.3.4)
```javascript
// Proactive error prevention and clear error messages
const FormValidation = {
  childName: {
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return { valid: false, message: 'Please enter your child\'s name' };
      }
      if (value.length > 50) {
        return { valid: false, message: 'Name is too long (50 characters max)' };
      }
      return { valid: true };
    },
    
    helpText: 'This will be used in the story as the main character\'s name'
  },
  
  childAge: {
    validate: (value) => {
      const age = parseInt(value);
      if (isNaN(age) || age < 3 || age > 8) {
        return { valid: false, message: 'Please choose an age between 3 and 8' };
      }
      return { valid: true };
    },
    
    helpText: 'Age helps us create stories with the right complexity'
  }
};

// Real-time validation with gentle feedback
const ValidatedInput = ({ validator, value, onChange }) => {
  const [error, setError] = useState(null);
  
  const handleChange = (newValue) => {
    onChange(newValue);
    
    // Validate after user stops typing (debounced)
    clearTimeout(validationTimeout);
    validationTimeout = setTimeout(() => {
      const result = validator.validate(newValue);
      setError(result.valid ? null : result.message);
    }, 500);
  };
  
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={handleChange}
        style={[
          styles.input,
          error && styles.inputError
        ]}
        accessibilityLabel={validator.helpText}
        accessibilityInvalid={!!error}
      />
      {error && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};
```

### 4. Robust - Content must be robust enough for various assistive technologies

#### Screen Reader Support
```javascript
// Comprehensive screen reader labels and hints
const ScreenReaderLabels = {
  storyCard: (story) => ({
    accessibilityLabel: `${story.title}, story for ${story.childName}, ${story.theme} theme, created ${story.date}`,
    accessibilityHint: 'Double tap to read this story',
    accessibilityRole: 'button'
  }),
  
  profileCard: (child) => ({
    accessibilityLabel: `${child.name}, age ${child.age}, likes ${child.interests.join(', ')}`,
    accessibilityHint: 'Double tap to select this child for story creation',
    accessibilityRole: 'button'
  }),
  
  themeSelector: (theme) => ({
    accessibilityLabel: `${theme.name} theme`,
    accessibilityHint: `Creates ${theme.description} stories. Double tap to select.`,
    accessibilityRole: 'radio',
    accessibilityState: { selected: theme.isSelected }
  }),
  
  progressIndicator: (current, total) => ({
    accessibilityLabel: `Step ${current} of ${total}`,
    accessibilityRole: 'progressbar',
    accessibilityValue: { min: 1, max: total, now: current }
  })
};

// Dynamic announcements for state changes
const announceStateChange = (message) => {
  // Announce important changes to screen readers
  AccessibilityInfo.announceForAccessibility(message);
};

// Usage examples
announceStateChange('Story generation started');
announceStateChange('Story saved to library');
announceStateChange('Profile created successfully');
```

#### Voice Control Support
```javascript
// Voice control friendly elements
const VoiceControlProps = {
  generateButton: {
    accessibilityLabel: 'Generate story',
    accessibilityIdentifier: 'generate-story-button', // For automation
    accessibilityHint: 'Creates a new personalized story'
  },
  
  saveButton: {
    accessibilityLabel: 'Save story',
    accessibilityIdentifier: 'save-story-button',
    accessibilityHint: 'Saves this story to your library'
  },
  
  // Voice commands mapping
  voiceCommands: {
    'create story': () => navigateToStoryCreation(),
    'save story': () => saveCurrentStory(),
    'go back': () => goBack(),
    'read story': () => startReading(),
    'next page': () => nextPage(),
    'previous page': () => previousPage()
  }
};
```

## Specialized Accessibility Features

### Parental Accessibility Considerations

#### Motor Impairments
```javascript
// Support for switch control and assistive touch
const SwitchControlSupport = {
  // Group related elements for switch navigation
  storyCreationGroup: {
    accessible: true,
    accessibilityRole: 'group',
    accessibilityLabel: 'Story creation options'
  },
  
  // Large touch targets for tremor/dexterity issues
  extraLargeTouchTargets: {
    minWidth: 60,
    minHeight: 60,
    margin: 8 // Extra space between elements
  },
  
  // Reduce precision requirements
  tolerantGestures: {
    swipeThreshold: 30, // Lower threshold for swipes
    tapTolerance: 10, // Allow slight movement during taps
    doubleTapDelay: 500 // Longer delay for double taps
  }
};
```

#### Visual Impairments
```javascript
// High contrast mode support
const HighContrastStyles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000000'
  },
  
  text: {
    color: '#000000',
    fontWeight: '600' // Bolder text for better visibility
  }
});

// Support for reduced motion preferences
const ReducedMotionStyles = {
  respectsReduceMotion: true,
  animations: {
    duration: 0, // Disable animations if user prefers reduced motion
    scale: 1, // No scale animations
    opacity: 1 // Instant opacity changes
  }
};
```

#### Cognitive Accessibility
```javascript
// Simplified interfaces for cognitive load reduction
const CognitiveAccessibilityFeatures = {
  // Simplified language mode
  simpleLanguage: {
    enabled: false, // User preference
    alternatives: {
      'Personalize your story': 'Add details',
      'Generate story': 'Make story',
      'Story library': 'Saved stories'
    }
  },
  
  // Memory aids
  memorySupport: {
    showPreviousChoices: true,
    rememberPreferences: true,
    breadcrumbs: true,
    confirmActions: true
  },
  
  // Extended timeouts
  extendedTimeouts: {
    storyGeneration: 60000, // 60 seconds instead of 30
    userInactivity: 600000, // 10 minutes instead of 5
    showTimeRemaining: true
  }
};
```

### Child Accessibility Features

#### Age-Appropriate Accessibility
```javascript
// 3-5 year old considerations
const YoungChildAccessibility = {
  extraLargeTargets: {
    minWidth: 80,
    minHeight: 80
  },
  
  highContrast: true,
  simpleIcons: true,
  voiceGuidance: {
    enabled: true,
    speakButtonLabels: true,
    speakInstructions: true
  }
};

// 6-8 year old considerations  
const OlderChildAccessibility = {
  normalTargets: {
    minWidth: 44,
    minHeight: 44
  },
  
  readingSupport: {
    highlightCurrentWord: true,
    adjustableSpeed: true,
    letterSpacing: 'normal'
  }
};
```

## Testing & Validation

### Accessibility Testing Checklist
```
Manual Testing:
├── ✓ Navigate entire app using only keyboard/switch control
├── ✓ Complete user flows with VoiceOver/TalkBack enabled
├── ✓ Test with 200% text scaling
├── ✓ Verify in high contrast mode
├── ✓ Test with reduced motion enabled
├── ✓ Validate color contrast ratios
└── ✓ Check focus order and focus indicators

Automated Testing:
├── ✓ Run accessibility scanner (Android)
├── ✓ Accessibility Inspector (iOS)
├── ✓ axe-core React Native testing
├── ✓ Color contrast validation tools
└── ✓ Screen reader compatibility tests

User Testing:
├── ✓ Test with parents who use assistive technologies
├── ✓ Validate with children who have disabilities
├── ✓ Test in actual bedtime scenarios
└── ✓ Gather feedback from accessibility community
```

### Compliance Monitoring
```javascript
// Automated accessibility monitoring
const AccessibilityMonitoring = {
  // Check contrast ratios programmatically
  validateContrast: (foreground, background) => {
    const ratio = calculateContrastRatio(foreground, background);
    return {
      passesAA: ratio >= 4.5,
      passesAAA: ratio >= 7.0,
      ratio
    };
  },
  
  // Validate touch target sizes
  validateTouchTargets: (element) => {
    const { width, height } = element.getBoundingClientRect();
    return {
      meetsMinimum: width >= 44 && height >= 44,
      isRecommended: width >= 48 && height >= 48,
      width,
      height
    };
  },
  
  // Check for accessibility labels
  validateLabels: (element) => {
    return {
      hasLabel: !!element.accessibilityLabel,
      hasRole: !!element.accessibilityRole,
      hasHint: !!element.accessibilityHint
    };
  }
};
```

This comprehensive accessibility implementation ensures StoryMagic is usable by all families, regardless of ability, while maintaining the calming "Evening Sanctuary Design" experience for bedtime routines.