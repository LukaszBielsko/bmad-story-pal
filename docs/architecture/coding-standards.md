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
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
```

### Controller Layer
```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get(':id')
  @ApiResponse({ type: UserDto })
  async getUser(
    @Param('id', new ZodValidationPipe(z.string().uuid())) id: string
  ): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) userData: CreateUserRequest
  ): Promise<UserDto> {
    return this.userService.create(userData);
  }
}
```

### Service Layer
- **Single Responsibility**: Each service handles one domain
- **Dependency Injection**: Constructor injection preferred
- **Error Handling**: Throw specific exceptions (`NotFoundException`)
- **Business Logic**: Keep in services, not controllers

### Repository Pattern
```typescript
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }
}
```

## Database Standards

### Entity Definitions
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 255 })
  email: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Migration Guidelines
- **Descriptive Names**: `CreateUserTable`, `AddEmailIndexToUsers`
- **Reversible**: Always implement both `up` and `down`
- **Data Migration**: Separate from schema changes

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

### Input Validation
```typescript
// Use DTOs with class-validator
export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  password: string;
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