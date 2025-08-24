# Story 1.2: Basic Authentication System

As a parent,
I want to access the app securely for demos while having production-ready authentication infrastructure,
so that I can demonstrate the app immediately and deploy with full security later.

## Acceptance Criteria

**Phase 1 (MVP Demo Mode):**
1. Firebase Authentication integrated in NestJS backend using Firebase Admin SDK
2. Environment variable `MOCK_AUTH=true` bypasses authentication validation
3. Frontend launches directly to main app interface (no login screens)
4. Protected API endpoints configured with mock authentication bypass
5. Basic user profile data structure created using **Drizzle ORM** (not TypeORM)

**Database & ORM Migration Requirements:**
6. Replace TypeORM configuration with Drizzle ORM in app.module.ts
7. Create user.table.ts file using Drizzle schema format
8. Implement Drizzle database provider with PostgreSQL connection
9. Update all database dependencies in package.json (remove typeorm, class-validator, class-transformer; add drizzle-orm, drizzle-kit, zod)
10. Configure database scripts: db:generate, db:migrate, db:studio

**Validation System Migration:**
11. Replace class-validator with Zod for all input validation
12. Create user.schema.ts with Zod validation schemas
13. Implement ZodValidationPipe in common/pipes/zod-validation.pipe.ts
14. Update all controller methods to use ZodValidationPipe instead of DTOs
15. Convert any existing DTO classes to Zod schema definitions

**File Naming Convention Implementation:**
16. Follow entity-name.table.ts format for database schemas
17. Follow entity-name.schema.ts format for validation schemas
18. Ensure consistent naming across user-management module
19. Document file naming conventions in architecture/backend.md

**Documentation Consistency Updates:**
20. Update docs/prd.md technology stack to reference Drizzle ORM + Zod
21. Update docs/architecture/backend.md with Drizzle examples and ZodValidationPipe
22. Update docs/architecture/coding-standards.md with Drizzle and Zod examples
23. Update docs/architecture/index.md technology stack references
24. Update docs/architecture/development.md dependency installation commands
25. Update PROJECT-SETUP-SUMMARY.md to reflect ORM and validation changes

**Implementation Verification:**
26. All TypeORM references removed from codebase
27. All class-validator references removed from codebase
28. Database connection functional using Drizzle ORM
29. Zod validation working for all API endpoints

**Phase 2 (Production Ready - Story 1.6):**
30. Frontend login/signup screens implementation
31. JWT token management and refresh logic
32. Full Firebase Auth flow activation via `MOCK_AUTH=false`
