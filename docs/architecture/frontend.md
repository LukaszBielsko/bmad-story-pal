# React Native Frontend Architecture

## App Structure

```
mobile/src/
├── navigation/
│   ├── AppNavigator.tsx          # Root navigation container
│   ├── AuthNavigator.tsx         # Authentication flow
│   ├── MainTabNavigator.tsx      # Main app tab navigation
│   └── StoryFlowNavigator.tsx    # Story creation flow
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── WelcomeScreen.tsx
│   ├── story-creation/
│   │   ├── ChildSelectionScreen.tsx    # Step 1: Select child
│   │   ├── ThemeSelectionScreen.tsx    # Step 2: Choose theme
│   │   ├── PersonalizationScreen.tsx   # Step 3: Add details
│   │   └── GenerationScreen.tsx        # Loading & result
│   ├── story-reading/
│   │   ├── StoryReaderScreen.tsx       # Main reading interface
│   │   └── StoryDetailsScreen.tsx      # Story metadata & actions
│   ├── library/
│   │   ├── StoryLibraryScreen.tsx      # Saved stories grid
│   │   ├── FavoritesScreen.tsx         # Favorite stories
│   │   └── SearchScreen.tsx            # Story search
│   ├── profile/
│   │   ├── UserProfileScreen.tsx       # User settings
│   │   ├── ChildProfilesScreen.tsx     # Manage child profiles
│   │   └── CreateChildScreen.tsx       # Add new child
│   └── common/
│       ├── LoadingScreen.tsx
│       ├── ErrorScreen.tsx
│       └── OfflineScreen.tsx
├── components/
│   ├── common/
│   │   ├── Button.tsx                  # Primary app button
│   │   ├── Card.tsx                    # Content cards
│   │   ├── Input.tsx                   # Form inputs
│   │   ├── LoadingSpinner.tsx          # Loading states
│   │   ├── ProgressBar.tsx             # Progress indicators
│   │   └── SafeAreaView.tsx            # Safe area wrapper
│   ├── story/
│   │   ├── StoryCard.tsx               # Story display card
│   │   ├── ThemeCard.tsx               # Theme selection card
│   │   ├── StoryReader.tsx             # Reading interface
│   │   ├── ReadingProgress.tsx         # Progress tracking
│   │   └── StoryActions.tsx            # Save/favorite buttons
│   ├── profile/
│   │   ├── ChildProfileCard.tsx        # Child selection card
│   │   ├── AvatarPicker.tsx            # Avatar selection
│   │   └── InterestTags.tsx            # Interest selection
│   └── forms/
│       ├── PersonalizationForm.tsx     # Step 3 form
│       ├── ChildProfileForm.tsx        # Profile creation
│       └── FormField.tsx               # Reusable form field
├── services/
│   ├── api/
│   │   ├── apiClient.ts                # Axios configuration
│   │   ├── storyApi.ts                 # Story endpoints
│   │   ├── profileApi.ts               # Profile endpoints
│   │   ├── authApi.ts                  # Authentication
│   │   └── syncApi.ts                  # Offline sync
│   ├── auth/
│   │   ├── firebaseAuth.ts             # Firebase integration
│   │   ├── authStorage.ts              # Token management
│   │   └── authUtils.ts                # Auth helpers
│   ├── storage/
│   │   ├── sqliteClient.ts             # SQLite setup
│   │   ├── offlineStorage.ts           # Offline data
│   │   ├── imageCache.ts               # Image caching
│   │   └── storageUtils.ts             # Storage helpers
│   ├── analytics/
│   │   ├── analyticsClient.ts          # Analytics setup
│   │   ├── eventTracking.ts            # Event logging
│   │   └── performanceMonitoring.ts    # Performance tracking
│   └── notification/
│       ├── pushNotifications.ts        # Push notification setup
│       └── localNotifications.ts       # Local notifications
├── store/
│   ├── index.ts                        # Redux store setup
│   ├── slices/
│   │   ├── authSlice.ts                # Authentication state
│   │   ├── storiesSlice.ts             # Stories state
│   │   ├── profilesSlice.ts            # Child profiles state
│   │   ├── offlineSlice.ts             # Offline sync state
│   │   ├── uiSlice.ts                  # UI state
│   │   └── generationSlice.ts          # Story generation state
│   ├── middleware/
│   │   ├── offlineMiddleware.ts        # Offline action queueing
│   │   ├── analyticsMiddleware.ts      # Analytics tracking
│   │   └── errorMiddleware.ts          # Error handling
│   └── selectors/
│       ├── storySelectors.ts           # Story data selectors
│       ├── profileSelectors.ts         # Profile selectors
│       └── uiSelectors.ts              # UI state selectors
├── hooks/
│   ├── useAuth.ts                      # Authentication hook
│   ├── useStories.ts                   # Story management
│   ├── useOfflineSync.ts               # Offline synchronization
│   ├── useStoryGeneration.ts           # Story generation flow
│   ├── useChildProfiles.ts             # Profile management
│   ├── useNetworkStatus.ts             # Network connectivity
│   ├── useStoragePermissions.ts        # Device permissions
│   └── useAppState.ts                  # App lifecycle
├── styles/
│   ├── theme.ts                        # Design system theme
│   ├── colors.ts                       # Color palette
│   ├── typography.ts                   # Text styles
│   ├── spacing.ts                      # Spacing system
│   ├── shadows.ts                      # Shadow styles
│   └── animations.ts                   # Animation configs
├── utils/
│   ├── constants.ts                    # App constants
│   ├── formatters.ts                   # Data formatting
│   ├── validators.ts                   # Input validation
│   ├── dateUtils.ts                    # Date utilities
│   ├── storyUtils.ts                   # Story helpers
│   └── deviceUtils.ts                  # Device information
└── types/
    ├── api.ts                          # API response types
    ├── story.ts                        # Story-related types
    ├── profile.ts                      # Profile types
    ├── navigation.ts                   # Navigation types
    └── common.ts                       # Shared types
```

## State Management (Redux Toolkit)

### Store Configuration
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { storiesSlice } from './slices/storiesSlice';
import { profilesSlice } from './slices/profilesSlice';
import { offlineSlice } from './slices/offlineSlice';
import { uiSlice } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    stories: storiesSlice.reducer,
    profiles: profilesSlice.reducer,
    offline: offlineSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      offlineMiddleware,
      analyticsMiddleware,
      errorMiddleware
    ),
});
```

### Key State Slices

#### Auth Slice
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}
```

#### Stories Slice
```typescript
interface StoriesState {
  userStories: UserStory[];
  currentStory: Story | null;
  isGenerating: boolean;
  generationProgress: number;
  recentStories: Story[];
  searchResults: Story[];
  filters: StoryFilters;
  loading: boolean;
  error: string | null;
}
```

#### Offline Slice
```typescript
interface OfflineState {
  isOnline: boolean;
  queuedActions: QueuedAction[];
  lastSyncAt: string | null;
  syncInProgress: boolean;
  offlineStories: OfflineStory[];
  syncErrors: SyncError[];
}
```

## Navigation Structure

### Main App Flow
```typescript
// Root Navigator
AppNavigator
├── AuthNavigator (when not authenticated)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── RegisterScreen
└── MainTabNavigator (when authenticated)
    ├── HomeStack
    │   ├── HomeScreen
    │   └── StoryFlowNavigator
    │       ├── ChildSelectionScreen
    │       ├── ThemeSelectionScreen
    │       ├── PersonalizationScreen
    │       └── GenerationScreen
    ├── LibraryStack
    │   ├── StoryLibraryScreen
    │   ├── FavoritesScreen
    │   ├── SearchScreen
    │   └── StoryDetailsScreen
    ├── ReaderStack
    │   ├── StoryReaderScreen
    │   └── StoryDetailsScreen
    └── ProfileStack
        ├── UserProfileScreen
        ├── ChildProfilesScreen
        └── CreateChildScreen
```

## Key Components

### Story Creation Flow
```typescript
// Three-step story creation process
1. ChildSelectionScreen
   - Display child profile cards (180x200px)
   - Support creating new child profiles
   - Visual selection with immediate feedback

2. ThemeSelectionScreen
   - Show theme cards (120x120px) in 2-column grid
   - Age-appropriate filtering
   - Illustrated theme previews

3. PersonalizationScreen
   - Simple form with optional fields
   - Auto-suggestions for Polish context
   - Clear field validation
```

### Story Reader Interface
```typescript
// Optimized for bedtime reading
- Full-screen immersive layout
- 18px body text for reading aloud
- Progress bar at top (2px height)
- Large touch targets for navigation
- Auto-scroll and manual page controls
- Save/favorite floating action button
```

## Performance Optimizations

### Bundle Optimization
- **Code Splitting:** Lazy loading for non-critical screens
- **Image Optimization:** WebP format with fallbacks
- **Font Loading:** System fonts for performance
- **Tree Shaking:** Remove unused dependencies

### Rendering Performance
- **React.memo:** Prevent unnecessary re-renders
- **FlatList Optimization:** Efficient list rendering
- **Image Caching:** Preload and cache story illustrations
- **State Normalization:** Flat state structure for performance

### Memory Management
- **Component Cleanup:** Proper useEffect cleanup
- **Event Listener Removal:** Prevent memory leaks
- **Image Memory:** Release unused image references
- **State Persistence:** Selective state preservation

## Offline Capabilities

### SQLite Integration
```typescript
// Offline storage implementation
- Story content caching for offline reading
- Child profile synchronization
- Reading progress tracking
- Favorite status persistence
- Background sync when online
```

### Sync Strategy
```typescript
// Bidirectional sync approach
1. Download: User stories and profiles on login
2. Upload: Reading activity and preferences
3. Conflict Resolution: Server data takes precedence
4. Queue Management: Store offline actions for sync
5. Background Sync: Periodic updates when online
```

## Security Implementation

### Authentication Flow
```typescript
// Firebase Auth integration
- JWT token management with automatic refresh
- Secure token storage using Keychain/Keystore
- Biometric authentication support
- Session timeout handling
```

### Data Protection
```typescript
// Client-side security measures
- API request encryption (HTTPS)
- Sensitive data encryption in SQLite
- Certificate pinning for API calls
- Input validation and sanitization
```

## Accessibility Features

### MVP Phase Accessibility
- **Basic Touch Targets:** Large touch targets (44px minimum)
- **Basic Color Contrast:** Ensure readable text
- **Simple Navigation:** Clear user flow design

### Post-MVP Accessibility (Deferred)
- **WCAG AA Compliance:** Full accessibility compliance
- **Screen Reader Support:** VoiceOver/TalkBack compatibility  
- **High Contrast:** Support for accessibility color schemes
- **Large Text:** Dynamic type sizing support
- **Voice Control:** Support for voice navigation

### Internationalization
- **Polish Language:** Complete UI translation
- **RTL Support:** Future Arabic/Hebrew support ready
- **Cultural Adaptation:** Polish-specific content and themes
- **Date/Time Formatting:** Localized formats

## Testing Strategy

### Manual Testing (MVP Phase)
- **Component Validation:** Manual testing of UI components
- **User Flow Testing:** Manual validation of complete user journeys
- **Cross-Platform Testing:** Basic manual testing on iOS and Android
- **Colleague Testing:** Feedback-driven testing with development team

### Post-MVP Testing Strategy (Deferred)

#### Unit Testing (Post-MVP)
- **Component Tests:** React Native Testing Library
- **Hook Tests:** Custom hook testing
- **Utility Tests:** Pure function testing
- **Service Tests:** API client mocking

#### Integration Testing (Post-MVP)
- **Flow Tests:** Complete user journey testing
- **API Integration:** Mock server testing
- **Navigation Tests:** Screen transition testing
- **Offline Tests:** Sync functionality testing

#### E2E Testing (Post-MVP)
- **Detox Framework:** Full app flow testing
- **Device Testing:** iOS and Android compatibility
- **Performance Testing:** Load time and responsiveness
- **Accessibility Testing:** Screen reader compatibility