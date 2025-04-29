import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; // ← Entypo ikonu için bu import gerekli
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#c084fc',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#333',
        },
      }}
    >
      <Tabs.Screen
        name="adminHome"
        options={{
          title: 'HomeScreen',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="classic-computer" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="game-controller" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}