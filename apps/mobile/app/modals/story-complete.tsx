import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useProfileStore } from '@/stores/profileStore';
import { hapticSuccess, hapticLight } from '@/utils/haptics';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function StoryCompleteModal() {
  const activeProfile = useProfileStore(state => state.activeProfile);

  const handleGoToLibrary = () => {
    hapticLight();
    router.replace('/(tabs)/library');
  };

  const handleReadAnother = () => {
    hapticLight();
    router.replace('/(tabs)');
  };

  const handleClose = () => {
    hapticLight();
    router.back();
  };

  return (
    <View className="flex-1 bg-black/50 justify-center items-center">
      <View className="bg-white rounded-3xl p-8 mx-5 items-center shadow-2xl min-w-[300px]">
        {/* Celebration Header */}
        <View className="items-center mb-6">
          <Text className="text-5xl mb-2">🎉</Text>
          <Text className="text-primary text-2xl font-bold text-center mb-2">
            Story Complete!
          </Text>
          {activeProfile && (
            <Text className="text-textSecondary text-base text-center">
              Great job, {activeProfile.name}! 
            </Text>
          )}
        </View>

        {/* Success Message */}
        <View className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
          <Text className="text-green-800 text-center text-sm font-medium">
            ✅ Your adventure has been saved to your Library!
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="w-full">
          <Pressable
            onPress={handleGoToLibrary}
            className="bg-primary rounded-xl py-4 px-6 mb-3 flex-row items-center justify-center active:scale-95"
          >
            <Ionicons name="library" size={20} color="white" className="mr-2" />
            <Text className="text-white text-base font-semibold ml-2">
              View in Library
            </Text>
          </Pressable>

          <Pressable
            onPress={handleReadAnother}
            className="bg-background rounded-xl py-4 px-6 mb-3 flex-row items-center justify-center border border-gray-200 active:scale-95"
          >
            <Ionicons name="book" size={20} color="#8E44FF" className="mr-2" />
            <Text className="text-primary text-base font-semibold ml-2">
              Read Another Story
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClose}
            className="items-center py-2"
          >
            <Text className="text-textSecondary text-sm">
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}