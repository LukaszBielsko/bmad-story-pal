import LoadingSpinner from '@/components/LoadingSpinner';
import { storyTemplates } from '@/data/storyTemplates';
import { useProfileStore } from '@/stores/profileStore';
import { Story, useStoryStore } from '@/stores/storyStore';
import { hapticLight } from '@/utils/haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

interface LibraryStoryCardProps {
  story: Story;
  onReplay: () => void;
  onDelete: () => void;
}

function LibraryStoryCard({ story, onReplay, onDelete }: LibraryStoryCardProps) {
  const storyTemplate = storyTemplates.find(t => t.theme === story.theme);
  const completedDate = new Date(story.dateCreated).toLocaleDateString();

  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#2D3748', fontSize: 18, fontWeight: '600', marginBottom: 4 }}>
            {storyTemplate?.title || story.title}
          </Text>

          <Text style={{ color: '#718096', fontSize: 14, marginBottom: 8 }}>
            Completed on {completedDate}
          </Text>

          {story.completionTime && (
            <Text style={{ color: '#718096', fontSize: 12 }}>
              ⏱️ Finished in {story.completionTime} minutes
            </Text>
          )}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={onReplay}
            style={{
              backgroundColor: '#8E44FF',
              borderRadius: 8,
              paddingVertical: 6,
              paddingHorizontal: 12,
              marginRight: 8,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons name="play" size={14} color="white" style={{ marginRight: 4 }} />
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
              Replay
            </Text>
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={{
              backgroundColor: '#FEF2F2',
              borderRadius: 8,
              paddingVertical: 6,
              paddingHorizontal: 8,
              borderWidth: 1,
              borderColor: '#FECACA'
            }}
          >
            <Ionicons name="trash-outline" size={14} color="#DC2626" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function LibraryScreen() {
  const activeProfile = useProfileStore(state => state.activeProfile);
  const { savedStories, loadSavedStories, deleteStory, startStory, isLoading } = useStoryStore();

  useEffect(() => {
    if (activeProfile) {
      loadSavedStories(activeProfile.id);
    }
  }, [activeProfile, loadSavedStories]);

  const handleReplayStory = async (story: Story) => {
    hapticLight();
    if (!activeProfile) return;

    try {
      await startStory(story.theme, activeProfile.id);
      router.push(`/story/${story.theme}`);
    } catch (error) {
      console.error('Failed to replay story:', error);
    }
  };

  const handleDeleteStory = async (story: Story) => {
    hapticLight();
    try {
      await deleteStory(story.id);
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F5FA', justifyContent: 'center' }}>
        <LoadingSpinner size="large" text="Loading your stories..." />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5FA' }}>
      {/* Header */}
      <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
      }}>
        <Text style={{ color: '#2D3748', fontSize: 20, fontWeight: '600' }}>
          Story Library
        </Text>
        {activeProfile && (
          <Text style={{ color: '#718096', fontSize: 14 }}>
            {activeProfile.name}&apos;s completed adventures
          </Text>
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}>
        {!activeProfile ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#EF4444', fontSize: 16, marginBottom: 8 }}>
              No Profile Selected
            </Text>
            <Text style={{ color: '#718096', textAlign: 'center' }}>
              Please select a child profile to view their story library.
            </Text>
          </View>
        ) : savedStories.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📚</Text>
            <Text style={{ color: '#718096', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
              No stories completed yet!
            </Text>
            <Text style={{ color: '#718096', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
              Complete your first adventure to see it saved here.
            </Text>
            <Pressable
              onPress={() => {
                hapticLight();
                router.push('/(tabs)');
              }}
              style={{
                backgroundColor: '#8E44FF',
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 24
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>
                Start Reading
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={{ color: '#718096', fontSize: 14, marginBottom: 16 }}>
              {savedStories.length} {savedStories.length === 1 ? 'story' : 'stories'} completed
            </Text>

            <FlatList
              data={savedStories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LibraryStoryCard
                  story={item}
                  onReplay={() => handleReplayStory(item)}
                  onDelete={() => handleDeleteStory(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
}
