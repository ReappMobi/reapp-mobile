import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import React from 'react';

import { fonts } from '../src/constants/Fonts';
import SignUpSplashScreen from '../src/screens/SignUpSplashScreen';
import SplashScreen from '../src/screens/SplashScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ header: null, headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignupSplash" component={SignUpSplashScreen} />
    </Stack.Navigator>
  );
}
