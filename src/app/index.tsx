import { useFonts } from 'expo-font';
import React from 'react';

import { fonts } from '../constants/Fonts';
import { AuthNavigator } from '../routes/auth.route';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return <AuthNavigator />;
}
