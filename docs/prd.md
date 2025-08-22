# StoryMagic Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Create personalized bedtime stories where children (ages 3-8) become protagonists of their own adventures
- Reduce cognitive load for exhausted parents during evening storytelling routines  
- Enhance family bonding time through engaging, safe, age-appropriate AI-generated narratives
- Provide reliable, quick story generation (under 30 seconds) that works consistently for bedtime routines
- Achieve 1,000 active Polish families within 6 months with 60% monthly retention rate

### Background Context

StoryMagic addresses a critical pain point for working parents in Poland: the challenge of providing engaging bedtime content when mentally exhausted from daily responsibilities. Traditional books become repetitive and fail to capture children's imagination, while generic story apps lack meaningful personalization.

The app leverages AI technology to transform children into story protagonists through a simple 3-step process (child profile → theme selection → personalization), designed specifically for evening cognitive limitations. This solution builds on proven psychology - children naturally engage more when they're the main character - while preserving the sacred tradition of family bedtime stories without adding complexity for tired parents.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-08-21 | 1.0 | Initial PRD creation from comprehensive project brief | PM John |

## Requirements

### Functional

**FR1:** The app shall provide a three-step story creation flow: child profile selection → theme selection → personalization elements with minimal cognitive load design

**FR2:** The system shall maintain a pre-generated story library of 15-20 curated, tested stories for instant access when AI generation isn't needed

**FR3:** The app shall generate personalized stories using OpenAI API with age-appropriate prompts and safety filtering for children ages 3-8

**FR4:** The system shall implement robust content moderation using OpenAI's safety API plus custom family-friendly filters to ensure zero inappropriate content incidents

**FR5:** The app shall provide quick access to previously generated favorite stories through the welcome screen

**FR6:** The system shall support basic child profiles including name, age, and basic preferences for story personalization

**FR7:** The app shall display stories in a clean, distraction-free text interface optimized for parent reading aloud

**FR8:** The system shall provide full Polish language support for both content generation and user interface

### Non Functional

**NFR1:** Story generation must complete within 30 seconds to maintain bedtime routine flow

**NFR2:** App load time must be under 3 seconds for immediate access during evening routines

**NFR3:** The system must maintain 99.9% uptime to ensure reliable access during critical bedtime hours

**NFR4:** All AI-generated content must pass safety filters with zero tolerance for inappropriate material

**NFR5:** The app must support offline access to previously saved stories for reliability

**NFR6:** The system must comply with GDPR requirements for EU users and implement secure data storage for child safety

## User Interface Design Goals

### Overall UX Vision

StoryMagic's interface embodies "Evening Sanctuary Design" - a calming, intuitive experience optimized for cognitively depleted parents during bedtime routines. The design prioritizes speed, simplicity, and reliability over sophisticated features, ensuring parents can successfully create engaging stories without mental strain.

### Key Interaction Paradigms

- **Three-Tap Flow:** Maximum three taps to generate a complete story, minimizing decision fatigue
- **Instant Visual Feedback:** Immediate confirmation of selections to reduce anxiety about progress
- **One-Handed Operation:** All primary actions accessible with thumb navigation for parents holding children
- **Error-Proof Design:** Large touch targets and clear visual hierarchy prevent accidental inputs

### Core Screens and Views

- **Welcome Screen:** Quick access to recent stories and simple "Create New Story" button
- **Child Profile Selection:** Visual grid of child avatars with names for instant recognition
- **Theme Selection Screen:** Large, illustrated theme cards (Adventure, Princess, Animals, etc.)
- **Personalization Screen:** Simple form with 2-3 key details (favorite color, pet, hobby)
- **Story Display Screen:** Clean text layout with large fonts, progress indicator, and save/share options
- **Story Library:** Grid view of saved stories with child's name and theme for easy identification

### Accessibility: WCAG AA

Full compliance with WCAG AA standards including high contrast ratios, scalable text, and screen reader support for parents with visual impairments.

### Branding

Warm, family-friendly aesthetic with soft colors and rounded elements that feel safe and approachable. Visual design should evoke bedtime tranquility - muted blues, soft purples, and warm whites with subtle animations that feel magical but not stimulating.

### Target Device and Platforms: Mobile Only

Optimized specifically for mobile devices (iOS and Android) with responsive design for various screen sizes. No desktop or tablet-specific layouts - focus entirely on phone-based interaction patterns for parents.

### Design System Specifications

**Color System:**
- **Primary:** Soft midnight blue (#2C3E50) for main actions and headers
- **Secondary:** Warm lavender (#9B59B6) for child-focused elements
- **Accent:** Gentle coral (#E74C3C) for save/favorite actions
- **Neutral Gray Scale:** Light backgrounds (#F8F9FA to #6C757D) for text hierarchy
- **Success/Error:** Muted green (#27AE60) and soft red (#E67E22) for feedback

**Typography Scale:**
- **Display:** 28px bold for section headers (readable at arm's length)
- **Headline:** 22px semi-bold for story titles and main CTAs
- **Body:** 18px regular for story text (optimized for reading aloud)
- **Caption:** 14px for metadata and secondary information
- **All fonts:** System fonts (SF Pro on iOS, Roboto on Android) for performance

**Component Specifications:**
- **StoryCard:** 160x120px touch targets with 12px rounded corners
- **ThemeSelector:** 120x120px illustrated cards in 2-column grid
- **StoryReader:** Full-screen layout with 20px line height for comfortable reading
- **Touch Targets:** Minimum 44px for accessibility and tired-finger usability
- **Animations:** 200-300ms timing for responsive feel without jarring interruptions

## Technical Assumptions

### Repository Structure: Monorepo

Single repository containing both mobile app (React Native) and backend API (NestJS) to simplify development workflow and enable shared TypeScript types between frontend and backend.

### Service Architecture

**Monolithic Backend with Modular Structure:** Single NestJS application organized into well-separated modules:
- **Story Generation Module:** Handles OpenAI API integration and prompt management
- **Content Safety Module:** Manages content moderation and safety filtering
- **User Management Module:** Handles child profiles, family accounts, and preferences
- **Story Storage Module:** Manages saved stories, favorites, and offline access

This approach provides clear separation of concerns while maintaining simplicity for single-developer MVP workflow.

### Testing Requirements

**Full Testing Pyramid:** Comprehensive testing strategy including:
- **Unit Tests:** All business logic and utility functions (Jest/Vitest)
- **Integration Tests:** API endpoints and module interactions (Supertest)
- **End-to-End Tests:** Critical user journeys using Detox for React Native
- **Manual Testing:** Content safety validation and parent-child usability sessions

### Additional Technical Assumptions and Requests

**Core Technology Stack:**
- **Frontend:** React Native 0.72+ with TypeScript for cross-platform mobile development
- **Backend:** Single NestJS application with TypeScript and modular architecture
- **Database:** PostgreSQL for reliable data storage with JSON support for story content
- **Authentication:** Firebase Auth for secure user management and family account handling
- **Cloud Infrastructure:** AWS with Polish data residency compliance (eu-central-1 region)

**Development and Deployment:**
- **Package Management:** npm workspaces for monorepo dependency management
- **Build System:** Metro bundler (React Native) and Node.js build process
- **CI/CD:** GitHub Actions for automated testing and deployment
- **Code Quality:** ESLint, Prettier, and TypeScript strict mode for maintainable code

**External Integrations:**
- **OpenAI API:** GPT-4 for story generation with custom safety prompts
- **OpenAI Moderation API:** Content safety filtering as primary defense layer
- **Analytics:** Privacy-focused analytics solution (PostHog or similar)
- **Crash Reporting:** Sentry for error monitoring and performance tracking

**Performance and Reliability:**
- **Offline Capability:** SQLite local storage for saved stories
- **Caching Strategy:** Redis for API response caching and session management
- **Image Optimization:** WebP format with CDN delivery for theme illustrations
- **API Rate Limiting:** Protect against abuse while ensuring smooth user experience

## Epic List

**Epic 1: Foundation & Core Infrastructure**
*Establish project setup, authentication, basic user management, and deliver initial story display functionality*

**Epic 2: Story Generation & Safety**
*Implement AI-powered story creation with comprehensive content safety filtering and pre-generated story library*

**Epic 3: Personalization & User Experience**
*Create child profiles, theme selection, and personalization elements with the three-step story creation flow*

**Epic 4: Story Management & Persistence**
*Enable story saving, favorites, offline access, and story library management for repeated enjoyment*

## Epic 1: Foundation & Core Infrastructure

**Epic Goal:** Establish solid technical foundation for StoryMagic while delivering immediate value through basic story reading functionality. This epic ensures parents can access and read stories from day one, even before AI generation capabilities are complete.

### Story 1.1: Project Setup & Development Environment

As a developer,
I want to establish the complete development environment and project structure,
so that I can efficiently build and deploy the StoryMagic application.

#### Acceptance Criteria

1. React Native monorepo initialized with TypeScript configuration
2. NestJS backend API created with modular folder structure
3. Shared TypeScript types package configured between frontend and backend
4. ESLint, Prettier, and pre-commit hooks established
5. GitHub repository created with CI/CD pipeline using GitHub Actions
6. Development, staging, and production environments configured on AWS

### Story 1.2: Basic Authentication System

As a parent,
I want to access the app securely for demos while having production-ready authentication infrastructure,
so that I can demonstrate the app immediately and deploy with full security later.

#### Acceptance Criteria

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

### Story 1.3: Core Mobile App Shell

As a parent,
I want to open the StoryMagic app and see a welcoming interface,
so that I feel confident using it during bedtime routines.

#### Acceptance Criteria

1. React Native navigation structure implemented (React Navigation)
2. Welcome screen with clean, bedtime-appropriate design
3. Basic app loading states and error boundaries
4. App icons and splash screen configured for iOS and Android
5. Core design system components implemented (buttons, cards, typography)
6. App successfully builds and runs on both iOS and Android devices

### Story 1.4: Static Story Display

As a parent,
I want to read sample stories to my child,
so that we can immediately benefit from the app while other features are being developed.

#### Acceptance Criteria

1. Story reader interface with clean, readable typography (18px body text)
2. 5-7 pre-written Polish stories embedded in the app
3. Story navigation (next/previous page) for longer stories
4. Reading progress indicator at top of screen
5. Stories display correctly on various screen sizes
6. Back button to return to story selection

### Story 1.5: Basic Backend API

As the mobile app,
I want to communicate with a reliable backend service,
so that user data and stories can be managed securely.

#### Acceptance Criteria

1. NestJS API with TypeScript running on AWS
2. PostgreSQL database connected and configured
3. Basic health check endpoint responding correctly
4. API authentication middleware using Firebase Admin SDK with environment-based mock mode (`MOCK_AUTH=true` bypasses validation)
5. CORS configuration for mobile app communication
6. Basic error handling and logging system implemented

### Story 1.6: Firebase Authentication Activation

As a parent,
I want to use secure login flows to protect my family's data,
so that the app is ready for production use with real user accounts.

#### Acceptance Criteria

1. React Native Firebase Auth SDK integration completed
2. Sign-up flow with email/password authentication implemented
3. Sign-in flow with error handling and validation
4. JWT token management and refresh logic implemented
5. Login/logout screens with error handling
6. Environment variable `MOCK_AUTH=false` activates full authentication
7. Seamless migration from mock mode to production authentication

## Epic 2: Story Generation & Safety

**Epic Goal:** Implement the core AI-powered story generation capabilities with comprehensive content safety systems. This epic transforms StoryMagic from a static story reader into an intelligent, personalized story creator while ensuring zero inappropriate content reaches families.

### Story 2.1: OpenAI API Integration

As the backend system,
I want to connect securely to OpenAI's API,
so that I can generate personalized stories for children.

#### Acceptance Criteria

1. OpenAI API client configured with API key management
2. Story generation service module created in NestJS
3. Basic story generation endpoint with error handling
4. API rate limiting implemented to prevent quota exhaustion
5. Response caching strategy for similar story requests
6. API usage monitoring and logging for cost tracking

### Story 2.2: Content Safety System

As a parent,
I want absolute confidence that AI-generated stories are appropriate,
so that I never worry about harmful content during bedtime.

#### Acceptance Criteria

1. OpenAI Moderation API integrated for content filtering
2. Custom safety rules implemented for child-specific content
3. Multi-layer safety validation (pre-generation prompts + post-generation filtering)
4. Inappropriate content logging system for monitoring and improvement
5. Fallback to pre-approved stories if safety checks fail
6. Zero-tolerance policy: any flagged content is immediately rejected

### Story 2.3: Story Prompt Engineering

As a child,
I want stories that are age-appropriate and engaging for my specific age group,
so that I stay interested and entertained throughout the story.

#### Acceptance Criteria

1. Age-specific prompt templates created for 3-4, 5-6, and 7-8 year olds
2. Story length optimization (300-500 words based on age)
3. Polish language prompts with cultural context considerations
4. Story structure templates (beginning, adventure, resolution)
5. Prompt validation system to ensure consistent story quality
6. A/B testing framework for prompt optimization

### Story 2.4: Pre-Generated Story Library

As a parent,
I want immediate access to quality stories when AI generation is slow or unavailable,
so that bedtime routines are never disrupted.

#### Acceptance Criteria

1. Database schema created for storing curated stories
2. 15-20 high-quality Polish stories created and safety-validated
3. Story categorization system (themes: adventure, animals, friendship, etc.)
4. Story metadata including age recommendations and reading time
5. API endpoints for retrieving stories by category and age
6. Fallback logic when AI generation fails or times out

### Story 2.5: Story Generation API

As the mobile app,
I want to request personalized stories through a reliable API,
so that parents can create custom stories for their children.

#### Acceptance Criteria

1. RESTful API endpoint for story generation requests
2. Input validation for story parameters (age, theme, basic details)
3. Asynchronous processing with status polling for longer generations
4. Story response format standardized with metadata
5. Error handling with meaningful messages for mobile app
6. Performance monitoring to ensure 30-second generation time limit

## Epic 3: Personalization & User Experience

**Epic Goal:** Create the signature three-step personalization flow and child profile system that transforms generic stories into personalized adventures where children become the protagonists. This epic delivers the core differentiating user experience of StoryMagic.

### Story 3.1: Child Profile Creation

As a parent,
I want to create a profile for my child with key details,
so that stories can be personalized to make my child the main character.

#### Acceptance Criteria

1. Child profile creation form with name, age, and basic preferences
2. Profile photo upload or avatar selection system
3. Interest tags selection (animals, sports, music, etc.)
4. Profile data validation and storage in PostgreSQL
5. Profile editing functionality for updating preferences
6. Profile deletion with confirmation dialog

### Story 3.2: Theme Selection Interface

As a parent,
I want to quickly choose a story theme that appeals to my child,
so that I can create relevant, engaging stories during our limited bedtime window.

#### Acceptance Criteria

1. Visual theme grid with illustrated cards (120x120px as per design system)
2. Theme categories: Adventure, Animals, Princess/Prince, Space, Friendship, Magic
3. Theme selection with immediate visual feedback (selected state styling)
4. Age-appropriate theme filtering based on child's profile
5. Theme descriptions and sample story hooks for parent guidance
6. Smooth transitions between theme selection and next step

### Story 3.3: Three-Step Story Creation Flow

As a parent,
I want to create a personalized story in maximum three taps,
so that I can generate content quickly without cognitive strain during evening routines.

#### Acceptance Criteria

1. Step 1: Child profile selection with visual profile cards
2. Step 2: Theme selection from categorized grid interface
3. Step 3: Simple personalization form (favorite color, pet, special detail)
4. Progress indicator showing current step (1 of 3, 2 of 3, 3 of 3)
5. Back navigation between steps without losing data
6. Generate story button with loading state and progress feedback

### Story 3.4: Personalization Form

As a parent,
I want to add simple details that make the story uniquely about my child,
so that the generated story feels personal and engaging.

#### Acceptance Criteria

1. Simple form with 2-3 personalization fields (favorite color, pet name, hobby)
2. Optional field handling - stories generate even with minimal input
3. Input validation and character limits for story generation
4. Auto-suggestions based on common Polish children's preferences
5. Form submission with story generation API integration
6. Clear field labels and placeholders in Polish language

### Story 3.5: Story Generation Integration

As a child,
I want to see my name and details woven naturally into an exciting story,
so that I feel like the hero of my own adventure.

#### Acceptance Criteria

1. Story generation request includes child profile and personalization data
2. Generated stories include child's name as protagonist
3. Personalization details (color, pet, etc.) integrated naturally into narrative
4. Age-appropriate story complexity based on child's profile age
5. Polish cultural references and familiar settings incorporated
6. Story quality validation before presenting to parent

## Epic 4: Story Management & Persistence

**Epic Goal:** Transform StoryMagic from a one-time story generator into a comprehensive bedtime companion by enabling story saving, favorites, offline access, and library management. This epic ensures families can revisit beloved stories and rely on the app even without internet connectivity.

### Story 4.1: Story Saving System

As a parent,
I want to save stories that my child loves,
so that we can read them again during future bedtime routines.

#### Acceptance Criteria

1. Save story button prominently displayed during story reading
2. Saved stories stored in PostgreSQL with user association
3. Story metadata preserved (title, theme, personalization details, creation date)
4. Duplicate story detection to prevent saving identical content
5. Saved story confirmation with visual feedback
6. Storage limits (50 saved stories per family) with clear messaging

### Story 4.2: Story Library Interface

As a parent,
I want to easily browse and access our saved stories,
so that I can quickly find favorites during bedtime.

#### Acceptance Criteria

1. Story library accessible from main navigation
2. Grid view showing story cards with title, theme, and creation date
3. Story filtering by theme, child name, and date created
4. Search functionality for finding specific stories by title or content
5. Story preview showing first few sentences before opening full story
6. Recently accessed stories highlighted at top of library

### Story 4.3: Offline Story Access

As a parent,
I want saved stories available without internet connection,
so that bedtime routines aren't disrupted by connectivity issues.

#### Acceptance Criteria

1. SQLite database configured for local story storage on device
2. Automatic offline sync when stories are saved or accessed
3. Offline indicator showing which stories are available locally
4. Background sync when internet connection is restored
5. Offline story reading with full functionality (navigation, progress tracking)
6. Clear messaging when attempting to access non-cached content offline

### Story 4.4: Story Favorites & Organization

As a parent,
I want to mark and organize favorite stories,
so that the most beloved stories are easily accessible.

#### Acceptance Criteria

1. Heart/favorite button on each story with toggle functionality
2. Favorites section in story library showing only marked stories
3. Story organization by custom tags or folders (optional feature)
4. Recently read stories automatically marked for quick access
5. Favorite status synchronized across app restarts and offline usage
6. Export functionality for sharing favorite stories (future consideration)

### Story 4.5: Story Management & Cleanup

As a parent,
I want to manage my story collection efficiently,
so that the library stays organized and within storage limits.

#### Acceptance Criteria

1. Delete story functionality with confirmation dialog
2. Bulk selection for managing multiple stories at once
3. Storage usage indicator showing current capacity (X of 50 stories saved)
4. Automatic cleanup suggestions for old, unread stories
5. Story sharing options for sending stories to other family members
6. Data export functionality for backing up story collection

## Checklist Results Report

**PM Checklist Validation Status: READY FOR ARCHITECT**

### Executive Summary
- **PRD Completeness:** 95% - Comprehensive requirements documentation with all essential elements
- **MVP Scope:** Just Right - Appropriately balanced for single developer, 3-4 month timeline
- **Architecture Readiness:** Ready - Clear technical constraints and requirements provided
- **Business Foundation:** Strong - Built from comprehensive Project Brief with validated user research

### Category Analysis
| Category | Status | Score | Critical Issues |
|----------|--------|-------|-----------------|
| Problem Definition & Context | PASS | 100% | None - Excellent foundation from Project Brief |
| MVP Scope Definition | PASS | 95% | None - Well-bounded scope with clear rationale |
| User Experience Requirements | PASS | 90% | None - "Evening Sanctuary Design" clearly articulated |
| Functional Requirements | PASS | 95% | None - Complete FR/NFR coverage |
| Non-Functional Requirements | PASS | 90% | None - Performance and safety well-defined |
| Epic & Story Structure | PASS | 95% | None - Logical sequence with clear value delivery |
| Technical Guidance | PASS | 90% | Simplified from microservices to monolith appropriately |
| Cross-Functional Requirements | PARTIAL | 85% | Minor - Could expand integration testing details |
| Clarity & Communication | PASS | 95% | None - Clear, consistent documentation |

### Key Strengths
- **Strong User Research Foundation:** Built from comprehensive brainstorming session and Project Brief
- **Clear Problem-Solution Fit:** Evening sanctuary design addresses real parent pain points
- **Appropriate MVP Scope:** Four epics deliver incremental value without over-engineering
- **Safety-First Approach:** Content safety treated as non-negotiable requirement
- **Technical Realism:** Architecture simplified based on single-developer constraints

### Minor Recommendations
1. **Integration Testing:** Consider expanding acceptance criteria for API integration stories
2. **Error Scenarios:** Add more detailed error handling requirements for AI failures
3. **Performance Monitoring:** Define specific metrics beyond the 30-second generation limit

## Next Steps

### UX Expert Prompt
Review this PRD and create detailed wireframes and user flows for the three-step story creation process, focusing on the "Evening Sanctuary Design" principle for cognitively depleted parents.

### Architect Prompt
Design the technical architecture for StoryMagic based on this PRD. Focus on the monolithic NestJS backend with modular structure, React Native frontend, and robust content safety systems. Prioritize the 30-second story generation requirement and offline functionality.
