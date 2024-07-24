import { Image } from 'expo-image';
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from 'src/hooks/useAuth';

type Props = {
  image?: string;
  name?: string;
  donationsQty?: number;
  followingQty?: number;
  followersQty?: number;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function HeaderStatisticsProfile({
  image,
  name,
  donationsQty,
  followingQty,
  followersQty,
}: Props) {
  const { isDonor } = useAuth();
  return (
    <View className="flex w-3/4 flex-row items-center justify-start gap-x-5">
      <View>
        <Image
          className="h-12 w-12 rounded-full"
          source={image}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
      </View>

      <View>
        <View className="text-wrap">
          <Text className="font-reapp_bold text-lg text-white">{name}</Text>
        </View>
        <View className="flex flex-row items-center justify-between gap-x-2">
          {donationsQty && (
            <Text className="text-small font-reapp_regular text-white">
              {donationsQty} Doações
            </Text>
          )}
          {isDonor ? (
            <Text className="text-small font-reapp_regular text-white">
              {followingQty} Seguindo
            </Text>
          ) : (
            <Text className="text-small font-reapp_regular text-white">
              {followersQty} Seguidores
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default HeaderStatisticsProfile;
