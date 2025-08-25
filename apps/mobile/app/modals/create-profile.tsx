import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useProfileStore } from '@/stores/profileStore';
import { validateProfileData } from '@/utils/validation';
import { PROFILE_CONSTRAINTS } from '@/data/constants';
import { hapticSuccess, hapticError, hapticLight } from '@/utils/haptics';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CreateProfileModal() {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const createProfile = useProfileStore(state => state.createProfile);
  const isLoading = useProfileStore(state => state.isLoading);

  const handleClose = () => {
    hapticLight();
    router.back();
  };

  const toggleInterest = (interest: string) => {
    hapticLight();
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (!age) {
      setErrors({ age: 'Please select an age' });
      hapticError();
      return;
    }

    const profileData = {
      name: name.trim(),
      age,
      favoriteCharacters: favoriteCharacters.trim(),
    };

    const validation = validateProfileData(profileData);
    
    if (!validation.isValid) {
      const errorObj: Record<string, string> = {};
      validation.errors.forEach(error => {
        errorObj[error.field] = error.message;
      });
      setErrors(errorObj);
      hapticError();
      return;
    }

    try {
      await createProfile({
        name: profileData.name,
        age: profileData.age,
        interests: selectedInterests,
        favoriteCharacters: profileData.favoriteCharacters,
      });
      
      hapticSuccess();
      router.back();
    } catch (error) {
      hapticError();
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    }
  };

  const AgeButton = ({ ageValue }: { ageValue: number }) => (
    <Pressable
      onPress={() => {
        hapticLight();
        setAge(ageValue);
        setErrors(prev => ({ ...prev, age: '' }));
      }}
      className={`
        w-12 h-12 rounded-full border-2 items-center justify-center mr-3 mb-3
        ${age === ageValue ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}
        active:scale-95
      `}
    >
      <Text className={`font-semibold ${age === ageValue ? 'text-white' : 'text-textPrimary'}`}>
        {ageValue}
      </Text>
    </Pressable>
  );

  const InterestChip = ({ interest }: { interest: string }) => (
    <Pressable
      onPress={() => toggleInterest(interest)}
      className={`
        px-3 py-2 rounded-full mr-2 mb-2 border
        ${selectedInterests.includes(interest) 
          ? 'bg-primary border-primary' 
          : 'bg-white border-gray-300'
        }
        active:scale-95
      `}
    >
      <Text className={`text-sm ${selectedInterests.includes(interest) ? 'text-white' : 'text-textPrimary'}`}>
        {interest}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4 pt-12 bg-white border-b border-gray-200">
        <Text className="text-textPrimary text-xl font-semibold">
          Create Profile
        </Text>
        <Pressable
          onPress={handleClose}
          className="p-2 active:scale-95"
        >
          <Ionicons name="close" size={24} color="#718096" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Name Input */}
        <View className="mb-6">
          <Text className="text-textPrimary font-medium mb-2">
            Child's Name *
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors(prev => ({ ...prev, name: '' }));
            }}
            placeholder="Enter child's name"
            className={`
              bg-white rounded-xl px-4 py-3 border
              ${errors.name ? 'border-red-300' : 'border-gray-200'}
            `}
            maxLength={PROFILE_CONSTRAINTS.name.maxLength}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
          )}
        </View>

        {/* Age Selection */}
        <View className="mb-6">
          <Text className="text-textPrimary font-medium mb-2">
            Age *
          </Text>
          <View className="flex-row flex-wrap">
            {Array.from({ length: 7 }, (_, i) => i + 2).map(ageValue => (
              <AgeButton key={ageValue} ageValue={ageValue} />
            ))}
          </View>
          {errors.age && (
            <Text className="text-red-500 text-sm mt-1">{errors.age}</Text>
          )}
        </View>

        {/* Interests */}
        <View className="mb-6">
          <Text className="text-textPrimary font-medium mb-2">
            Interests (Optional)
          </Text>
          <View className="flex-row flex-wrap">
            {PROFILE_CONSTRAINTS.interests.map(interest => (
              <InterestChip key={interest} interest={interest} />
            ))}
          </View>
        </View>

        {/* Favorite Characters */}
        <View className="mb-8">
          <Text className="text-textPrimary font-medium mb-2">
            Favorite Characters (Optional)
          </Text>
          <TextInput
            value={favoriteCharacters}
            onChangeText={(text) => {
              setFavoriteCharacters(text);
              setErrors(prev => ({ ...prev, favoriteCharacters: '' }));
            }}
            placeholder="e.g., unicorns, dinosaurs, superheroes"
            className={`
              bg-white rounded-xl px-4 py-3 border
              ${errors.favoriteCharacters ? 'border-red-300' : 'border-gray-200'}
            `}
            maxLength={PROFILE_CONSTRAINTS.favoriteCharacters.maxLength}
            multiline
          />
          {errors.favoriteCharacters && (
            <Text className="text-red-500 text-sm mt-1">{errors.favoriteCharacters}</Text>
          )}
        </View>

        {/* Create Button */}
        <Pressable
          onPress={handleSubmit}
          disabled={isLoading}
          className={`
            bg-primary rounded-xl py-4 items-center shadow-md
            ${isLoading ? 'opacity-50' : 'active:scale-98'}
          `}
        >
          <Text className="text-white font-semibold text-lg">
            {isLoading ? 'Creating...' : 'Create Profile'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}