import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  interests: string[];
  favoriteCharacters: string;
  dateCreated: string;
  storiesCompleted: number;
  isActive: boolean;
}

interface ProfileState {
  profiles: ChildProfile[];
  activeProfile: ChildProfile | null;
  isLoading: boolean;
}

interface ProfileActions {
  loadProfiles: () => Promise<void>;
  createProfile: (profileData: Omit<ChildProfile, 'id' | 'dateCreated' | 'storiesCompleted' | 'isActive'>) => Promise<void>;
  updateProfile: (id: string, updates: Partial<ChildProfile>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  setActiveProfile: (profile: ChildProfile) => void;
}

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: [],
  activeProfile: null,
  isLoading: false,

  loadProfiles: async () => {
    set({ isLoading: true });
    try {
      const storedProfiles = await AsyncStorage.getItem('storypal_profiles');
      if (storedProfiles) {
        const profiles = JSON.parse(storedProfiles);
        const activeProfile = profiles.find((p: ChildProfile) => p.isActive) || null;
        set({ profiles, activeProfile });
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createProfile: async (profileData) => {
    set({ isLoading: true });
    try {
      const newProfile: ChildProfile = {
        ...profileData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        dateCreated: new Date().toISOString(),
        storiesCompleted: 0,
        isActive: get().profiles.length === 0, // First profile becomes active
      };

      const updatedProfiles = [...get().profiles, newProfile];
      await AsyncStorage.setItem('storypal_profiles', JSON.stringify(updatedProfiles));
      
      set({ 
        profiles: updatedProfiles,
        activeProfile: newProfile.isActive ? newProfile : get().activeProfile
      });
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (id, updates) => {
    set({ isLoading: true });
    try {
      const updatedProfiles = get().profiles.map(profile => 
        profile.id === id ? { ...profile, ...updates } : profile
      );
      
      await AsyncStorage.setItem('storypal_profiles', JSON.stringify(updatedProfiles));
      
      const activeProfile = get().activeProfile;
      const updatedActiveProfile = activeProfile?.id === id 
        ? { ...activeProfile, ...updates } 
        : activeProfile;

      set({ 
        profiles: updatedProfiles,
        activeProfile: updatedActiveProfile
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProfile: async (id) => {
    set({ isLoading: true });
    try {
      const updatedProfiles = get().profiles.filter(profile => profile.id !== id);
      await AsyncStorage.setItem('storypal_profiles', JSON.stringify(updatedProfiles));
      
      const activeProfile = get().activeProfile;
      const newActiveProfile = activeProfile?.id === id ? null : activeProfile;

      set({ 
        profiles: updatedProfiles,
        activeProfile: newActiveProfile
      });

      // Also remove associated stories
      await AsyncStorage.removeItem(`storypal_stories_${id}`);
    } catch (error) {
      console.error('Error deleting profile:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveProfile: (profile) => {
    const updatedProfiles = get().profiles.map(p => ({
      ...p,
      isActive: p.id === profile.id
    }));

    set({ 
      profiles: updatedProfiles,
      activeProfile: profile
    });

    // Save to AsyncStorage
    AsyncStorage.setItem('storypal_profiles', JSON.stringify(updatedProfiles));
  },
}));