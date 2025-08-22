export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  familyId?: string;
  role: UserRole;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export enum UserRole {
  PARENT = 'parent',
  CHILD = 'child',
  ADMIN = 'admin',
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  storyRecommendations: boolean;
  weeklyDigest: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'family' | 'private';
  dataSharing: boolean;
  analyticsTracking: boolean;
}

export interface ChildProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  avatarUrl?: string;
  interests: string[];
  favoriteThemes: string[];
  readingLevel: ReadingLevel;
  personalityTraits: PersonalityTrait[];
  safetySettings: ChildSafetySettings;
  createdAt: Date;
  updatedAt: Date;
}

export enum ReadingLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface PersonalityTrait {
  trait: string;
  intensity: number; // 1-10 scale
}

export interface ChildSafetySettings {
  contentFiltering: ContentFilterLevel;
  allowedThemes: string[];
  blockedWords: string[];
  parentalApprovalRequired: boolean;
}

export enum ContentFilterLevel {
  STRICT = 'strict',
  MODERATE = 'moderate',
  RELAXED = 'relaxed',
}