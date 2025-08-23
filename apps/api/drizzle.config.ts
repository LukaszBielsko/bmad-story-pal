import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/**/*.table.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});