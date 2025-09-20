import { Image } from 'expo-image';
import { router } from 'expo-router';
import { DrawerNavigationHelpers } from 'node_modules/@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useAuth } from 'src/hooks/useAuth';
import { Text } from '../ui/text';
import { Avatar, AvatarFallback, ExpoAvatarImage } from '../ui/avatar';

type HeaderStatisticsProfileProps = {
  navigation: DrawerNavigationHelpers;
};

function HeaderStatisticsProfile({ navigation }: HeaderStatisticsProfileProps) {
  const { isDonor, user } = useAuth();

  const { name, note, followersCount, followingCount, media } = user || {};

  const onPressEditProfile = () => {
    navigation.closeDrawer();
    const route = isDonor ? '/edit-donor-profile' : '/edit-institution-profile';
    router.push(route);
  };

  return (
    <View className="flex w-full flex-col justify-start">
      <Pressable
        className="flex-row justify-between mb-2"
        onPress={onPressEditProfile}
      >
        <View className="mb-2 flex flex-col gap-y-1">
          <Avatar alt="Profile Picture" className="mb-1 w-14 h-14">
            {media && (media.remoteUrl || media.blurhash) && (
              <ExpoAvatarImage
                source={{ uri: media.remoteUrl }}
                placeholder={{ blurhash: media.blurhash }}
                className="w-14 h-14 rounded-full"
              />
            )}
            <AvatarFallback className="items-center justify-center rounded-full w-14 h-14">
              <Text variant="h3">{user?.name.slice(0, 1)}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="flex flex-col gap-y-0.5">
            <View className="text-wrap">
              <Text variant="h4" className="text-white font-bold">
                {name}
              </Text>
            </View>

            {note && (
              <View className="text-wrap">
                <Text variant="small" className="text-white text-xs">
                  {note}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>

      <View className="flex flex-row items-center gap-x-2">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-white text-sm">{followingCount}</Text>
          <Text className="text-sm text-white font-medium">Seguindo</Text>
        </View>
        {!isDonor && (
          <View className="flex-row items-center gap-1">
            <Text className="font-bold text-white text-sm">
              {followersCount}
            </Text>
            <Text className="text-sm text-white font-medium">Seguidores</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default HeaderStatisticsProfile;
