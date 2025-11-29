import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-white">
      {children}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
