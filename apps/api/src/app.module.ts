import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
// import { ThrottlerModule } from '@nestjs/throttler';

// Configuration imports
import { databaseConfig } from './config/database.config';
import { firebaseConfig } from './config/firebase.config';
import { openaiConfig } from './config/openai.config';
import { redisConfig } from './config/redis.config';
import { appConfig } from './config/app.config';

// Guard imports
// import { FirebaseAuthGuard } from './common/guards/firebase-auth.guard';
// import { RateLimitGuard } from './common/guards/rate-limit.guard';

// Module imports
import { AppController } from './app.controller';
import { UserManagementModule } from './user-management/user-management.module';
import { StoryGenerationModule } from './story-generation/story-generation.module';
import { ContentSafetyModule } from './content-safety/content-safety.module';
import { StoryStorageModule } from './story-storage/story-storage.module';
import { SyncModule } from './sync/sync.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  controllers: [AppController],
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        firebaseConfig,
        openaiConfig,
        redisConfig,
      ],
      envFilePath: ['.env.local', '.env'],
    }),

    // Drizzle Database Module will be imported via DatabaseModule

    // Rate limiting - TODO: Add back when needed
    // ThrottlerModule.forRoot([{
    //   ttl: 60000,
    //   limit: 1000,
    // }]),

    // Feature modules
    UserManagementModule,
    StoryGenerationModule,
    ContentSafetyModule,
    StoryStorageModule,
    SyncModule,
    AnalyticsModule,
  ],
  providers: [
    // Database provider for Drizzle ORM
    {
      provide: 'DATABASE',
      useFactory: () => {
        const pool = new Pool({
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT || '5432'),
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          ssl: process.env.NODE_ENV === 'production',
        });
        return drizzle(pool);
      },
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: FirebaseAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RateLimitGuard,
    // },
  ],
})
export class AppModule {}