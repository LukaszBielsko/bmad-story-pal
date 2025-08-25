import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="story" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modals/create-profile" 
          options={{ 
            presentation: 'modal',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="modals/story-complete" 
          options={{ 
            presentation: 'modal',
            headerShown: false 
          }} 
        />
      </Stack>
    </QueryClientProvider>
  );
}
