import { storyTemplates } from '@/data/storyTemplates';
import { useDataQuery } from '@/hooks/useDataQuery';
import { useProfileStore } from '@/stores/profileStore';
import { useStoryStore } from '@/stores/storyStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

export default function StoriesScreen() {
  const activeProfile = useProfileStore(state => state.activeProfile);
  const { startStory } = useStoryStore();

  const { data: backendMessage, isLoading, refetch } = useDataQuery<string>(
    ['backend-hello'],
    async () => {
      const response = await fetch('http://localhost:3000/api');
      return response.text();
    }
  );

  const handleStoryPress = async (theme: string) => {
    console.log('Story card pressed:', theme);

    if (!activeProfile) {
      Alert.alert('No Profile', 'Please create a profile first!');
      return;
    }

    try {
      console.log('Starting story:', theme, 'for profile:', activeProfile.id);
      await startStory(theme, activeProfile.id);
      console.log('Navigating to:', `/story/${theme}`);
      router.push(`/story/${theme}`);
    } catch (error) {
      console.error('Error starting story:', error);
      Alert.alert('Error', 'Failed to start story');
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="px-4 py-2">
        <View className="mb-6">
          <Text className="text-textPrimary text-2xl font-bold mb-2">
            Choose Your Adventure {activeProfile?.name}
          </Text>
          {activeProfile ? (
            <Text className="text-textSecondary text-base mb-4">
              Hello {activeProfile.name}! Select a story theme to begin your magical journey.
            </Text>
          ) : (
            <Text className="text-red-500 text-base mb-4">
              Please create a profile first to start reading stories.
            </Text>
          )}

          {/* Backend Connection Test */}
          <View className="bg-gray-100 p-3 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-gray-700">Backend Status:</Text>
              <Pressable onPress={() => refetch()} className="px-2 py-1 bg-blue-500 rounded">
                <Text className="text-xs text-white">Reload</Text>
              </Pressable>
            </View>
            {/* reload app */}
            {isLoading ? (
              <Text className="text-xs text-gray-500">Connecting to backend...</Text>
            ) : (
              <Text className="text-xs text-gray-600">
                {backendMessage || 'Backend connection failed'}
              </Text>
            )}
          </View>
        </View>

        {/* Create AI Story Button */}
        <Pressable
          onPress={() => router.push('/create-story')}
          disabled={!activeProfile}
          className={`p-6 rounded-2xl mb-6 ${!activeProfile ? 'opacity-50 bg-gray-300' : 'bg-primary'}`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Ionicons name="sparkles" size={24} color="white" />
                <Text className="text-white text-xl font-bold ml-2">
                  Create AI Story
                </Text>
              </View>
              <Text className="text-white text-sm">
                Tell me what story you&apos;d like and I&apos;ll create it just for you!
              </Text>
              <Text className="text-white/80 text-xs mt-2">
                Powered by AI • Unlimited possibilities
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </View>
        </Pressable>

        {/* Story Cards with real data */}
        {storyTemplates.map((story, index) => (
          <Pressable
            key={story.theme}
            onPress={() => handleStoryPress(story.theme)}
            disabled={!activeProfile}
            className={`p-6 rounded-2xl mb-4 ${!activeProfile ? 'opacity-50' : ''}`}
            style={{ backgroundColor: story.gradient[0] }}
          >
            <Text className="text-white text-xl font-bold">
              {story.title}
            </Text>
            <Text className="text-white text-sm mt-1">
              {story.description}
            </Text>
            <Text className="text-white/80 text-xs mt-2">
              Ages {story.ageRange} • {story.estimatedDuration}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
