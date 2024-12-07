import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fonts } from 'src/constants/fonts';
import { AuthProvider } from 'src/contexts/auth';

import DrawerContent from './(stack)/(drawer)/profile';

export default function RootLayout() {
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
