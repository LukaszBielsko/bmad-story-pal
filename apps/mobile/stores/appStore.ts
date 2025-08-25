import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppSettings {
  isFirstLaunch: boolean;
  hapticEnabled: boolean;
  lastActiveProfile: string | null;
  appVersion: string;
}

interface AppState {
  isFirstLaunch: boolean;
  hapticEnabled: boolean;
  fontLoaded: boolean;
  appSettings: AppSettings;
}

interface AppActions {
  initializeApp: () => Promise<void>;
  toggleHaptic: () => Promise<void>;
  setFontLoaded: (loaded: boolean) => void;
  setFirstLaunchComplete: () => Promise<void>;
}

type AppStore = AppState & AppActions;

const defaultSettings: AppSettings = {
  isFirstLaunch: true,
  hapticEnabled: true,
  lastActiveProfile: null,
  appVersion: '1.0.0',
};

export const useAppStore = create<AppStore>((set, get) => ({
  isFirstLaunch: true,
  hapticEnabled: true,
  fontLoaded: false,
  appSettings: defaultSettings,

  initializeApp: async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('storypal_settings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        set({ 
          appSettings: settings,
          isFirstLaunch: settings.isFirstLaunch,
          hapticEnabled: settings.hapticEnabled
        });
      } else {
        // First time launch - save default settings
        await AsyncStorage.setItem('storypal_settings', JSON.stringify(defaultSettings));
        set({ appSettings: defaultSettings });
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      set({ appSettings: defaultSettings });
    }
  },

  toggleHaptic: async () => {
    try {
      const currentSettings = get().appSettings;
      const newHapticEnabled = !get().hapticEnabled;
      
      const updatedSettings: AppSettings = {
        ...currentSettings,
        hapticEnabled: newHapticEnabled,
      };

      await AsyncStorage.setItem('storypal_settings', JSON.stringify(updatedSettings));
      
      set({ 
        hapticEnabled: newHapticEnabled,
        appSettings: updatedSettings
      });
    } catch (error) {
      console.error('Error toggling haptic:', error);
    }
  },

  setFontLoaded: (loaded) => {
    set({ fontLoaded: loaded });
  },

  setFirstLaunchComplete: async () => {
    try {
      const currentSettings = get().appSettings;
      const updatedSettings: AppSettings = {
        ...currentSettings,
        isFirstLaunch: false,
      };

      await AsyncStorage.setItem('storypal_settings', JSON.stringify(updatedSettings));
      
      set({ 
        isFirstLaunch: false,
        appSettings: updatedSettings
      });
    } catch (error) {
      console.error('Error setting first launch complete:', error);
    }
  },
}));