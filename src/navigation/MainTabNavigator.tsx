import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import { MainTabsParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ChallengesListScreen from '../screens/ChallengesListScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator<MainTabsParamList>();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '⌂',
    Map: '◎',
    ChallengeTab: '⚔',
    Leaderboard: '▲',
    Profile: '◉',
  };
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, color: focused ? '#00FF87' : '#555555' }}>
        {icons[name]}
      </Text>
    </View>
  );
}

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 10, color: focused ? '#00FF87' : '#555555', marginBottom: 2 }}>
      {label}
    </Text>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111111',
          borderTopColor: '#222222',
          borderTopWidth: 1,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: '#00FF87',
        tabBarInactiveTintColor: '#555555',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel label="Home" focused={focused} /> }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel label="Karte" focused={focused} /> }}
      />
      <Tab.Screen
        name="ChallengeTab"
        component={ChallengesListScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel label="Challenge" focused={focused} /> }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel label="Rangliste" focused={focused} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel label="Profil" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}
