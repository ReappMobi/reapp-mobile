import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { THEME } from '@/lib/theme';

export default function AuxLayout() {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Stack
      screenOptions={{
        title: 'REAPP',
        headerShown: true,
        headerTintColor: THEME['light'].primary,
        headerShadowVisible: false,
        headerBackVisible: true,
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'reapp_bold',
        },
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
