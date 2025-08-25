import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function CreateStoryScreen() {
  const [prompt, setPrompt] = useState('');
  const maxLength = 200;

  const handleGenerateStory = () => {

    if (prompt.trim().length < 10) {
      Alert.alert('Prompt Too Short', 'Please write at least 10 characters for your story idea.');
      return;
    }

    // Console log the prompt - this will show in the terminal/Metro bundler logs
    console.log('=== AI STORY GENERATION ===');
    console.log('Prompt:', prompt);
    console.log('Prompt length:', prompt.length);
    console.log('========================');

    Alert.alert('Story Generated!', `Check the console logs to see your prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
  };

  const promptSuggestions = [
    "A magical adventure in a candy forest",
    "A friendly dragon who loves to bake cookies",
    "A journey to a planet made of clouds",
    "A superhero cat saves the neighborhood"
  ];

  const handleSuggestionPress = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
          <Pressable onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#8E44FF" />
          </Pressable>
          <Text className="text-textPrimary text-xl font-bold">Create AI Story</Text>
          <View className="w-8" />
        </View>

        <View className="px-4">
          {/* Prompt Input */}
          <View className="mb-6">
            <Text className="text-textPrimary text-lg font-semibold mb-3">
              What story would you like me to create?
            </Text>

            <View className="bg-white rounded-xl border-2 border-gray-100 p-4">
              <TextInput
                value={prompt}
                onChangeText={setPrompt}
                placeholder="Tell me about the story you'd like to hear..."
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={maxLength}
                className="text-textPrimary text-base min-h-[100] text-top"
                style={{ textAlignVertical: 'top' }}
              />

              <View className="flex-row justify-between items-center mt-2">
                <Text className={`text-xs ${prompt.length > maxLength * 0.9 ? 'text-red-500' : 'text-textSecondary'}`}>
                  {prompt.length}/{maxLength}
                </Text>
                {prompt.length > 0 && (
                  <Pressable onPress={() => setPrompt('')} className="p-1">
                    <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                  </Pressable>
                )}
              </View>
            </View>
          </View>

          {/* Prompt Suggestions */}
          <View className="mb-8">
            <Text className="text-textPrimary text-base font-medium mb-3">
              Need inspiration? Try these ideas:
            </Text>

            <View className="space-y-2">
              {promptSuggestions.map((suggestion, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleSuggestionPress(suggestion)}
                  className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-lg border border-primary/20"
                >
                  <Text className="text-textPrimary text-sm">{suggestion}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Generate Button */}
          <Pressable
            onPress={handleGenerateStory}
            disabled={prompt.trim().length < 10}
            className={`p-4 rounded-xl mb-8 ${(prompt.trim().length < 10)
              ? 'bg-gray-300'
              : 'bg-gradient-to-r from-primary to-accent'
              }`}
          >
            <Text className={`text-center text-lg font-semibold ${(prompt.trim().length < 10)
              ? 'text-gray-500'
              : 'text-white'
              }`}>
              Generate My Story ✨
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
