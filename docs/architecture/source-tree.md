# Source Tree Structure

## Overview

This project uses an npm workspace monorepo structure with React Native mobile app and NestJS backend services.

## Root Level Structure

```
├── .ai/                      # AI development artifacts
│   ├── debug-log.md         # Development debug tracking
│   └── context/             # AI context files
├── .bmad-core/              # BMAD™ Core system files
│   ├── agents/              # Agent definitions
│   ├── tasks/               # Reusable task workflows
│   ├── templates/           # Document templates
│   ├── checklists/          # Quality assurance checklists
│   └── core-config.yaml     # Core configuration
├── apps/                    # Application packages
│   ├── mobile/              # React Native mobile app
│   └── api/                 # NestJS backend API
├── packages/                # Shared packages
│   ├── shared-types/        # TypeScript type definitions
│   ├── shared-utils/        # Common utilities
│   └── design-system/       # UI components and themes
├── docs/                    # Documentation
│   ├── architecture/        # Technical architecture docs
│   ├── prd/                 # Product requirements (sharded)
│   ├── stories/             # Development stories
│   └── qa/                  # Quality assurance documentation
├── tools/                   # Development tools and scripts
│   ├── build/               # Build scripts and configurations
│   ├── deploy/              # Deployment scripts
│   └── dev/                 # Development utilities
├── .github/                 # GitHub workflows and templates
│   ├── workflows/           # CI/CD pipelines
│   └── templates/           # Issue/PR templates
└── config/                  # Root configuration files
    ├── eslint/              # ESLint configurations
    ├── typescript/          # TypeScript configurations
    └── jest/                # Jest test configurations
```

## Mobile App Structure (`apps/mobile/`) - Expo Router Architecture

```
mobile/app/                           # Expo Router file-based routing
├── _layout.tsx                       # Root app layout
├── welcome.tsx                       # Welcome/landing screen
├── (auth)/                          # Authentication flow group
│   ├── _layout.tsx                  # Auth navigation layout
│   ├── sign-in.tsx                  # Sign in screen
│   └── register.tsx                 # Registration screen
├── (main)/                          # Main authenticated app group
│   ├── _layout.tsx                  # Main app layout
│   └── (tabs)/                      # Tab navigation group
│       ├── _layout.tsx              # Tab configuration
│       ├── index.tsx                # Home/dashboard
│       ├── library.tsx              # Story library
│       ├── create.tsx               # Story creation
│       └── profile.tsx              # User profile
├── story/                           # Story-related screens
│   ├── [id].tsx                     # Story reading screen (dynamic route)
│   ├── create/                      # Story creation flow
│   │   ├── child-selection.tsx      # Step 1: Select child
│   │   ├── theme-selection.tsx      # Step 2: Choose theme
│   │   ├── personalization.tsx      # Step 3: Add details
│   │   └── generation.tsx           # Loading & result
│   └── details/
│       └── [id].tsx                 # Story metadata & actions
├── profile/                         # Profile management
│   ├── child-profiles.tsx           # Manage child profiles
│   └── create-child.tsx             # Add new child
└── common/                          # Common screens
    ├── loading.tsx                  # Loading screen
    ├── error.tsx                    # Error screen  
    └── offline.tsx                  # Offline screen

mobile/src/                           # Source code (non-routing)
├── screens/                         # Legacy screen components (if needed)
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

## Backend API Structure (`apps/api/`)

```
src/
├── app.module.ts                    # Root application module
├── main.ts                         # Application bootstrap
├── database/                       # Database module and configuration
│   ├── database.module.ts          # Global Drizzle ORM module
│   ├── relations.ts               # Database relations
│   └── schema/
│       └── index.ts               # Schema aggregator
├── health/                         # Health monitoring module
│   ├── health.module.ts
│   ├── health.controller.ts        # Health check endpoints
│   └── database-health.indicator.ts # Database connectivity check
├── config/
│   ├── database.config.ts          # Drizzle config
│   ├── firebase.config.ts          # Firebase Auth setup
│   ├── openai.config.ts           # OpenAI API configuration
│   ├── redis.config.ts            # Redis caching setup
│   └── app.config.ts              # Environment variables
├── common/
│   ├── guards/
│   │   ├── firebase-auth.guard.ts  # JWT authentication
│   │   └── rate-limit.guard.ts     # API rate limiting
│   ├── filters/
│   │   ├── all-exceptions.filter.ts # Global error handling
│   │   └── validation.filter.ts    # Input validation errors
│   ├── interceptors/
│   │   ├── logging.interceptor.ts  # Request/response logging
│   │   ├── timeout.interceptor.ts  # Request timeout handling
│   │   └── transform.interceptor.ts # Response transformation
│   ├── decorators/
│   │   ├── user.decorator.ts       # Current user injection
│   │   └── api-docs.decorator.ts   # Swagger documentation
│   ├── pipes/
│   │   ├── validation.pipe.ts      # DTO validation
│   │   └── parse-uuid.pipe.ts      # UUID parsing
│   └── types/
│       ├── request-user.interface.ts
│       ├── api-response.interface.ts
│       └── pagination.interface.ts
├── user-management/                 # User & child profile management
│   ├── user-management.module.ts
│   ├── controllers/
│   │   ├── users.controller.ts
│   │   └── child-profiles.controller.ts
│   ├── services/
│   │   ├── users.service.ts
│   │   └── child-profiles.service.ts
│   ├── user.table.ts               # Drizzle table definition
│   ├── child-profile.table.ts      # Drizzle table definition
│   └── schemas/
│       ├── user.schemas.ts
│       └── child-profile.schemas.ts
├── story-generation/               # OpenAI integration & generation
│   ├── story-generation.module.ts
│   ├── controllers/
│   │   └── story-generation.controller.ts
│   ├── services/
│   │   ├── story-generation.service.ts
│   │   ├── openai.service.ts
│   │   ├── prompt-builder.service.ts
│   │   └── story-request-tracker.service.ts
│   ├── story-request.table.ts       # Drizzle table definition
│   └── schemas/
│       ├── generate-story.schemas.ts
│       └── story-generation.schemas.ts
├── content-safety/                 # Multi-layer content validation
│   ├── content-safety.module.ts
│   ├── services/
│   │   ├── content-moderation.service.ts
│   │   ├── openai-moderation.service.ts
│   │   ├── custom-safety-filters.service.ts
│   │   └── safety-logger.service.ts
│   ├── safety-violation.table.ts    # Drizzle table definition
│   └── schemas/
│       ├── moderation.schemas.ts
│       └── safety-result.schemas.ts
├── story-storage/                  # Story saving & library management
│   ├── story-storage.module.ts
│   ├── controllers/
│   │   ├── stories.controller.ts
│   │   └── user-stories.controller.ts
│   ├── services/
│   │   ├── stories.service.ts
│   │   ├── user-stories.service.ts
│   │   └── pre-generated-stories.service.ts
│   ├── story.table.ts               # Drizzle table definition
│   ├── user-story.table.ts          # Drizzle table definition
│   └── schemas/
│       ├── story.schemas.ts
│       └── user-story.schemas.ts
├── sync/                           # Offline synchronization
│   ├── sync.module.ts
│   ├── controllers/
│   │   └── sync.controller.ts
│   ├── services/
│   │   ├── offline-sync.service.ts
│   │   └── sync-conflict-resolver.service.ts
│   └── schemas/
│       ├── sync-request.schemas.ts
│       └── sync-response.schemas.ts
└── analytics/                      # Usage analytics & monitoring
    ├── analytics.module.ts
    ├── controllers/
    │   └── analytics.controller.ts
    ├── services/
    │   ├── analytics.service.ts
    │   └── performance-monitoring.service.ts
    └── schemas/
        └── analytics-event.schemas.ts
```

## Shared Packages Structure

### Shared Types (`packages/shared-types/`)

```
packages/shared-types/
├── src/
│   ├── api/                # API contract types
│   │   ├── requests/       # Request schemas
│   │   ├── responses/      # Response schemas
│   │   └── index.ts
│   ├── domain/             # Business domain types
│   │   ├── user.ts
│   │   ├── story.ts
│   │   ├── family.ts
│   │   └── index.ts
│   ├── common/             # Common utility types
│   │   ├── pagination.ts
│   │   ├── validation.ts
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## Development Tools (`tools/`)

```
tools/
├── build/                 # Build automation
│   ├── mobile-build.js    # Mobile app build scripts
│   ├── api-build.js       # Backend build scripts
│   └── shared-build.js    # Shared package builds
├── deploy/                # Deployment automation
│   ├── staging-deploy.sh  # Staging deployment
│   ├── prod-deploy.sh     # Production deployment
│   └── db-migrate.sh      # Database migration runner
└── dev/                   # Development utilities
    ├── setup.js           # Environment setup
    ├── db-reset.js        # Database reset utility
    └── mock-data.js       # Generate mock data
```

## Configuration Management

### Root Configuration (`config/`)

- **ESLint**: Shared linting rules for all packages
- **TypeScript**: Base TypeScript configuration
- **Jest**: Testing configuration templates

### Package-Specific Configuration

- Each app/package has its own `package.json` with specific dependencies
- Build tools configured per package type (Metro, Webpack, etc.)
- Environment-specific configurations in each package

## File Naming Conventions

### Components

- **React Native**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useStoryData.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: camelCase with `.types.ts` suffix (`user.types.ts`)

### Backend Files

- **Controllers**: PascalCase with suffix (`user.controller.ts`)
- **Services**: PascalCase with suffix (`user.service.ts`)

### Test Files

- **Unit Tests**: `*.test.ts` or `*.spec.ts`
- **Integration Tests**: `*.integration.test.ts`
- **E2E Tests**: `*.e2e.test.ts`

## Import Path Aliases

### Mobile App (`apps/mobile/`) - Expo Router

```typescript
"@/components/*": ["src/components/*"]
"@/services/*": ["src/services/*"]
"@/utils/*": ["src/utils/*"]
"@/types/*": ["src/types/*"]
"@/app/*": ["app/*"]                    # Expo Router screens
```

### Backend API (`apps/api/`)

```typescript
"@/modules/*": ["src/modules/*"]
"@/shared/*": ["src/shared/*"]
"@/config/*": ["src/config/*"]
"@/database/*": ["src/database/*"]
"@/health/*": ["src/health/*"]
```

### Shared Packages

```typescript
"@shared/types": ["packages/shared-types/src"]
"@shared/utils": ["packages/shared-utils/src"]
"@design-system": ["packages/design-system/src"]
```

## Build Outputs

### Development

- Mobile: Metro bundler serves files in memory
- API: TypeScript compilation to `dist/` folder
- Packages: Individual build outputs in each package

### Production

- Mobile: Platform-specific builds (`.apk`, `.ipa`)
- API: Compiled JavaScript in `dist/` with source maps
- Docker images for containerized deployment

This structure supports scalable development with clear separation of concerns, shared code reuse, and maintainable architecture patterns.
