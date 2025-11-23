import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import colors from 'src/constants/colors';

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
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        headerBackVisible: false,
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'reapp_bold',
        },
      }}
    />
  );
}
