# Coding Standards

## TypeScript Standards

### Configuration
- **Strict Mode**: Always enabled (`"strict": true`)
- **No Implicit Any**: Explicit typing required
- **Strict Null Checks**: Handle null/undefined explicitly

### Type Definitions
- **Interfaces**: Use for object shapes and contracts
- **Types**: Use for unions, intersections, and computed types
- **Generics**: Use descriptive names (`TData`, `TResponse` vs `T`, `U`)

### Naming Conventions
- **Classes/Interfaces**: PascalCase (`UserService`, `ApiResponse`)
- **Variables/Functions**: camelCase (`userId`, `getUserData`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINT`, `MAX_RETRY_COUNT`)
- **Enums**: PascalCase with descriptive values (`UserRole.ADMIN`)

### Import/Export Patterns
```typescript
// Prefer named imports
import { UserService, ApiClient } from './services';

// Use barrel exports for modules
export * from './user.service';
export * from './api.client';

// Default exports only for main module entry points
export default UserModule;
```

## React Native Standards

### Component Structure
```typescript
interface Props {
  userId: string;
  onPress?: () => void;
}

export const UserProfile: React.FC<Props> = ({ userId, onPress }) => {
  // Hooks first
  const [loading, setLoading] = useState(false);
  const user = useUser(userId);
  
  // Event handlers
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);
  
  // Early returns
  if (!user) return <LoadingSpinner />;
  
  // Main render
  return (
    <View>
      {/* Component JSX */}
    </View>
  );
};
```

### Hook Conventions
- **Custom Hooks**: Start with `use` prefix (`useUser`, `useStoryData`)
- **State**: Descriptive names (`isLoading` not `loading`)
- **Effects**: Clean up subscriptions and timers
- **Dependencies**: Include all referenced values

### Platform-Specific Code
```typescript
// Use .ios.ts/.android.ts for platform files
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: 0 },
    }),
  },
});
```

## NestJS Backend Standards

### Module Organization
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService, FirebaseService, FirebaseAuthGuard],
  exports: [UsersService, FirebaseService, FirebaseAuthGuard],
})
export class UserManagementModule {}
```

### Controller Layer
```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully' })
  async getUserById(
    @Param(new ZodValidationPipe(userIdParamSchema)) params: UserIdParamRequest,
  ): Promise<User> {
    const user = await this.usersService.getUserById(params.id);
    if (!user) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
    return user;
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) createUserData: CreateUserRequest,
  ): Promise<User> {
    return this.usersService.createUser(createUserData);
  }
}
```

### Service Layer
- **Single Responsibility**: Each service handles one domain
- **Dependency Injection**: Constructor injection preferred
- **Error Handling**: Throw specific exceptions (`NotFoundException`)
- **Business Logic**: Keep in services, not controllers

### Service Pattern with Drizzle ORM
```typescript
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('DATABASE') private db: NodePgDatabase,
  ) {}
  
  async getUserById(id: string): Promise<User | null> {
    try {
      const [user] = await this.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return user || null;
    } catch (error) {
      this.logger.error(`Failed to get user ${id}: ${error.message}`);
      throw error;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const [createdUser] = await this.db
        .insert(users)
        .values(userData)
        .returning();

      this.logger.log(`Created user: ${createdUser.id}`);
      return createdUser;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw error;
    }
  }
}
```

## Database Standards

### Drizzle ORM Architecture

#### Database Module Pattern
```typescript
// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get('DATABASE_URL'),
        });
        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
```

#### Service Integration Pattern
```typescript
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('DATABASE') private db: NodePgDatabase<typeof schema>,
  ) {}
  
  async getUserById(id: string): Promise<User | null> {
    try {
      const [user] = await this.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return user || null;
    } catch (error) {
      this.logger.error(`Failed to get user ${id}: ${error.message}`);
      throw error;
    }
  }
}
```

### Drizzle config

#### Drizzle config file
```typescript
import { defineConfig } from 'drizzle-kit';
import { registerAs } from '@nestjs/config';

// 1) Configuration for the Drizzle CLI/code-gen
export const drizzleDatabaseConfig = defineConfig({
  schema: './src/**/*.table.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});

// 2) Configuration factory consumed by NestJS ConfigModule
export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

```

#### Drizzle config file location
apps/api/src/config/database.config.ts

### Drizzle Schema Definitions

#### Table Definition Standards
```typescript
// user-management/user.table.ts
import { pgTable, varchar, timestamp, json, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const users = pgTable('users', {
  // Firebase UID as primary key
  id: varchar('id', { length: 128 }).primaryKey(),
  
  // Basic user information
  email: varchar('email', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 255 }),
  
  // User preferences as JSON
  preferences: json('preferences').$type<{
    theme?: 'light' | 'dark';
    language?: string;
  }>(),
  
  // Account status
  isActive: boolean('is_active').default(true).notNull(),
  
  // Audit timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export types
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
```

#### Schema Organization
- **Co-location**: Table definitions live with their feature modules (`*.table.ts`)
- **Centralized Export**: All schemas exported from `src/database/schema/index.ts`
- **Relations**: Defined separately in `src/database/relations.ts` to avoid circular imports

```typescript
// src/database/schema/index.ts
export * from '../../user-management/user.table';
export * from '../../story-generation/story.table';
export * from '../../story-generation/character.table';
```

#### Naming Conventions
- **Tables**: Snake_case (`user_stories`, `story_characters`)
- **Columns**: Snake_case (`created_at`, `display_name`)
- **Primary Keys**: `id` for single column, descriptive for composite
- **Foreign Keys**: `{table_name}_id` format (`user_id`, `story_id`)
- **Junction Tables**: `{table1}_{table2}` (`user_stories`, `story_characters`)

### Query Patterns

#### Standard CRUD Operations
```typescript
// Create
const [newUser] = await db.insert(users).values(userData).returning();

// Read single
const user = await db.query.users.findFirst({
  where: eq(users.id, userId),
});

// Read with relations
const userWithStories = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    stories: true,
  },
});

// Update
await db
  .update(users)
  .set({ updatedAt: new Date() })
  .where(eq(users.id, userId));

// Delete
await db.delete(users).where(eq(users.id, userId));
```

#### Transaction Patterns
```typescript
await db.transaction(async (tx) => {
  const [user] = await tx.insert(users).values(userData).returning();
  await tx.insert(profiles).values({ userId: user.id, ...profileData });
});
```

### Migration Guidelines
- **File Naming**: Use drizzle-kit generated timestamps
- **Schema Generation**: `npm run db:generate` for migration creation
- **Migration Deployment**: `npm run db:migrate` for applying changes
- **Schema Export**: Always export new tables from schema/index.ts
- **Relations Update**: Update relations.ts when adding foreign keys

#### Migration Workflow
```bash
# 1. Modify schema files
# 2. Generate migration
npm run db:generate

# 3. Review generated SQL
cat drizzle/migrations/[timestamp]_*.sql

# 4. Apply migration
npm run db:migrate
```

## Error Handling

### Frontend Error Boundaries
```typescript
export class ErrorBoundary extends React.Component {
  // Catch and handle React errors gracefully
  // Log to crash reporting service
}
```

### Backend Exception Filters
```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Structured error responses
    // Security-conscious error messages
  }
}
```

## Security Guidelines

### Environment Variables
```typescript
// Use config service, never hardcode
@Injectable()
export class ConfigService {
  get databaseUrl(): string {
    return process.env.DATABASE_URL!;
  }
}
```

### Input Validation with Zod
```typescript
// user-management/user.schema.ts
import { z } from 'zod';

// Schema for creating a new user
export const createUserSchema = z.object({
  id: z.string().min(1).max(128), // Firebase UID
  email: z.string().email('Invalid email format').max(255),
  displayName: z.string().min(1).max(255).optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).optional(),
    language: z.string().min(2).max(10).optional(),
  }).optional(),
});

// Export inferred types
export type CreateUserRequest = z.infer<typeof createUserSchema>;

// ZodValidationPipe usage in controllers
@Post()
async createUser(
  @Body(new ZodValidationPipe(createUserSchema)) userData: CreateUserRequest,
): Promise<User> {
  return this.usersService.createUser(userData);
}
```

### Authentication
- **JWT Tokens**: Short-lived access tokens
- **Refresh Tokens**: Secure HTTP-only cookies
- **Guards**: Protect all sensitive routes
- **Role-Based**: Implement proper authorization

## File Organization

### Directory Structure
```
src/
├── modules/           # Feature modules
│   ├── user/
│   ├── story/
│   └── auth/
├── shared/           # Shared utilities
│   ├── decorators/
│   ├── guards/
│   └── pipes/
├── config/          # Configuration
└── database/        # Database files
```

### Import Ordering
1. Node modules
2. Internal modules (absolute paths)
3. Relative imports
4. Type-only imports last

```typescript
import React from 'react';
import { View } from 'react-native';

import { UserService } from '@/modules/user';
import { ApiClient } from '@/shared/api';

import './styles.css';

import type { User } from './types';
```

## Testing Standards

### Unit Tests
```typescript
describe('UserService', () => {
  let service: UserService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    
    service = module.get<UserService>(UserService);
  });
  
  it('should create a user', async () => {
    // Arrange, Act, Assert pattern
  });
});
```

### Integration Tests
- **Test Database**: Separate from development
- **Data Cleanup**: Reset between tests
- **Real Dependencies**: Test actual integrations

## Code Quality

### ESLint Rules
- `@typescript-eslint/recommended`
- `react-hooks/exhaustive-deps`
- `import/order` for import sorting
- Custom rules for project-specific patterns

### Prettier Configuration
- **Tab Width**: 2 spaces
- **Max Line Length**: 100 characters
- **Semicolons**: Always
- **Quotes**: Single quotes
- **Trailing Commas**: ES5

### Git Commit Messages
```
type(scope): description

feat(auth): add password reset functionality
fix(story): resolve character limit validation
docs(readme): update installation instructions
refactor(user): simplify profile data fetching
```

### Code Comments
- **Why, not What**: Explain reasoning, not implementation
- **Complex Logic**: Document non-obvious algorithms
- **TODO Comments**: Include ticket numbers
- **JSDoc**: For public APIs and exported functions

## Performance Guidelines

### React Native
- **FlatList**: For large lists instead of ScrollView
- **Image Optimization**: Use WebP, implement lazy loading
- **Bundle Size**: Code splitting for large features
- **Memory**: Avoid memory leaks in listeners/timers

### Backend
- **Database Queries**: Use indexes, avoid N+1 problems
- **Caching**: Redis for frequently accessed data
- **Rate Limiting**: Protect against abuse
- **Pagination**: Implement for large datasets

## Monitoring and Logging

### Frontend
- **Error Tracking**: Sentry integration
- **Performance**: Monitor render times
- **User Analytics**: Privacy-focused tracking

### Backend
- **Structured Logging**: JSON format with correlation IDs
- **Health Checks**: Endpoint monitoring
- **Metrics**: Database connections, response times
- **Alerts**: Critical error thresholds
