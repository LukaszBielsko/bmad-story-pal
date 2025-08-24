# StoryMagic Technical Architecture Overview

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │     NestJS      │    │   PostgreSQL    │
│   Mobile App    │◄──►│   Monolithic    │◄──►│   + Redis       │
│                 │    │     API         │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ SQLite Offline  │    │   OpenAI API    │    │   AWS Cloud     │
│    Storage      │    │ + Safety Layer  │    │ Infrastructure  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Core Technology Stack
- **Frontend:** React Native 0.72+ with TypeScript
- **Backend:** NestJS with modular architecture
- **Database:** PostgreSQL (primary) + SQLite (offline)
- **Authentication:** Firebase Auth (environment-configurable with mock mode)
- **AI:** OpenAI GPT-4 with safety filtering
- **Infrastructure:** AWS (eu-central-1)
- **Caching:** Redis for API responses

## Key Design Principles

### Single Developer Optimization
- Monolithic backend for simplified deployment
- Shared TypeScript types between frontend/backend
- Familiar technology stack (React Native + NestJS)
- Clear separation of concerns through modules

### Performance Requirements
- **Story Generation:** <30 seconds with fallback
- **App Load Time:** <3 seconds
- **Offline Sync:** Background synchronization
- **Uptime:** 99.9% availability target

### Safety First
- **Zero Tolerance:** No inappropriate content reaches users
- **Multi-Layer Validation:** OpenAI + custom Polish filters
- **Fallback System:** Pre-approved stories when AI fails
- **Monitoring:** Real-time safety violation tracking

### GDPR Compliance
- **Data Residency:** EU-central-1 for Polish users
- **Privacy:** Minimal data collection, secure storage
- **User Rights:** Data export, deletion capabilities
- **Child Safety:** Age-appropriate content validation

### Dual-Mode Authentication Strategy
- **Development/Demo Mode:** `MOCK_AUTH=true` - Direct app access, backend auth bypass
- **Production Mode:** `MOCK_AUTH=false` - Full Firebase authentication flow
- **Benefits:** Rapid demo capability with zero code waste or technical debt

## Module Architecture

### Backend Modules (NestJS)
1. **User Management Module** - Authentication, user profiles, child profiles
2. **Story Generation Module** - OpenAI integration, prompt engineering
3. **Content Safety Module** - Multi-layer content validation
4. **Story Storage Module** - Story saving, library management

### Frontend Architecture (React Native)
1. **Authentication Flow** - Firebase Auth integration
2. **Story Creation Flow** - 3-step personalization process
3. **Story Reading Interface** - Optimized for bedtime use
4. **Offline Management** - SQLite sync and fallback

## Development Timeline

### 12-Week MVP + 4-Week Deployment Plan
- **Month 1:** Epic 1 - Foundation (Local Development Focus)
- **Month 2:** Epic 2 - Story Generation & Safety
- **Month 3:** Epic 3 - Personalization & User Experience
- **Month 4:** Epic 4 - Story Management & Persistence
- **MVP VALIDATION PERIOD** (2-4 weeks user testing)
- **Month 5:** Epic 5 - Production Infrastructure & Deployment

## Related Documentation
- [Database Schema](./architecture-database.md)
- [API Specifications](./architecture-api.md)
- [Frontend Architecture](./architecture-frontend.md)
- [Infrastructure & Deployment](./architecture-infrastructure.md)
- [Security Architecture](./architecture-security.md)
- [Development Setup](./architecture-development.md)