import { pgTable, varchar, text, timestamp, json, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

/**
 * Users table schema using Drizzle ORM
 * Primary key is Firebase UID for seamless authentication integration
 */
export const users = pgTable('users', {
  // Firebase UID as primary key - unique identifier from Firebase Auth
  id: varchar('id', { length: 128 }).primaryKey(),
  
  // Basic user information from Firebase Auth
  email: varchar('email', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 255 }),
  
  // User preferences stored as JSON for flexibility
  preferences: json('preferences').$type<{
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
    };
    storyPreferences?: {
      defaultThemes?: string[];
      contentFilters?: string[];
    };
  }>(),
  
  // Subscription status for premium features
  subscriptionStatus: varchar('subscription_status', { length: 50 }).default('free').notNull(),
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  
  // Account status and metadata
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at'),
  
  // Audit timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export types for use throughout the application
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Type for user preferences to ensure type safety
export type UserPreferences = NonNullable<User['preferences']>;

// Helper types for different user contexts
export type PublicUser = Pick<User, 'id' | 'displayName' | 'createdAt'>;
export type UserProfile = Omit<User, 'lastLoginAt'>;