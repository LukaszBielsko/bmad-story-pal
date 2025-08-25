import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'small', 
  color = '#8E44FF',
  text 
}: LoadingSpinnerProps) {
  return (
    <View className="items-center justify-center p-4">
      <ActivityIndicator 
        size={size} 
        color={color} 
      />
      {text && (
        <Text className="text-textSecondary text-sm mt-2 text-center">
          {text}
        </Text>
      )}
    </View>
  );
}