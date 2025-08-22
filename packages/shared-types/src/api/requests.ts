import { PaginationParams, PersonalizationType, UserPreferences } from '../index';

// Authentication requests
export interface LoginRequest {
  idToken: string;
}

export interface RegisterRequest {
  idToken: string;
  displayName: string;
  preferences?: Partial<UserPreferences>;
}

// Child profile requests
export interface CreateChildProfileRequest {
  name: string;
  age: number;
  interests: string[];
  favoriteThemes: string[];
  readingLevel: string;
  personalityTraits: { trait: string; intensity: number }[];
}

export interface UpdateChildProfileRequest extends Partial<CreateChildProfileRequest> {
  id: string;
}

// Story generation requests
export interface GenerateStoryRequest {
  childProfileId: string;
  themeId: string;
  personalizations: StoryPersonalizationRequest[];
  difficulty?: string;
  includeIllustrations: boolean;
}

export interface StoryPersonalizationRequest {
  type: PersonalizationType;
  value: string;
}

// Story management requests
export interface SaveStoryRequest {
  storyId: string;
  action: 'save' | 'unsave' | 'favorite' | 'unfavorite';
}

export interface RateStoryRequest {
  storyId: string;
  rating: number; // 1-5
}

// Search and filtering
export interface SearchStoriesRequest extends PaginationParams {
  query?: string;
  themes?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  difficulty?: string[];
  childProfileId?: string;
}