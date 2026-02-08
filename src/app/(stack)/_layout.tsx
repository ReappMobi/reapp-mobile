import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchProvider } from '@/contexts/search.context';
import { THEME } from '@/lib/theme';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SearchProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
          <Stack.Screen
            name="institution"
            options={{
              headerShown: true,
              headerShadowVisible: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: THEME['light'].background,
              },
              headerTintColor: THEME['light'].primary,
            }}
          />
        </Stack>
      </SearchProvider>
    </SafeAreaProvider>
  );
}
