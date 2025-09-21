import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { HeaderStatisticsProfile } from 'src/components';
import { DrawerMenu } from 'src/components/DrawerMenu';
import { useAuth } from 'src/hooks/useAuth';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { token } = useAuth();

  if (!token) {
    return null;
  }

  return (
    <View className="w-full flex-1">
      <View className="bg-color_primary p-4 pt-12">
        <HeaderStatisticsProfile navigation={navigation} />
      </View>
      <View className="w-full flex-1 bg-white px-4">
        <DrawerMenu navigation={navigation} />
      </View>
    </View>
  );
};

export { DrawerContent };
