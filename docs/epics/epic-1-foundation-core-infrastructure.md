# Epic 1: Foundation & Core Infrastructure

**Epic Goal:** Establish solid technical foundation for StoryMagic while delivering immediate value through basic story reading functionality. This epic ensures parents can access and read stories from day one, even before AI generation capabilities are complete.

## Story 1.1: Project Setup & Development Environment

As a developer,
I want to establish the complete development environment and project structure,
so that I can efficiently build and deploy the StoryMagic application.

### Acceptance Criteria

1. React Native monorepo initialized with TypeScript configuration
2. NestJS backend API created with modular folder structure
3. Shared TypeScript types package configured between frontend and backend
4. ESLint, Prettier, and pre-commit hooks established
5. GitHub repository created with CI/CD pipeline using GitHub Actions
6. Development, staging, and production environments configured on AWS

## Story 1.2: Basic Authentication System

As a parent,
I want to access the app securely for demos while having production-ready authentication infrastructure,
so that I can demonstrate the app immediately and deploy with full security later.

### Acceptance Criteria

**Phase 1 (MVP Demo Mode):**
1. Firebase Authentication integrated in NestJS backend using Firebase Admin SDK
2. Environment variable `MOCK_AUTH=true` bypasses authentication validation
3. Frontend launches directly to main app interface (no login screens)
4. Protected API endpoints configured with mock authentication bypass
5. Basic user profile data structure created in PostgreSQL

**Phase 2 (Production Ready - Story 1.6):**
6. Frontend login/signup screens implementation
7. JWT token management and refresh logic
8. Full Firebase Auth flow activation via `MOCK_AUTH=false`

## Story 1.3: Core Mobile App Shell

As a parent,
I want to open the StoryMagic app and see a welcoming interface,
so that I feel confident using it during bedtime routines.

### Acceptance Criteria

1. React Native navigation structure implemented (React Navigation)
2. Welcome screen with clean, bedtime-appropriate design
3. Basic app loading states and error boundaries
4. App icons and splash screen configured for iOS and Android
5. Core design system components implemented (buttons, cards, typography)
6. App successfully builds and runs on both iOS and Android devices

## Story 1.4: Static Story Display

As a parent,
I want to read sample stories to my child,
so that we can immediately benefit from the app while other features are being developed.

### Acceptance Criteria

1. Story reader interface with clean, readable typography (18px body text)
2. 5-7 pre-written Polish stories embedded in the app
3. Story navigation (next/previous page) for longer stories
4. Reading progress indicator at top of screen
5. Stories display correctly on various screen sizes
6. Back button to return to story selection

## Story 1.5: Basic Backend API

As the mobile app,
I want to communicate with a reliable backend service,
so that user data and stories can be managed securely.

### Acceptance Criteria

1. NestJS API with TypeScript running on AWS
2. PostgreSQL database connected and configured
3. Basic health check endpoint responding correctly
4. API authentication middleware using Firebase Admin SDK with environment-based mock mode (`MOCK_AUTH=true` bypasses validation)
5. CORS configuration for mobile app communication
6. Basic error handling and logging system implemented

## Story 1.6: Firebase Authentication Activation

As a parent,
I want to use secure login flows to protect my family's data,
so that the app is ready for production use with real user accounts.

### Acceptance Criteria

1. React Native Firebase Auth SDK integration completed
2. Sign-up flow with email/password authentication implemented
3. Sign-in flow with error handling and validation
4. JWT token management and refresh logic implemented
5. Login/logout screens with error handling
6. Environment variable `MOCK_AUTH=false` activates full authentication
7. Seamless migration from mock mode to production authentication
