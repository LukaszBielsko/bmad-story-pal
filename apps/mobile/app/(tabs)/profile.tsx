import LoadingSpinner from '@/components/LoadingSpinner';
import ProfileCard from '@/components/ProfileCard';
import { useProfileStore } from '@/stores/profileStore';
import { hapticLight } from '@/utils/haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { profiles, activeProfile, isLoading, loadProfiles, setActiveProfile } = useProfileStore();

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const handleCreateProfile = () => {
    hapticLight();
    router.push('/modals/create-profile');
  };

  const handleProfilePress = (profile: any) => {
    hapticLight();
    setActiveProfile(profile);
  };

  const handleProfileLongPress = (profile: any) => {
    hapticLight();
    // TODO: Show edit/delete options
    console.log('Long press profile:', profile.name);
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center">
        <LoadingSpinner size="large" text="Loading profiles..." />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200 bg-white">
        <Text className="text-textPrimary text-xl font-semibold">
          Profiles {profiles.length}
        </Text>
        <Pressable
          onPress={handleCreateProfile}
          className="bg-primary rounded-full w-10 h-10 items-center justify-center active:scale-95"
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>

      {/* Profile List */}
      <View className="flex-1 px-4 py-4">
        {profiles.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-textSecondary text-center mb-4">
              No profiles yet!
            </Text>
            <Text className="text-textSecondary text-center text-sm">
              Tap the + button to create your first child profile.
            </Text>
          </View>
        ) : (
          <FlatList
            data={profiles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mb-3">
                <ProfileCard
                  profile={item}
                  isActive={activeProfile?.id === item.id}
                  onPress={handleProfilePress}
                  onLongPress={handleProfileLongPress}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
