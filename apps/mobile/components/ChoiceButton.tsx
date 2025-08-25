import { Pressable, Text } from 'react-native';
import { StoryChoice } from '@/stores/storyStore';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '@/stores/appStore';

interface ChoiceButtonProps {
  choice: StoryChoice;
  onPress: () => void;
  index: number;
}

export default function ChoiceButton({ choice, onPress, index }: ChoiceButtonProps) {
  const hapticEnabled = useAppStore(state => state.hapticEnabled);

  const handlePress = () => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getButtonColor = (index: number) => {
    const colors = [
      '#8E44FF', // primary
      '#FF4EDD', // accent
      '#3B82F6', // blue
      '#10B981'  // green
    ];
    return colors[index % colors.length];
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: getButtonColor(index),
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text style={{
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
      }}>
        {choice.label}
      </Text>
    </Pressable>
  );
}