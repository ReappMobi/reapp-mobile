import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from 'src/contexts/auth';

import DrawerContent from './(stack)/(drawer)/profile';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fonts = {
    reapp_thin: Roboto_100Thin,
    reapp_ligth: Roboto_300Light,
    repp_regular: Roboto_400Regular,
    repp_medium: Roboto_500Medium,
    repp_bold: Roboto_700Bold,
    repp_black: Roboto_900Black,
  };

  const [fontsLoaded, fontError] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <AuthProvider>
        <Drawer
          drawerContent={DrawerContent}
          screenOptions={{
            headerShown: false,
            swipeEnabled: true,
            swipeEdgeWidth: 0,
            drawerStyle: { width: '78%' },
          }}
        />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
