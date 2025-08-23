# NestJS Backend Architecture

## Module Structure

```
src/
├── app.module.ts                    # Root application module
├── main.ts                         # Application bootstrap
├── config/
│   ├── database.config.ts          # PostgreSQL configuration
│   ├── firebase.config.ts          # Firebase Auth setup
│   ├── openai.config.ts           # OpenAI API configuration
│   ├── redis.config.ts            # Redis caching setup
│   └── app.config.ts              # Environment variables
├── common/
│   ├── guards/
│   │   ├── firebase-auth.guard.ts  # JWT authentication
│   │   └── rate-limit.guard.ts     # API rate limiting
│   ├── filters/
│   │   ├── all-exceptions.filter.ts # Global error handling
│   │   └── validation.filter.ts    # Input validation errors
│   ├── interceptors/
│   │   ├── logging.interceptor.ts  # Request/response logging
│   │   ├── timeout.interceptor.ts  # Request timeout handling
│   │   └── transform.interceptor.ts # Response transformation
│   ├── decorators/
│   │   ├── user.decorator.ts       # Current user injection
│   │   └── api-docs.decorator.ts   # Swagger documentation
│   ├── pipes/
│   │   ├── validation.pipe.ts      # DTO validation
│   │   └── parse-uuid.pipe.ts      # UUID parsing
│   └── types/
│       ├── request-user.interface.ts
│       ├── api-response.interface.ts
│       └── pagination.interface.ts
├── user-management/                 # User & child profile management
│   ├── user-management.module.ts
│   ├── controllers/
│   │   ├── users.controller.ts
│   │   └── child-profiles.controller.ts
│   ├── services/
│   │   ├── users.service.ts
│   │   └── child-profiles.service.ts
│   ├── entities/
│   │   ├── user.entity.ts
│   │   └── child-profile.entity.ts
│   └── schemas/
│       ├── user.schemas.ts
│       └── child-profile.schemas.ts
├── story-generation/               # OpenAI integration & generation
│   ├── story-generation.module.ts
│   ├── controllers/
│   │   └── story-generation.controller.ts
│   ├── services/
│   │   ├── story-generation.service.ts
│   │   ├── openai.service.ts
│   │   ├── prompt-builder.service.ts
│   │   └── story-request-tracker.service.ts
│   ├── entities/
│   │   └── story-request.entity.ts
│   └── schemas/
│       ├── generate-story.schemas.ts
│       └── story-generation.schemas.ts
├── content-safety/                 # Multi-layer content validation
│   ├── content-safety.module.ts
│   ├── services/
│   │   ├── content-moderation.service.ts
│   │   ├── openai-moderation.service.ts
│   │   ├── custom-safety-filters.service.ts
│   │   └── safety-logger.service.ts
│   ├── entities/
│   │   └── safety-violation.entity.ts
│   └── schemas/
│       ├── moderation.schemas.ts
│       └── safety-result.schemas.ts
├── story-storage/                  # Story saving & library management
│   ├── story-storage.module.ts
│   ├── controllers/
│   │   ├── stories.controller.ts
│   │   └── user-stories.controller.ts
│   ├── services/
│   │   ├── stories.service.ts
│   │   ├── user-stories.service.ts
│   │   └── pre-generated-stories.service.ts
│   ├── entities/
│   │   ├── story.entity.ts
│   │   └── user-story.entity.ts
│   └── schemas/
│       ├── story.schemas.ts
│       └── user-story.schemas.ts
├── sync/                           # Offline synchronization
│   ├── sync.module.ts
│   ├── controllers/
│   │   └── sync.controller.ts
│   ├── services/
│   │   ├── offline-sync.service.ts
│   │   └── sync-conflict-resolver.service.ts
│   └── schemas/
│       ├── sync-request.schemas.ts
│       └── sync-response.schemas.ts
└── analytics/                      # Usage analytics & monitoring
    ├── analytics.module.ts
    ├── controllers/
    │   └── analytics.controller.ts
    ├── services/
    │   ├── analytics.service.ts
    │   └── performance-monitoring.service.ts
    └── schemas/
        └── analytics-event.schemas.ts
```

## File Naming Conventions

### Database Schema Files
- **Format**: `entity-name.table.ts`
- **Example**: `user.table.ts`, `story.table.ts`
- **Purpose**: Define database table structure using Drizzle schema
- **Location**: In the module folder (e.g., `src/user-management/user.table.ts`)

### Validation Schema Files
- **Format**: `entity-name.schema.ts`
- **Example**: `user.schema.ts`, `story.schema.ts` 
- **Purpose**: Define validation rules using Zod schemas
- **Location**: In the module folder (e.g., `src/user-management/user.schema.ts`)

### Service Files
- **Format**: `entity-name.service.ts`
- **Example**: `user.service.ts`, `story-generation.service.ts`

### Controller Files
- **Format**: `entity-name.controller.ts`
- **Example**: `user.controller.ts`, `stories.controller.ts`

## Zod Validation Integration

### Zod Schema Setup
```typescript
// shared/schemas/generate-story.schemas.ts
import { z } from 'zod';

export const PersonalizationSchema = z.object({
  favoriteColor: z.string().min(2).max(20).optional(),
  petName: z.string().min(2).max(30).optional(),
  hobby: z.string().min(2).max(50).optional(),
  specialDetail: z.string().min(2).max(100).optional(),
});

export const GenerateStorySchema = z.object({
  childProfileId: z.string().uuid(),
  theme: z.enum(['adventure', 'animals', 'princess', 'space', 'friendship', 'magic']),
  personalization: PersonalizationSchema.optional(),
});

export const CreateChildProfileSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().int().min(3).max(8),
  interests: z.array(z.string()).max(10).optional(),
  preferences: z.record(z.unknown()).optional(),
});

export const StoryFiltersSchema = z.object({
  childProfileId: z.string().uuid().optional(),
  theme: z.string().optional(),
  isFavorite: z.boolean().optional(),
  search: z.string().min(1).max(100).optional(),
  limit: z.number().int().min(1).max(50).default(20),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(['created_at', 'last_read_at', 'times_read']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Export types for use throughout the application
export type GenerateStoryRequest = z.infer<typeof GenerateStorySchema>;
export type CreateChildProfileRequest = z.infer<typeof CreateChildProfileSchema>;
export type StoryFiltersRequest = z.infer<typeof StoryFiltersSchema>;
```

### Zod Validation Pipe
```typescript
// common/pipes/zod-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(
          (err) => `${err.path.join('.')}: ${err.message}`
        );
        throw new BadRequestException({
          error: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: errorMessages,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
```

### Controller Implementation with Zod
```typescript
// story-generation/controllers/story-generation.controller.ts
import { Controller, Post, Body, UsePipes, UseGuards, Req } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { GenerateStorySchema, GenerateStoryRequest } from '../schemas/generate-story.schemas';
import { StoryGenerationService } from '../services/story-generation.service';

@Controller('stories')
@UseGuards(FirebaseAuthGuard)
export class StoryGenerationController {
  constructor(private storyGenerationService: StoryGenerationService) {}

  @Post('generate')
  @UsePipes(new ZodValidationPipe(GenerateStorySchema))
  async generateStory(
    @Body() generateStoryData: GenerateStoryRequest,
    @Req() request: any,
  ) {
    const userId = request.user.uid;
    
    const story = await this.storyGenerationService.generateStory(
      generateStoryData,
      userId
    );
    
    return {
      story,
      generationTime: story.generationTime,
      requestId: story.requestId,
    };
  }
}
```

### Query Parameter Validation
```typescript
// story-storage/controllers/user-stories.controller.ts
import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { StoryFiltersSchema, StoryFiltersRequest } from '../schemas/story.schemas';

@Controller('user-stories')
@UseGuards(FirebaseAuthGuard)
export class UserStoriesController {
  constructor(private userStoriesService: UserStoriesService) {}

  @Get()
  async getUserStories(
    @Query(new ZodValidationPipe(StoryFiltersSchema)) filters: StoryFiltersRequest,
    @Req() request: any,
  ) {
    const userId = request.user.uid;
    
    return await this.userStoriesService.findUserStories(userId, filters);
  }
}
```

### Development Dependencies
```json
{
  "dependencies": {
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/zod": "^3.22.4"
  }
}
```

## Core Services Implementation

### Story Generation Service
```typescript
@Injectable()
export class StoryGenerationService {
  constructor(
    private openaiService: OpenaiService,
    private contentSafetyService: ContentSafetyService,
    private promptBuilderService: PromptBuilderService,
    private preGeneratedStoriesService: PreGeneratedStoriesService,
    @Inject('DATABASE')
    private database: Database,
    private storyRequestService: StoryRequestService,
  ) {}

  async generateStory(request: GenerateStoryDto, userId: string): Promise<Story> {
    const storyRequest = await this.createStoryRequest(request, userId);
    
    try {
      // Build age-appropriate prompt
      const prompt = await this.promptBuilderService.buildPrompt(request);
      
      // Pre-generation safety check
      await this.contentSafetyService.validatePrompt(prompt);
      
      // Generate with timeout (28 seconds, leaving 2 for safety)
      const completion = await Promise.race([
        this.openaiService.generateCompletion(prompt, request.childAge),
        this.createTimeoutPromise(28000)
      ]);
      
      // Post-generation safety validation
      const content = completion.choices[0].message.content;
      await this.contentSafetyService.validateContent(content);
      
      // Create and save story
      const story = await this.createStoryEntity(content, request);
      await this.updateStoryRequestSuccess(storyRequest, story);
      
      return story;
      
    } catch (error) {
      await this.updateStoryRequestFailure(storyRequest, error);
      
      // Fallback to pre-generated story
      return await this.preGeneratedStoriesService.getFallbackStory(request);
    }
  }

  private async createTimeoutPromise(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Generation timeout')), ms);
    });
  }
}
```

### Content Safety Service
```typescript
@Injectable()
export class ContentSafetyService {
  constructor(
    private openaiModerationService: OpenaiModerationService,
    private customSafetyFiltersService: CustomSafetyFiltersService,
    private safetyLoggerService: SafetyLoggerService,
  ) {}

  async validateContent(content: string): Promise<void> {
    // Layer 1: OpenAI Moderation API
    const moderationResult = await this.openaiModerationService.moderate(content);
    if (moderationResult.flagged) {
      await this.safetyLoggerService.logViolation('openai_moderation', content, moderationResult);
      throw new ContentSafetyViolationException('Content failed OpenAI moderation');
    }

    // Layer 2: Custom Polish language filters
    const customFilterResult = await this.customSafetyFiltersService.validatePolishContent(content);
    if (!customFilterResult.isValid) {
      await this.safetyLoggerService.logViolation('custom_filters', content, customFilterResult);
      throw new ContentSafetyViolationException('Content failed custom safety filters');
    }

    // Layer 3: Positive content validation
    const positivityCheck = await this.customSafetyFiltersService.validatePositiveContent(content);
    if (!positivityCheck.isPositive) {
      await this.safetyLoggerService.logViolation('positivity_check', content, positivityCheck);
      throw new ContentSafetyViolationException('Content lacks positive elements');
    }
  }

  async validatePrompt(prompt: string): Promise<void> {
    // Ensure prompt engineering maintains safety boundaries
    const promptValidation = await this.customSafetyFiltersService.validatePromptSafety(prompt);
    if (!promptValidation.isValid) {
      throw new InvalidPromptException('Prompt contains unsafe elements');
    }
  }
}
```

### Prompt Builder Service
```typescript
@Injectable()
export class PromptBuilderService {
  getSystemPrompt(childAge: number): string {
    const basePrompt = `
      You are a creative storyteller creating bedtime stories for Polish children.
      CRITICAL REQUIREMENTS:
      - Story MUST be completely appropriate for children
      - Story MUST have a happy, positive ending
      - Story MUST be engaging and age-appropriate
      - Story MUST include Polish cultural elements naturally
      - Story length: ${this.getWordCount(childAge)} words maximum
      - Language: Polish only
    `;

    const ageSpecificGuidance = this.getAgeSpecificGuidance(childAge);
    return `${basePrompt}\n\n${ageSpecificGuidance}`;
  }

  async buildPrompt(request: GenerateStoryDto): Promise<string> {
    const childProfile = await this.getChildProfile(request.childProfileId);
    const themeElements = this.getThemeElements(request.theme);
    
    return `
      Create a bedtime story with these elements:
      
      PROTAGONIST: ${childProfile.name}, age ${childProfile.age}
      THEME: ${request.theme}
      PERSONALIZATION: ${this.formatPersonalization(request.personalization)}
      
      STORY STRUCTURE:
      1. Begin with ${childProfile.name} in a familiar Polish setting
      2. Introduce the ${request.theme} adventure naturally
      3. Include personalized elements: ${this.listPersonalizedElements(request.personalization)}
      4. Create age-appropriate challenges for a ${childProfile.age}-year-old
      5. End with ${childProfile.name} feeling proud and happy
      
      The story should feel magical but grounded in Polish culture and values.
    `;
  }

  private getWordCount(age: number): number {
    if (age <= 4) return 300;
    if (age <= 6) return 400;
    return 500;
  }

  private getAgeSpecificGuidance(age: number): string {
    if (age <= 4) {
      return "Use simple sentences, repetitive elements, and basic emotions. Focus on safety and comfort.";
    }
    if (age <= 6) {
      return "Include mild challenges and problem-solving. Introduce friendship themes and basic moral lessons.";
    }
    return "Create more complex narratives with character growth. Include courage themes and meaningful adventures.";
  }
}
```

## Database Integration

### Drizzle ORM Configuration
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../database/schema';

@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: () => {
        const pool = new Pool({
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT),
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          ssl: process.env.NODE_ENV === 'production',
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
```

### Drizzle Schema Definitions
```typescript
// user-management/user.table.ts
import { pgTable, text, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Firebase UID
  email: text('email').unique().notNull(),
  displayName: text('display_name'),
  preferences: jsonb('preferences').default({}),
  subscriptionStatus: text('subscription_status').default('free'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// story-storage/story.table.ts
export const stories = pgTable('stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  theme: text('theme').notNull(),
  ageGroup: text('age_group').notNull(),
  language: text('language').default('pl'),
  type: text('type').$type<'generated' | 'pre_written'>().notNull(),
  wordCount: text('word_count'),
  readingTimeMinutes: text('reading_time_minutes'),
  safetyStatus: text('safety_status').default('approved'),
  safetyMetadata: jsonb('safety_metadata').default({}),
  personalizationData: jsonb('personalization_data').default({}),
  createdAt: timestamp('created_at').defaultNow(),
});

// Export types for use throughout the application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Story = typeof stories.$inferSelect;
export type NewStory = typeof stories.$inferInsert;
```

## Authentication & Authorization

### Firebase Auth Guard
```typescript
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

## Error Handling & Logging

### Global Exception Filter
```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      error: this.getErrorCode(exception),
      message: this.getErrorMessage(exception),
      timestamp: new Date().toISOString(),
      path: request.url,
      correlationId: this.generateCorrelationId(),
    };

    // Log error with context
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : exception,
      { 
        userId: request.user?.uid,
        correlationId: errorResponse.correlationId,
        requestBody: request.body 
      }
    );

    response.status(status).json(errorResponse);
  }

  private getErrorCode(exception: unknown): string {
    if (exception instanceof ContentSafetyViolationException) return 'CONTENT_SAFETY_VIOLATION';
    if (exception instanceof GenerationTimeoutException) return 'GENERATION_TIMEOUT';
    if (exception instanceof HttpException) return exception.constructor.name.replace('Exception', '').toUpperCase();
    return 'INTERNAL_SERVER_ERROR';
  }
}
```

## Performance & Caching

### Redis Integration
```typescript
@Injectable()
export class CacheService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  async cacheStoryGeneration(
    prompt: string, 
    result: Story, 
    ttl: number = 3600
  ): Promise<void> {
    const cacheKey = `story:${this.hashPrompt(prompt)}`;
    await this.redisClient.setex(
      cacheKey, 
      ttl, 
      JSON.stringify(result)
    );
  }

  async getCachedStory(prompt: string): Promise<Story | null> {
    const cacheKey = `story:${this.hashPrompt(prompt)}`;
    const cached = await this.redisClient.get(cacheKey);
    return cached ? JSON.parse(cached) : null;
  }

  private hashPrompt(prompt: string): string {
    return crypto.createHash('sha256').update(prompt).digest('hex');
  }
}
```

## Health Checks & Monitoring

### Health Check Service
```typescript
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @Inject('DATABASE') private database: Database,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.checkDrizzleConnection(),
      () => this.http.pingCheck('openai', 'https://api.openai.com/v1/models'),
      () => this.checkRedisConnection(),
      () => this.checkFirebaseConnection(),
    ]);
  }

  private async checkDrizzleConnection(): Promise<HealthIndicatorResult> {
    try {
      await this.database.select().from(users).limit(1);
      return { database: { status: 'up' } };
    } catch (error) {
      return { database: { status: 'down', error: error.message } };
    }
  }

  private async checkRedisConnection(): Promise<HealthIndicatorResult> {
    // Redis connectivity check implementation
  }

  private async checkFirebaseConnection(): Promise<HealthIndicatorResult> {
    // Firebase Auth connectivity check implementation
  }
}
```