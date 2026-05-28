import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from '@expo-google-fonts/roboto';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContent } from '@/components/app/drawer/drawer-content';
import { NAV_THEME } from '@/lib/theme';
import '@/styles/global.css';

import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { useAuth } from 'src/hooks/useAuth';
import { toastConfig } from '@/lib/toast-config';
import { useAuthStore } from '@/stores/auth.store';

cssInterop(Image, { className: 'style' });

SplashScreen.preventAutoHideAsync();

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
Sentry.init({
  dsn,
  sendDefaultPii: true,
  debug: false,
});

function RootContent({
  fontsLoaded,
  fontError,
}: {
  fontsLoaded: boolean;
  fontError: Error;
}) {
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if ((fontsLoaded || fontError) && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, authLoading]);

  if ((!fontsLoaded && !fontError) || authLoading) {
    return null;
  }

  return (
    <KeyboardProvider>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
          swipeEdgeWidth: 0,
          drawerStyle: { width: '70%' },
        }}
      />
      <Toast config={toastConfig} />
      <PortalHost />
    </KeyboardProvider>
  );
}

function RootLayout() {
  const fonts = {
    reapp_thin: Roboto_100Thin,
    reapp_ligth: Roboto_300Light,
    reapp_regular: Roboto_400Regular,
    reapp_medium: Roboto_500Medium,
    reapp_bold: Roboto_700Bold,
    reapp_black: Roboto_900Black,
  };

  const [fontsLoaded, fontError] = useFonts(fonts);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const queryClient = new QueryClient();

  return (
    <ThemeProvider value={NAV_THEME.light}>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <RootContent fontsLoaded={fontsLoaded} fontError={fontError} />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);
