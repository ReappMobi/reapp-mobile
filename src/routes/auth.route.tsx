import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ProfileSelectorScreen from '../screens/ProfileSelectorScreen';
import SignUpPageScreen from '../screens/SignUpPageScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: null, headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignupSplash" component={ProfileSelectorScreen} />
      <Stack.Screen name="Signup" component={SignUpPageScreen} />
    </Stack.Navigator>
  );
}
