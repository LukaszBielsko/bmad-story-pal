import { useProfileStore } from '@/stores/profileStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

export default function FloatingActionButton() {
  const activeProfile = useProfileStore(state => state.activeProfile);

  const handlePress = () => {
    if (!activeProfile) {
      Alert.alert('No Profile', 'Please create a profile first!');
      return;
    }
    router.push('/create-story');
  };

  return (
    <View className="items-center">
      <Pressable
        onPress={handlePress}
        disabled={!activeProfile}
        className={`w-16 h-16 rounded-full items-center justify-center shadow-lg ${!activeProfile ? 'bg-gray-400' : 'bg-accent'}`}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <Ionicons
          name="add-circle"
          size={28}
          color="white"
        />
      </Pressable>
      <Text className={`text-xs mt-1 font-medium ${!activeProfile ? 'text-gray-400' : 'text-accent'}`}>
        Create
      </Text>
    </View>
  );
}
