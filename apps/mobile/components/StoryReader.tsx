import { View, Text, ScrollView } from 'react-native';
import { StorySection } from '@/stores/storyStore';
import ChoiceButton from './ChoiceButton';

interface StoryReaderProps {
  storySection: StorySection;
  onChoiceSelect: (choiceId: string, nextSectionId: string) => void;
  progress: number;
}

export default function StoryReader({ 
  storySection, 
  onChoiceSelect, 
  progress 
}: StoryReaderProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5FA' }}>
      {/* Progress Bar */}
      <View style={{ 
        backgroundColor: 'white', 
        paddingHorizontal: 16, 
        paddingVertical: 8, 
        borderBottomWidth: 1, 
        borderBottomColor: '#E5E7EB' 
      }}>
        <View style={{ backgroundColor: '#E5E7EB', height: 8, borderRadius: 4 }}>
          <View 
            style={{ 
              backgroundColor: '#8E44FF', 
              height: 8, 
              borderRadius: 4,
              width: `${progress}%` 
            }}
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        {/* Story Text */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 16, 
          padding: 24, 
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1
        }}>
          <Text style={{ 
            color: '#2D3748', 
            fontSize: 18, 
            lineHeight: 28,
            fontWeight: '400'
          }}>
            {storySection.text}
          </Text>
        </View>

        {/* Choices */}
        {!storySection.isEnding && storySection.choices.length > 0 && (
          <View>
            <Text style={{ 
              color: '#718096', 
              fontSize: 14, 
              fontWeight: '500', 
              marginBottom: 16 
            }}>
              What do you choose?
            </Text>
            
            {storySection.choices.map((choice, index) => (
              <View key={choice.id} style={{ marginBottom: 12 }}>
                <ChoiceButton
                  choice={choice}
                  onPress={() => onChoiceSelect(choice.id, choice.nextSectionId)}
                  index={index}
                />
              </View>
            ))}
          </View>
        )}

        {/* Ending Message */}
        {storySection.isEnding && (
          <View style={{ 
            backgroundColor: 'rgba(142, 68, 255, 0.1)', 
            borderRadius: 16, 
            padding: 24, 
            borderWidth: 2, 
            borderColor: 'rgba(142, 68, 255, 0.2)',
            alignItems: 'center'
          }}>
            <Text style={{ 
              color: '#8E44FF', 
              textAlign: 'center', 
              fontSize: 20, 
              fontWeight: '600',
              marginBottom: 8
            }}>
              🎉 The End! 🎉
            </Text>
            <Text style={{ 
              color: '#718096', 
              textAlign: 'center',
              fontSize: 16
            }}>
              Great job completing this adventure!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}