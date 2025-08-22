import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
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

    // Database connection - TODO: Re-enable when needed
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('database.host'),
    //     port: configService.get('database.port'),
    //     username: configService.get('database.username'),
    //     password: configService.get('database.password'),
    //     database: configService.get('database.name'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: configService.get('app.environment') === 'development',
    //     migrations: [__dirname + '/migrations/*{.ts,.js}'],
    //     logging: configService.get('app.environment') === 'development',
    //     ssl: configService.get('app.environment') === 'production' ? {
    //       rejectUnauthorized: false,
    //     } : false,
    //   }),
    //   inject: [ConfigService],
    // }),

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