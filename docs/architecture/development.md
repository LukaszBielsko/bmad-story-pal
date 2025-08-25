# Development Setup & Implementation Guide

## Development Environment Setup

### Prerequisites
```bash
# Node.js and npm
node --version  # v18.x or higher
npm --version   # v9.x or higher

# Docker and Docker Compose
docker --version         # 20.x or higher
docker-compose --version # 2.x or higher

# PostgreSQL client (for database management)
psql --version  # 15.x or higher

# React Native CLI
npm install -g @react-native-community/cli

# iOS Development (macOS only)
xcode-select --install
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# Android Development
# Download Android Studio and configure SDK
```

### Project Initialization

#### 1. Repository Setup
```bash
# Clone repository
git clone <repository-url>
cd storymagic

# Initialize monorepo structure
mkdir -p backend mobile shared docs

# Initialize backend (NestJS)
cd backend
npm init -y
npm install @nestjs/cli -g
nest new . --skip-git

# Initialize mobile (React Native)
cd ../mobile
npx react-native init StoryMagicApp --template react-native-template-typescript

# Initialize shared types
cd ../shared
npm init -y
```

#### 2. Backend Development Setup
```bash
cd backend

# Install core dependencies
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install drizzle-orm drizzle-kit pg zod
npm install @nestjs/config @nestjs/jwt
npm install @nestjs/throttler @nestjs/swagger
npm install firebase-admin
npm install openai
npm install redis ioredis
# Note: Using Zod for validation instead of class-validator
npm install @types/pg

# Install development dependencies
npm install -D @types/node typescript ts-node
npm install -D @nestjs/testing jest supertest
npm install -D eslint @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier

# Create environment configuration
cp .env.example .env.development
cp .env.example .env.production
```

#### 3. Mobile Development Setup
```bash
cd mobile

# Install additional dependencies
npm install @reduxjs/toolkit react-redux
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-firebase/app @react-native-firebase/auth
npm install react-native-sqlite-2
npm install react-native-vector-icons
npm install @react-native-async-storage/async-storage

# iOS specific setup
cd ios && pod install && cd ..

# Development dependencies
npm install -D @types/react @types/react-native
npm install -D eslint @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier

# Testing dependencies (deferred to post-MVP)
# npm install -D detox jest
```

### Local Development Infrastructure

#### Docker Compose Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: storymagic_dev
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/database/init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  mailhog:
    image: mailhog/mailhog:latest
    ports:
      - "1025:1025"
      - "8025:8025"

volumes:
  postgres_data:
  redis_data:
```

#### Development Environment Configuration
```bash
# backend/.env.development
NODE_ENV=development
PORT=3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=dev_user
DATABASE_PASSWORD=dev_password
DATABASE_NAME=storymagic_dev

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Firebase (use development project)
FIREBASE_PROJECT_ID=storymagic-dev
FIREBASE_CLIENT_EMAIL=your-dev-service-account@storymagic-dev.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# OpenAI (use development API key with lower limits)
OPENAI_API_KEY=sk-dev-your-development-key

# App Configuration
JWT_SECRET=your-development-jwt-secret
CORS_ORIGIN=http://localhost:3000,http://10.0.2.2:3000

# Logging
LOG_LEVEL=debug
```

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4) - Epic 1

#### Week 1: Project Setup & Infrastructure
```bash
# Development Tasks
□ Set up monorepo structure
□ Initialize NestJS backend with TypeScript
□ Initialize React Native mobile app
□ Set up Docker Compose for local development
□ Configure PostgreSQL database with initial schema
□ Set up Redis for caching
□ Create shared TypeScript types package

# Infrastructure Tasks  
□ Set up AWS development environment
□ Configure RDS PostgreSQL instance
□ Set up ElastiCache Redis cluster
□ Create ECS cluster for API deployment
□ Configure ALB and CloudFront
```

#### Week 2: Authentication System
```bash
# Backend Tasks
□ Implement Firebase Admin SDK integration
□ Create Firebase Auth Guard
□ Set up JWT token validation
□ Create User entity and repository
□ Implement user registration/login endpoints
□ Add request logging and error handling

# Mobile Tasks
□ Set up Firebase Auth in React Native
□ Create authentication screens (Login, Register, Welcome)
□ Implement Redux store for auth state
□ Add biometric authentication support
□ Create secure token storage
```

#### Week 3: Core App Shell
```bash
# Mobile Tasks
□ Set up React Navigation with tab navigator
□ Create main app screens (Home, Library, Profile)
□ Implement design system components (Button, Card, Input)
□ Add loading states and error boundaries
□ Configure app icons and splash screen
□ Set up development and production build configs

# Backend Tasks
□ Create health check endpoints
□ Set up database migrations
□ Implement request rate limiting
□ Add API documentation with Swagger
□ Configure CORS for mobile app
```

#### Week 4: Static Story Display
```bash
# Backend Tasks
□ Create Story entity and repository
□ Seed database with 5-7 Polish stories
□ Implement story retrieval endpoints
□ Add story categorization by theme and age
□ Set up story content validation

# Mobile Tasks
□ Create Story Reader interface
□ Implement story navigation and progress tracking
□ Add story selection and display screens
□ Create offline storage with SQLite
□ Manual testing of story reading flow end-to-end
```

### Phase 2: Story Generation & Safety (Weeks 5-8) - Epic 2

#### Week 5: OpenAI Integration
```bash
# Backend Tasks
□ Set up OpenAI API client with configuration
□ Implement basic story generation service
□ Add generation timeout handling (30 seconds)
□ Create story request tracking entity
□ Implement API usage monitoring and cost tracking
□ Add generation retry logic with exponential backoff

# Backend Testing Tasks
□ Create unit tests for generation service
□ Test generation API endpoints
□ Validate generation performance and reliability
□ Test timeout and error scenarios
```

#### Week 6: Content Safety System
```bash
# Backend Tasks
□ Implement OpenAI Moderation API integration
□ Create custom Polish language safety filters
□ Add positive content validation rules
□ Implement safety violation logging
□ Create content safety middleware
□ Add fallback to pre-approved stories

# Backend Safety Testing Tasks
□ Define comprehensive safety test cases
□ Test edge cases and boundary conditions in API
□ Validate safety filter effectiveness
□ Create safety monitoring dashboard
```

#### Week 7: Polish Story Engineering
```bash
# Backend Tasks
□ Create age-specific prompt templates (3-4, 5-6, 7-8)
□ Implement Polish cultural context integration
□ Add story structure templates (beginning, adventure, resolution)
□ Create prompt validation system
□ Implement A/B testing framework for prompt optimization

# Content Tasks
□ Research Polish children's story themes
□ Create culturally appropriate story elements
□ Manual validation of story quality across different ages
□ Manual validation of story length and complexity
```

#### Week 8: API Integration & Performance
```bash
# Backend Tasks
□ Create RESTful story generation endpoints
□ Implement asynchronous generation with status polling
□ Add comprehensive input validation
□ Optimize generation performance
□ Implement response caching with Redis

# Backend Testing Tasks
□ Backend API end-to-end testing
□ Load testing for concurrent generations
□ Performance optimization and monitoring
□ Manual integration testing with mobile app
```

### Phase 3: Personalization & UX (Weeks 9-12) - Epic 3

#### Week 9: Child Profile System
```bash
# Backend Tasks
□ Create ChildProfile entity and repository
□ Implement profile CRUD operations
□ Add profile photo upload and management
□ Create interest tags and preferences system
□ Add profile validation and constraints

# Mobile Tasks
□ Create child profile creation screens
□ Implement avatar selection/upload
□ Add interest tags selection interface
□ Create profile management screens
□ Manual testing of profile creation flow
```

#### Week 10: Theme Selection Interface
```bash
# Mobile Tasks
□ Create theme selection screen with illustrated cards
□ Implement 2-column grid layout (120x120px cards)
□ Add theme categories (Adventure, Animals, Princess, etc.)
□ Create age-appropriate theme filtering
□ Add theme descriptions and previews
□ Implement smooth transitions between steps

# Design Tasks
□ Create theme illustrations and icons
□ Optimize images for mobile performance
□ Manual testing of theme selection with colleagues
□ Defer accessibility compliance to post-MVP
```

#### Week 11: Three-Step Creation Flow
```bash
# Mobile Tasks
□ Implement step-by-step navigation
□ Create progress indicators (1 of 3, 2 of 3, 3 of 3)
□ Add back navigation without data loss
□ Implement form state management
□ Create generation loading screen with progress
□ Add error handling and retry logic

# UX Manual Testing Tasks
□ Manual testing of complete 3-step flow timing
□ Manual validation of cognitive load with colleagues
□ Manual optimization testing for one-handed operation
□ Defer accessibility features testing to post-MVP
```

#### Week 12: Personalization Integration
```bash
# Backend Tasks
□ Update story generation to include personalization
□ Integrate child profile data into prompts
□ Add personalization validation and processing
□ Implement story quality scoring

# Mobile Tasks
□ Create personalization form (step 3)
□ Add auto-suggestions for Polish context
□ Implement form validation and submission
□ Manual testing of end-to-end personalized story generation
□ Optimize generation loading experience
```

### Phase 4: Story Management (Weeks 13-16) - Epic 4

#### Week 13: Story Saving System
```bash
# Backend Tasks
□ Create UserStory entity for saved stories
□ Implement save/unsave story endpoints
□ Add duplicate detection and handling
□ Create storage limits (50 stories per user)
□ Implement story metadata management

# Mobile Tasks
□ Add save story button to reader interface
□ Create saved story confirmation feedback
□ Implement local storage for offline access
□ Add storage usage indicators
□ Manual testing of save/unsave functionality
```

#### Week 14: Story Library Interface
```bash
# Mobile Tasks
□ Create story library grid view
□ Implement story filtering by theme and child
□ Add search functionality for titles and content
□ Create story preview interface
□ Add recently accessed stories section
□ Implement library navigation and organization

# UX Manual Testing Tasks
□ Manual testing of library browsing experience
□ Manual optimization for large story collections
□ Manual validation of search and filter performance
□ Defer accessibility testing to post-MVP
```

#### Week 15: Offline Capabilities
```bash
# Mobile Tasks
□ Implement SQLite database for offline stories
□ Create automatic offline sync functionality
□ Add offline indicators and status
□ Implement background sync when online
□ Create conflict resolution for sync

# Backend Tasks
□ Create sync endpoints for offline data
□ Implement incremental sync optimization
□ Add sync monitoring and error handling
□ Manual testing of sync performance and reliability
```

#### Week 16: Final Integration & Polish
```bash
# Mobile Tasks
□ Add story favorites and organization
□ Implement bulk story management
□ Create data export functionality
□ Add story sharing capabilities
□ Final UX polish and optimization

# Quality Assurance (MVP Level)
□ Manual end-to-end testing with colleagues
□ Backend security testing and validation
□ Basic performance validation
□ Prepare MVP demo for client presentation

# Post-MVP Quality Assurance (Deferred)
□ Comprehensive automated end-to-end testing
□ Frontend performance testing and optimization
□ Full accessibility compliance verification
□ App Store submission preparation
```

## Development Best Practices

### Code Quality Standards
```bash
# ESLint Configuration
{
  "extends": [
    "@nestjs/eslint-config",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}

# Prettier Configuration
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 100
}
```

### Git Workflow
```bash
# Branch Naming Convention
feature/epic-1-authentication-setup
bugfix/story-generation-timeout
hotfix/content-safety-violation

# Commit Message Format
feat: implement OpenAI story generation service
fix: resolve timeout issue in story generation
docs: update API documentation for story endpoints

# Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Run lint, test, and build checks
4. Create PR with detailed description
5. Code review and approval required
6. Squash and merge to main
```

### Database Management
```bash
# Drizzle ORM Commands
npm run db:generate   # Generate migration files from schema changes
npm run db:migrate    # Apply migrations to database  
npm run db:studio     # Open Drizzle Studio for database inspection

# Development Database Setup
npm run dev:db:reset  # Reset development database
npm run dev:db:seed   # Seed database with test data
```

### Testing Strategy
```bash
# Backend Testing
npm run test          # Unit tests
npm run test:e2e      # Backend API end-to-end tests
npm run test:cov      # Coverage report

# Backend Coverage Requirements
- Unit test coverage: > 80%
- Integration test coverage: All API endpoints
- Security testing and validation

# Frontend Manual Testing
- Basic functional testing by colleagues during development
- User flow validation before client presentations
- Manual smoke testing for critical features
```

### Post-MVP Testing (Deferred)
```bash
# Mobile Testing (Post-MVP Phase)
npm run test          # Jest unit tests for mobile
npm run test:detox    # Mobile E2E tests with Detox
npm run test:ios      # iOS-specific tests
npm run test:android  # Android-specific tests

# Post-MVP Coverage Requirements
- Frontend E2E test coverage: Critical user paths
- Mobile platform-specific testing
- Accessibility compliance verification
- Performance testing and optimization
```

### Performance Monitoring
```bash
# Development Metrics
- API response time < 200ms (excluding generation)
- Story generation time < 30 seconds
- App startup time < 3 seconds
- Memory usage < 100MB on mobile
- Bundle size < 50MB for mobile app

# Monitoring Tools
- Backend: Custom metrics with Prometheus
- Mobile: Flipper for debugging
- Database: pg_stat_statements for query analysis
- API: Request logging and response time tracking
```