# Database Architecture Changes Decision

**Date:** 2025-01-23  
**Decision ID:** DB-001  
**Status:** Approved  

## **Problem Statement**
The current Drizzle ORM implementation is embedded directly in `app.module.ts` with a TODO comment indicating the need for a proper DatabaseModule. This creates coupling and makes the application harder to test and maintain.

## **Decision**
Implement a simplified MVP-focused database architecture with health monitoring, avoiding over-engineered enterprise patterns that would slow development velocity.

## **Considered Options**

### Option A: Enterprise-Grade Architecture ❌
- Complex connection pooling with extensive configuration
- Zod validation for all database configurations  
- Repository pattern abstraction layer
- Advanced migration management workflows

**Rejected because:** Too complex for MVP stage, would slow development

### Option B: Simple MVP Architecture ✅ **CHOSEN**
- Global DatabaseModule with single provider
- Basic health check implementation
- Direct Drizzle usage in services
- Minimal configuration overhead

**Chosen because:** Balances simplicity with production requirements

### Option C: Keep Status Quo ❌
- Leave database connection in app.module.ts
- No health monitoring
- Continue with existing technical debt

**Rejected because:** Doesn't address monitoring needs or architectural concerns

## **Implementation Summary**

### **New Components**
- `src/health/` module with database health indicator
- Health endpoint at `GET /health`
- @nestjs/terminus integration

### **Maintained Simplicity**
- Co-located table definitions (*.table.ts)
- Centralized schema aggregation
- Environment-based configuration
- Direct service injection pattern

## **Consequences**

### **Positive**
- ✅ Production health monitoring capability
- ✅ Cleaner separation of concerns
- ✅ Faster development velocity maintained
- ✅ Easy to understand and modify

### **Negative**
- ❌ May need refactoring when scaling beyond MVP
- ❌ Less sophisticated than enterprise solutions
- ❌ Manual configuration management

### **Neutral**
- 🔄 Additional dependency (@nestjs/terminus)
- 🔄 New module to maintain

## **Success Metrics**
- Database connectivity monitored via `/health` endpoint
- Zero breaking changes to existing functionality
- Development velocity maintained or improved
- Team onboarding remains straightforward

## **Review Date**
This decision should be reviewed when:
- Application moves beyond MVP phase
- Team size grows beyond 5 developers
- Performance issues emerge
- Production scale requires connection pooling

---

**Implementation Owner:** Development Team  
**Approved By:** Winston (Architect)  
**Related Documents:** docs/architecture/database-refactoring-decision.md