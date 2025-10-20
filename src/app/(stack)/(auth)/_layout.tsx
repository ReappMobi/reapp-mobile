import { ToastProvider } from '@/components/ui/toast';
import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { headerDefault } from 'src/constants/header';

export default function AuxLayout() {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <ToastProvider position="top">
      <Stack
        screenOptions={{
          title: 'REAPP',
          ...headerDefault,
        }}
      />
    </ToastProvider>
  );
}
