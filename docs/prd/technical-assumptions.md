# Technical Assumptions

## Repository Structure: Monorepo

Single repository containing both mobile app (React Native) and backend API (NestJS) to simplify development workflow and enable shared TypeScript types between frontend and backend.

## Service Architecture

**Monolithic Backend with Modular Structure:** Single NestJS application organized into well-separated modules:
- **Story Generation Module:** Handles OpenAI API integration and prompt management
- **Content Safety Module:** Manages content moderation and safety filtering
- **User Management Module:** Handles child profiles, family accounts, and preferences
- **Story Storage Module:** Manages saved stories, favorites, and offline access

This approach provides clear separation of concerns while maintaining simplicity for single-developer MVP workflow.

## Testing Requirements

**Full Testing Pyramid:** Comprehensive testing strategy including:
- **Unit Tests:** All business logic and utility functions (Jest/Vitest)
- **Integration Tests:** API endpoints and module interactions (Supertest)
- **End-to-End Tests:** Critical user journeys using Detox for React Native
- **Manual Testing:** Content safety validation and parent-child usability sessions

## Additional Technical Assumptions and Requests

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
