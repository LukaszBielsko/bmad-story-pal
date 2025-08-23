**Core Technology Stack:**

- **Frontend:** React Native 0.72+ with TypeScript for cross-platform mobile development
- **Backend:** Single NestJS application with TypeScript and modular architecture
- **Database:** PostgreSQL with Drizzle ORM for type-safe database operations and schema management
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
