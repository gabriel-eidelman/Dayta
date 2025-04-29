import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Correct import for Ionicons with Expo
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import scheme from '@/utils/colorScheme';
import { Dimensions } from 'react-native';

type IoniconName = keyof typeof Ionicons.glyphMap;

type TabBarIconProps = {
  name: IoniconName;
  color: string;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color }) => (
  <Ionicons name={name} size={35} color={color} />
);
const { width, height } = Dimensions.get('window');

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'grey',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: scheme.white,
          paddingTop: 10,
          height: height/10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={scheme.mutedDarkGray} />
          ),
        }}
      />
      <Tabs.Screen
        name="personalize"
        options={{
          title: 'Personalize',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'repeat' : 'repeat-outline'} color={scheme.mutedDarkGray} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: 'Recs',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={scheme.mutedDarkGray} /> // Updated icon for recommendations
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={scheme.mutedDarkGray} /> // Updated icon for stats
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={scheme.mutedDarkGray} /> // Updated icon for settings
          ),
        }}
      />

    </Tabs>
  );
}
