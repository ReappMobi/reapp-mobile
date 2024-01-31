import { useFonts } from 'expo-font';
import React, { useContext } from 'react';

import { fonts } from '../constants/Fonts';
import AuthContext from '../contexts/auth';
import { AuthNavigator } from '../routes/auth.route';

export default function App() {
  const { signed } = useContext(AuthContext);
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  if (signed) {
    // return <AppNavigator />;
  }

  return <AuthNavigator />;
}
