import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoryTemplate {
  theme: string;
  title: string;
  description: string;
  ageRange: string;
  estimatedDuration: string;
  icon: string;
  gradient: string[];
  sections: Record<string, StorySection>;
}

export interface StorySection {
  id: string;
  text: string;
  isEnding: boolean;
  choices: StoryChoice[];
}

export interface StoryChoice {
  id: string;
  label: string;
  nextSectionId: string;
}

export interface Story {
  id: string;
  title: string;
  theme: string;
  childId: string;
  dateCreated: string;
  dateLastPlayed: string;
  isCompleted: boolean;
  currentSectionId: string;
  choiceHistory: string[];
  completionTime?: number;
}

export interface StoryProgress {
  currentSectionId: string;
  choiceHistory: string[];
  startTime: number;
}

interface StoryState {
  availableThemes: StoryTemplate[];
  currentStory: Story | null;
  savedStories: Story[];
  storyProgress: StoryProgress | null;
  isLoading: boolean;
}

interface StoryActions {
  loadStoryThemes: () => void;
  startStory: (theme: string, childId: string) => Promise<void>;
  makeChoice: (choiceId: string, nextSectionId: string) => void;
  saveStory: () => Promise<void>;
  loadSavedStories: (childId: string) => Promise<void>;
  deleteStory: (storyId: string) => Promise<void>;
}

type StoryStore = StoryState & StoryActions;

export const useStoryStore = create<StoryStore>((set, get) => ({
  availableThemes: [],
  currentStory: null,
  savedStories: [],
  storyProgress: null,
  isLoading: false,

  loadStoryThemes: () => {
    // This will be populated from the data/storyTemplates file
    set({ availableThemes: [] });
  },

  startStory: async (theme, childId) => {
    set({ isLoading: true });
    try {
      const newStory: Story = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: '', // Will be set based on theme
        theme,
        childId,
        dateCreated: new Date().toISOString(),
        dateLastPlayed: new Date().toISOString(),
        isCompleted: false,
        currentSectionId: 'start',
        choiceHistory: [],
      };

      const newProgress: StoryProgress = {
        currentSectionId: 'start',
        choiceHistory: [],
        startTime: Date.now(),
      };

      set({ 
        currentStory: newStory,
        storyProgress: newProgress
      });
    } catch (error) {
      console.error('Error starting story:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  makeChoice: (choiceId, nextSectionId) => {
    const { currentStory, storyProgress } = get();
    if (!currentStory || !storyProgress) return;

    const updatedProgress: StoryProgress = {
      ...storyProgress,
      currentSectionId: nextSectionId,
      choiceHistory: [...storyProgress.choiceHistory, choiceId],
    };

    const updatedStory: Story = {
      ...currentStory,
      currentSectionId: nextSectionId,
      choiceHistory: updatedProgress.choiceHistory,
      dateLastPlayed: new Date().toISOString(),
    };

    set({ 
      currentStory: updatedStory,
      storyProgress: updatedProgress
    });
  },

  saveStory: async () => {
    const { currentStory, storyProgress } = get();
    if (!currentStory || !storyProgress) return;

    set({ isLoading: true });
    try {
      const completedStory: Story = {
        ...currentStory,
        isCompleted: true,
        completionTime: Math.round((Date.now() - storyProgress.startTime) / 60000), // minutes
      };

      const storageKey = `storypal_stories_${currentStory.childId}`;
      const existingStories = await AsyncStorage.getItem(storageKey);
      const stories = existingStories ? JSON.parse(existingStories) : [];
      
      const updatedStories = [...stories, completedStory];
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedStories));
      
      set({ 
        savedStories: updatedStories,
        currentStory: null,
        storyProgress: null
      });
    } catch (error) {
      console.error('Error saving story:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadSavedStories: async (childId) => {
    set({ isLoading: true });
    try {
      const storageKey = `storypal_stories_${childId}`;
      const storedStories = await AsyncStorage.getItem(storageKey);
      if (storedStories) {
        const stories = JSON.parse(storedStories);
        set({ savedStories: stories });
      }
    } catch (error) {
      console.error('Error loading saved stories:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteStory: async (storyId) => {
    set({ isLoading: true });
    try {
      const { savedStories } = get();
      const story = savedStories.find(s => s.id === storyId);
      if (!story) return;

      const storageKey = `storypal_stories_${story.childId}`;
      const updatedStories = savedStories.filter(s => s.id !== storyId);
      
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedStories));
      set({ savedStories: updatedStories });
    } catch (error) {
      console.error('Error deleting story:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));