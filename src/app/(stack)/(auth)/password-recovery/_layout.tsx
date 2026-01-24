import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="password-recovery"
        options={{
          title: 'Recuperar senha',
        }}
      />
    </Stack>
  );
}
