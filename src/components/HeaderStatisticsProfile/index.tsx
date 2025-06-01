import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from 'src/hooks/useAuth';

type Props = {
  image?: string;
  name?: string;
  donationsQty?: number;
  followingQty?: number;
  followersQty?: number;
  note?: string;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function HeaderStatisticsProfile({
  image,
  name,
  followingQty,
  followersQty,
  note,
}: Props) {
  const { isDonor } = useAuth();
  const navigation = useNavigation();

  return (
    <View className="flex w-full flex-col justify-start">
      <Pressable
        className="mb-4 flex-row justify-between"
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          if (isDonor) {
            router.push('/edit-donor-profile');
          } else {
            router.push('/edit-institution-profile');
          }
        }}
      >
        <View className="mb-2 flex flex-col gap-y-1">
          <Image
            className="h-16 w-16 rounded-full"
            source={image || 'https://placehold.co/64x64'}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
          <View className="flex flex-col gap-y-2">
            <View className="text-wrap">
              <Text className="font-reapp_bold text-xl text-white">{name}</Text>
            </View>

            {note && (
              <View className="text-wrap">
                <Text className="truncate font-reapp_regular text-xs text-white">
                  {note}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
      <View className="my-4">
        <View className="flex flex-col justify-between gap-y-3">
          {/* 
          {!isDonor && (
            <Text className="font-reapp_regular text-sm text-white">
              <Text className="font-reapp_bold text-sm">{donationsQty} </Text>
              Doações
            </Text>
          )}
          */}
          {!isDonor && (
            <>
              <Text className="font-reapp_regular text-sm text-white">
                <Text className="font-reapp_bold text-sm">{followingQty} </Text>
                Seguindo
              </Text>

              <Text className="font-reapp_regular text-sm text-white">
                <Text className="font-reapp_bold text-sm">{followersQty} </Text>
                Seguidores
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default HeaderStatisticsProfile;
