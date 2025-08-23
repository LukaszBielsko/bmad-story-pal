# Database Architecture Refactoring Decision Record

**Date:** 2025-01-23  
**Status:** Agreed  
**Architect:** Winston  

## **Context**
Current implementation has Drizzle ORM database connection directly in `app.module.ts` with a TODO comment indicating need for proper DatabaseModule. After researching NestJS + Drizzle best practices, we agreed on a simpler MVP-focused approach rather than enterprise-level complexity.

## **Agreed Changes**

### **✅ What We Will Do**
1. **Implement Health Check** - Add database connectivity monitoring using @nestjs/terminus
2. **Keep Simple MVP Structure** - Use the clean, straightforward architecture from db.md

### **❌ What We Will NOT Do**
1. **No Complex DatabaseModule** - Skip sophisticated connection pooling configurations
2. **No Configuration Validation** - Skip Zod-based validation for MVP
3. **No Advanced Migration Management** - Keep basic drizzle-kit setup  
4. **No Repository Pattern** - Stick with direct Drizzle usage in services

### **Architecture Decision**
- **Global DatabaseModule** with single 'DATABASE' provider
- **Co-located table definitions** within feature modules (*.table.ts)
- **Centralized schema aggregation** at `src/database/schema/index.ts`
- **Simple connection string** configuration via environment variables
- **Health check endpoint** at `/health` for monitoring

## **Implementation Details**

### **Health Check Addition**
- Create `src/health/` module with DatabaseHealthIndicator
- Use `SELECT 1` query to verify database connectivity
- Return response time metrics
- Integrate with existing 'DATABASE' injection token

### **File Structure Maintained**
```
src/
├── database/
│   ├── database.module.ts (Global module)
│   ├── relations.ts (Centralized relations)
│   └── schema/index.ts (Schema aggregator)
├── health/ (NEW)
│   ├── health.module.ts
│   ├── health.controller.ts
│   └── database-health.indicator.ts
└── [feature-modules]/
    ├── *.table.ts (Table definitions)
    └── *.service.ts (Uses @Inject('DATABASE'))
```

## **Rationale**

### **Why Simple Approach?**
1. **MVP Focus** - Avoid over-engineering for initial release
2. **Maintainability** - Easier for team to understand and modify
3. **Boring Technology** - Proven, reliable patterns
4. **Faster Development** - Less boilerplate and configuration

### **Why Health Checks?**
1. **Production Monitoring** - Essential for deployment health
2. **DevOps Integration** - Standard requirement for orchestration
3. **Debugging** - Quick database connectivity verification
4. **Minimal Overhead** - Simple implementation with big benefits

## **Migration Steps**

1. **Remove current database setup** from `app.module.ts`
2. **Create DatabaseModule** as global provider
3. **Add health check module** with database indicator
4. **Install @nestjs/terminus** dependency
5. **Update documentation** to reflect new structure

## **Success Criteria**
- [ ] Database connection works through new DatabaseModule
- [ ] Health endpoint returns database connectivity status
- [ ] All existing functionality remains intact
- [ ] No breaking changes to existing services
- [ ] Documentation updated to reflect changes

## **Future Considerations**
When moving beyond MVP, consider:
- Connection pooling optimization
- Configuration validation with Zod
- Advanced migration workflows
- Database monitoring and alerting
- Performance optimization

---

**Next Actions:**
1. Implement health check module
2. Refactor app.module.ts to use DatabaseModule  
3. Update architecture documentation
4. Test database connectivity and health endpoint