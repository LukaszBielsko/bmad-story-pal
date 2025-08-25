import * as Haptics from 'expo-haptics';
import { useAppStore } from '@/stores/appStore';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export const playHaptic = async (type: HapticType): Promise<void> => {
  const hapticEnabled = useAppStore.getState().hapticEnabled;
  
  if (!hapticEnabled) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch (error) {
    console.warn('Haptic feedback error:', error);
  }
};

// Convenience functions
export const hapticLight = () => playHaptic('light');
export const hapticMedium = () => playHaptic('medium');
export const hapticHeavy = () => playHaptic('heavy');
export const hapticSuccess = () => playHaptic('success');
export const hapticWarning = () => playHaptic('warning');
export const hapticError = () => playHaptic('error');