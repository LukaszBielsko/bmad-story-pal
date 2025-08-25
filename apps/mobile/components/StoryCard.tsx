import { StoryTemplate } from '@/stores/storyStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

interface StoryCardProps {
  theme: StoryTemplate;
  onPress: (theme: StoryTemplate) => void;
  disabled?: boolean;
}

export default function StoryCard({ theme, onPress, disabled = false }: StoryCardProps) {
  return (
    <Pressable
      onPress={() => onPress(theme)}
      disabled={disabled}
      className={`rounded-2xl shadow-md overflow-hidden active:scale-98 ${disabled ? 'opacity-50' : ''}`}
    >
      <LinearGradient
        colors={theme.gradient as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-white text-xl font-bold mb-2">
              {theme.title}
            </Text>

            <Text className="text-white/90 text-sm mb-3">
              {theme.description}
            </Text>

            <View className="flex-row items-center">
              <Text className="text-white/80 text-xs mr-3">
                Ages {theme.ageRange}
              </Text>
              <Text className="text-white/80 text-xs">
                {theme.estimatedDuration}
              </Text>
            </View>
          </View>

          <View className="bg-white/20 rounded-full p-3 w-12 h-12 items-center justify-center">
            <Ionicons
              name={theme.icon as any}
              size={24}
              color="white"
            />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
