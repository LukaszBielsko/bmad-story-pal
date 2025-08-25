**Core Technology Stack:**

- **Frontend:** React Native 0.79.5 with React 19.0.0 and TypeScript for cross-platform mobile development
- **Backend:** Single NestJS application with TypeScript and modular architecture
- **Database:** PostgreSQL with Drizzle ORM for type-safe database operations and schema management
- **Authentication:** Firebase Auth for secure user management and family account handling
- **Cloud Infrastructure:** AWS with Polish data residency compliance (eu-central-1 region)

**Mobile Development Stack:**

- **Expo SDK:** 53.0.20 for development tooling and native capabilities
- **Navigation:** Expo Router with file-based routing (replaces React Navigation)
- **Styling:** NativeWind 2.0.11 with TailwindCSS 3.3.2 integration
- **Fetching data:** React Query 5.83.0 for efficient data fetching and caching
- **State Management:** Zustand 5.0.2 for simple, type-safe state management
- **Animations:** React Native Reanimated 3.17.4 for smooth, performant animations
- **Command Structure:** npm workspaces with `npm run dev:mobile` from root

**Development and Deployment:**

- **Package Management:** npm workspaces for monorepo dependency management
- **Build System:** Metro bundler (React Native) via Expo 53.0.20 and Node.js build process
- **Mobile Navigation:** Expo Router with file-based routing and TypeScript support
- **Security:** Expo Secure Store 14.1.4 for secure key storage
- **CI/CD:** GitHub Actions for automated backend testing and deployment
- **Code Quality:** ESLint, Prettier, and TypeScript strict mode for maintainable code

**External Integrations:**

- **OpenAI API:** GPT-4 for story generation with custom safety prompts
- **OpenAI Moderation API:** Content safety filtering as primary defense layer
- **Analytics:** Privacy-focused analytics solution (PostHog or similar)
- **Crash Reporting:** Sentry for error monitoring and performance tracking

**Performance and Reliability:**

- **Database Monitoring:** @nestjs/terminus for health checks and connectivity monitoring
- **Offline Capability:** SQLite local storage for saved stories
- **Caching Strategy:** Redis for API response caching and session management
- **Image Optimization:** WebP format with CDN delivery for theme illustrations
- **API Rate Limiting:** Protect against abuse while ensuring smooth user experience

**Database Technology Details:**

- **ORM:** Drizzle ORM with PostgreSQL driver for type-safe queries and migrations
- **Schema Management:** Co-located table definitions with centralized schema aggregation
- **Migration System:** drizzle-kit for automated migration generation and deployment
- **Connection Management:** Node.js pg Pool with environment-based configuration
- **Health Monitoring:** Custom database health indicators integrated with Terminus
