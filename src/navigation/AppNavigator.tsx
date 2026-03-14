import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import OnboardingScreen from '../screens/OnboardingScreen';
import SkillSelectionScreen from '../screens/SkillSelectionScreen';
import MainTabNavigator from './MainTabNavigator';
import CourtDetailScreen from '../screens/CourtDetailScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import MatchResultScreen from '../screens/MatchResultScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SkillSelection" component={SkillSelectionScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="CourtDetail" component={CourtDetailScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="MatchResult" component={MatchResultScreen} />
        <Stack.Screen name="PlayerProfile" component={PlayerProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
