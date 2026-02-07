import type { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';

type HeaderStatisticsProfileProps = {
  image?: string;
  blurhash?: string;
  name?: string;
  donationsQty?: number;
  followingQty?: number;
  followersQty?: number;
  note?: string;
  navigation: DrawerNavigationHelpers;
};

function HeaderStatisticsProfile({
  image,
  name,
  followingQty,
  followersQty,
  note,
  blurhash,
  navigation,
}: HeaderStatisticsProfileProps) {
  const { isDonor } = useAuth();

  return (
    <View className="flex w-full flex-col justify-start">
      <Link
        href={isDonor ? '/edit-donor-profile' : '/edit-institution-profile'}
        asChild
        onPress={() => navigation.closeDrawer()}
      >
        <Pressable className="mb-4 h-auto p-0 items-start">
          <View className="mb-2 flex flex-col gap-y-1">
            <Image
              className="h-16 w-16 rounded-full"
              source={image || 'https://placehold.co/64x64'}
              placeholder={blurhash}
              contentFit="cover"
              transition={500}
            />
            <View className="flex flex-col gap-y-2">
              <View>
                <Text className="font-bold text-xl text-white">{name}</Text>
              </View>

              {note && (
                <View>
                  <Text className="truncate font-normal text-xs text-white">
                    {note}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Link>
      <View className="my-4">
        <View className="flex flex-col justify-between gap-y-3">
          {!isDonor && (
            <View>
              <Text className="font-normal text-sm text-white">
                <Text className="font-bold text-sm text-white">
                  {followingQty}{' '}
                </Text>
                Seguindo
              </Text>

              <Text className="font-normal text-sm text-white">
                <Text className="font-bold text-sm text-white">
                  {followersQty}{' '}
                </Text>
                Seguidores
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export { HeaderStatisticsProfile };
