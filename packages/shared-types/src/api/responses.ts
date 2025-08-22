import { User, ChildProfile, Story, StoryTheme, ApiResponse, PaginatedResponse } from '../index';

// Authentication responses
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// User management responses
export type GetUserResponse = ApiResponse<User>;
export type UpdateUserResponse = ApiResponse<User>;

// Child profile responses
export type GetChildProfilesResponse = ApiResponse<ChildProfile[]>;
export type CreateChildProfileResponse = ApiResponse<ChildProfile>;
export type UpdateChildProfileResponse = ApiResponse<ChildProfile>;
export type DeleteChildProfileResponse = ApiResponse<{ deleted: boolean }>;

// Story generation responses
export interface StoryGenerationResponse {
  requestId: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  estimatedCompletionTime?: number; // seconds
  story?: Story;
  error?: string;
}

export type GenerateStoryResponse = ApiResponse<StoryGenerationResponse>;

// Story management responses
export type GetStoryResponse = ApiResponse<Story>;
export type GetStoriesResponse = ApiResponse<PaginatedResponse<Story>>;
export type SaveStoryResponse = ApiResponse<{ saved: boolean }>;
export type RateStoryResponse = ApiResponse<{ rated: boolean }>;

// Theme management responses
export type GetThemesResponse = ApiResponse<StoryTheme[]>;
export type GetThemeResponse = ApiResponse<StoryTheme>;

// Analytics responses
export interface AnalyticsData {
  storiesGenerated: number;
  storiesRead: number;
  favoriteThemes: string[];
  readingStreak: number;
  totalReadingTime: number; // minutes
}

export type GetAnalyticsResponse = ApiResponse<AnalyticsData>;

// Health check response
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: 'healthy' | 'unhealthy';
    redis: 'healthy' | 'unhealthy';
    openai: 'healthy' | 'unhealthy';
    firebase: 'healthy' | 'unhealthy';
  };
  version: string;
}