export const APP_CONFIG = {
  version: '1.0.0',
  name: 'StoryPal',
  description: 'Interactive stories for children aged 2-8',
};

export const STORAGE_KEYS = {
  profiles: 'storypal_profiles',
  settings: 'storypal_settings',
  stories: (childId: string) => `storypal_stories_${childId}`,
};

export const PROFILE_CONSTRAINTS = {
  name: {
    minLength: 1,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9\s]+$/,
  },
  age: {
    min: 2,
    max: 8,
  },
  favoriteCharacters: {
    maxLength: 50,
  },
  interests: [
    'animals',
    'adventure',
    'magic',
    'space',
    'ocean',
    'friendship',
    'music',
    'art',
  ],
};

export const STORY_CONFIG = {
  maxStoriesPerProfile: 50,
  progressSteps: 10, // For progress bar calculation
  autoSaveInterval: 30000, // 30 seconds
};

export const UI_CONFIG = {
  hapticEnabled: true,
  animationDuration: 300,
  toastDuration: 3000,
  colors: {
    primary: '#8E44FF',
    accent: '#FF4EDD',
    background: '#F5F5FA',
    textPrimary: '#2D3748',
    textSecondary: '#718096',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};