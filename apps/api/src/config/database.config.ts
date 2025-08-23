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
