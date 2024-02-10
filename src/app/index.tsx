import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import { fonts } from 'src/constants/Fonts';
import AuthContext from 'src/contexts/auth';
import { AuthNavigator } from 'src/routes/auth.route';

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
