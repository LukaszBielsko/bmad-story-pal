import { ScrollView, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="px-4 py-6">
        <View className="mb-8">
          <Text className="text-textPrimary text-3xl font-bold mb-4">
            About StoryPal
          </Text>
          <Text className="text-textSecondary text-base leading-6 mb-6">
            StoryPal is an AI-powered interactive storytelling platform designed for children aged 2-8.
            We create personalized, engaging stories that adapt to your &apos;child&apos;s interests and choices.
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-textPrimary text-xl font-semibold mb-3">
            ✨ Features
          </Text>
          <View className="space-y-3">
            <Text className="text-textSecondary text-base">
              • AI-generated personalized stories
            </Text>
            <Text className="text-textSecondary text-base">
              • Interactive branching narratives
            </Text>
            <Text className="text-textSecondary text-base">
              • Child-safe content moderation
            </Text>
            <Text className="text-textSecondary text-base">
              • Profile-based customization
            </Text>
            <Text className="text-textSecondary text-base">
              • Story library and progress tracking
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-textPrimary text-xl font-semibold mb-3">
            🛡️ Safety First
          </Text>
          <Text className="text-textSecondary text-base leading-6">
            All stories are generated with child-appropriate content filters and are designed to be
            educational, fun, and safe for young minds.
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-textPrimary text-xl font-semibold mb-3">
            📱 Version
          </Text>
          <Text className="text-textSecondary text-base">
            StoryPal v1.0.0
          </Text>
          <Text className="text-textSecondary text-sm mt-1">
            Built with ❤️ for curious minds
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
