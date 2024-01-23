import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView className="flex-1 pt-12 px-4">
      {children}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
