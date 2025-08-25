import FloatingActionButton from '@/components/FloatingActionButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#8E44FF',
          tabBarInactiveTintColor: '#718096',
          headerStyle: {
            backgroundColor: '#F5F5FA',
          },
          headerShadowVisible: false,
          headerTintColor: '#2D3748',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            height: 85,
            paddingTop: 10,
            paddingBottom: 25,
          },
        }} >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Stories',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'book' : 'book-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'library' : 'library-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="create-fab"
          options={{
            title: '',
            tabBarIcon: () => <View style={{ width: 24, height: 24 }} />,
            tabBarButton: () => <View style={{ flex: 1 }} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
      <View className="absolute bottom-5 left-0 right-0 flex-row justify-center">
        <FloatingActionButton />
      </View>
    </View>
  );
}
