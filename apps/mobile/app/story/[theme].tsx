import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { useStoryStore } from '@/stores/storyStore';
import { useProfileStore } from '@/stores/profileStore';
import { storyTemplates } from '@/data/storyTemplates';

export default function StoryScreen() {
  const { theme } = useLocalSearchParams<{ theme: string }>();
  const [currentSectionId, setCurrentSectionId] = useState('start');
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  
  const { storyProgress } = useStoryStore();
  const activeProfile = useProfileStore(state => state.activeProfile);

  const storyTemplate = storyTemplates.find(t => t.theme === theme);
  const currentSection = storyTemplate?.sections[currentSectionId];

  const handleChoiceSelect = (choiceId: string, nextSectionId: string) => {
    console.log('Choice selected:', choiceId, 'Next:', nextSectionId);
    setChoiceHistory(prev => [...prev, choiceId]);
    setCurrentSectionId(nextSectionId);
    
    // Check if story is complete
    const nextSection = storyTemplate?.sections[nextSectionId];
    if (nextSection?.isEnding) {
      setTimeout(() => {
        Alert.alert('Story Complete!', 'Great job finishing the adventure!', [
          { text: 'Go Back', onPress: () => router.back() }
        ]);
      }, 1000);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (!storyTemplate || !currentSection) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F5FA', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: '#EF4444', fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
          Story Not Found
        </Text>
        <Text style={{ color: '#718096', textAlign: 'center', marginBottom: 24 }}>
          Theme: {theme} - Could not load story.
        </Text>
        <Pressable
          onPress={handleGoBack}
          style={{
            backgroundColor: '#8E44FF',
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 24
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 pt-14 bg-white border-b border-gray-200">
        <Pressable onPress={handleGoBack} className="p-2 mr-3">
          <Text className="text-lg">←</Text>
        </Pressable>
        
        <View className="flex-1">
          <Text className="text-textPrimary text-lg font-semibold">
            {storyTemplate.title}
          </Text>
          {activeProfile && (
            <Text className="text-textSecondary text-sm">
              Reading with {activeProfile.name}
            </Text>
          )}
        </View>
      </View>

      {/* Story Content */}
      <ScrollView className="flex-1 p-4">
        {/* Story Text */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-textPrimary text-lg leading-7">
            {currentSection.text}
          </Text>
        </View>

        {/* Choices */}
        {!currentSection.isEnding && currentSection.choices.length > 0 && (
          <View>
            <Text className="text-textSecondary text-sm font-medium mb-4">
              What do you choose?
            </Text>
            
            {currentSection.choices.map((choice, index) => {
              const colors = ['bg-primary', 'bg-accent', 'bg-blue-500', 'bg-green-500'];
              return (
                <Pressable
                  key={choice.id}
                  onPress={() => handleChoiceSelect(choice.id, choice.nextSectionId)}
                  className={`${colors[index % 4]} rounded-xl py-4 px-6 mb-3 active:scale-95`}
                >
                  <Text className="text-white text-center text-base font-medium">
                    {choice.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Ending Message */}
        {currentSection.isEnding && (
          <View className="bg-primary/10 rounded-2xl p-6 items-center border-2 border-primary/20">
            <Text className="text-4xl mb-2">🎉</Text>
            <Text className="text-primary text-center text-xl font-semibold mb-2">
              The End!
            </Text>
            <Text className="text-textSecondary text-center text-base">
              Great job completing this adventure!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}