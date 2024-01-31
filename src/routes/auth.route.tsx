import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignUpSplashScreen from '../screens/SignUpSplashScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: null, headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignupSplash" component={SignUpSplashScreen} />
    </Stack.Navigator>
  );
}
