import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { HeaderStatisticsProfile } from 'src/components';
import { DrawerMenu } from 'src/components/DrawerMenu';
import { useAuth } from 'src/hooks/useAuth';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return null;
  }

  return (
    <View className="max-w-64 w-full flex-1 rounded-none">
      <View className="bg-primary px-6 pt-8">
        <HeaderStatisticsProfile
          image={user?.media?.remoteUrl}
          blurhash={user?.media?.blurhash}
          name={user?.name}
          followingQty={user.followingCount}
          followersQty={user.followersCount}
          note={user.note || ''}
          navigation={navigation}
        />
      </View>
      <View className="w-full flex-1 bg-white px-6">
        <View className="mt-4">
          <DrawerMenu navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

export default DrawerContent;
