import { Stack } from 'expo-router';
import { THEME } from '@/lib/theme';

export default function MembersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: THEME['light'].background,
        },
        headerTintColor: THEME['light'].primary,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerTitle: 'Novo Membro',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
