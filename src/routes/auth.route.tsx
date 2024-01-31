import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignUpPageScreen from '../screens/SignUpPageScreen';
import SignUpSplashScreen from '../screens/SignUpSplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: null, headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignupSplash" component={SignUpSplashScreen} />
      <Stack.Screen name="Signup" component={SignUpPageScreen} />
    </Stack.Navigator>
  );
}
