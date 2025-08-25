import { View, Text, Pressable } from 'react-native';
import { ChildProfile } from '@/stores/profileStore';

interface ProfileCardProps {
  profile: ChildProfile;
  isActive?: boolean;
  onPress: (profile: ChildProfile) => void;
  onLongPress: (profile: ChildProfile) => void;
}

export default function ProfileCard({ 
  profile, 
  isActive = false, 
  onPress, 
  onLongPress 
}: ProfileCardProps) {
  return (
    <Pressable
      onPress={() => onPress(profile)}
      onLongPress={() => onLongPress(profile)}
      className={`
        bg-white rounded-xl p-4 shadow-lg border 
        ${isActive ? 'border-primary border-2' : 'border-gray-100'}
        active:scale-95 active:opacity-90
      `}
      style={{ transform: [{ scale: 1 }] }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-textPrimary text-lg font-semibold">
            {profile.name}
          </Text>
          <Text className="text-textSecondary text-sm">
            Age {profile.age} • {profile.storiesCompleted} stories completed
          </Text>
          {profile.interests.length > 0 && (
            <Text className="text-textSecondary text-xs mt-1">
              Interests: {profile.interests.join(', ')}
            </Text>
          )}
        </View>
        
        {isActive && (
          <View className="bg-primary rounded-full w-3 h-3 ml-2" />
        )}
      </View>
      
      {profile.favoriteCharacters && (
        <Text className="text-textSecondary text-xs mt-2">
          ❤️ {profile.favoriteCharacters}
        </Text>
      )}
    </Pressable>
  );
}