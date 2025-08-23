import { z } from 'zod';

/**
 * Zod validation schemas for user management
 * These schemas validate incoming request data before processing
 */

// User preferences schema for flexible user settings
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark']).optional(),
  language: z.string().min(2).max(10).optional(),
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
  }).optional(),
  storyPreferences: z.object({
    defaultThemes: z.array(z.string()).max(10).optional(),
    contentFilters: z.array(z.string()).max(20).optional(),
  }).optional(),
}).optional();

// Schema for creating a new user
export const createUserSchema = z.object({
  id: z.string().min(1).max(128), // Firebase UID
  email: z.string().email('Invalid email format').max(255),
  displayName: z.string().min(1).max(255).optional(),
  preferences: userPreferencesSchema,
  subscriptionStatus: z.enum(['free', 'premium', 'family']).default('free'),
});

// Schema for updating user profile
export const updateUserProfileSchema = z.object({
  displayName: z.string().min(1).max(255).optional(),
  preferences: userPreferencesSchema,
}).strict(); // Only allow specified fields

// Schema for updating user preferences specifically
export const updateUserPreferencesSchema = userPreferencesSchema;

// Schema for user subscription updates
export const updateUserSubscriptionSchema = z.object({
  subscriptionStatus: z.enum(['free', 'premium', 'family']),
  subscriptionExpiresAt: z.string().datetime().optional(),
}).strict();

// Schema for user query parameters
export const getUsersQuerySchema = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
  search: z.string().min(1).max(100).optional(),
  subscriptionStatus: z.enum(['free', 'premium', 'family']).optional(),
  sortBy: z.enum(['createdAt', 'lastLoginAt', 'email', 'displayName']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Schema for user ID parameter validation
export const userIdParamSchema = z.object({
  id: z.string().min(1).max(128), // Firebase UID validation
});

// Export inferred types for use throughout the application
export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileSchema>;
export type UpdateUserPreferencesRequest = z.infer<typeof updateUserPreferencesSchema>;
export type UpdateUserSubscriptionRequest = z.infer<typeof updateUserSubscriptionSchema>;
export type GetUsersQueryRequest = z.infer<typeof getUsersQuerySchema>;
export type UserIdParamRequest = z.infer<typeof userIdParamSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;

// Response schemas for API documentation
export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  preferences: userPreferencesSchema,
  subscriptionStatus: z.string(),
  subscriptionExpiresAt: z.string().datetime().nullable(),
  isActive: z.boolean(),
  lastLoginAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const publicUserResponseSchema = z.object({
  id: z.string(),
  displayName: z.string().nullable(),
  createdAt: z.string().datetime(),
});

// Export response types
export type UserResponse = z.infer<typeof userResponseSchema>;
export type PublicUserResponse = z.infer<typeof publicUserResponseSchema>;