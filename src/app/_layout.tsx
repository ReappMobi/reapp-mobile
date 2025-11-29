import '../styles/global.css';
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from '@expo-google-fonts/roboto';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from 'src/contexts/auth';
import DrawerContent from './(stack)/(drawer)/profile';

cssInterop(Image, { className: 'style' });

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fonts = {
    reapp_thin: Roboto_100Thin,
    reapp_ligth: Roboto_300Light,
    reapp_regular: Roboto_400Regular,
    reapp_medium: Roboto_500Medium,
    reapp_bold: Roboto_700Bold,
    reapp_black: Roboto_900Black,
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

  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
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
          <PortalHost />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
