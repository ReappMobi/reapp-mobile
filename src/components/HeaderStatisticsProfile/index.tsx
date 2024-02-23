import { Image } from 'expo-image';
import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  image?: string;
  name?: string;
  donationsQty?: number;
  followingQty?: number;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function HeaderStatisticsProfile({
  image,
  name,
  donationsQty,
  followingQty,
}: Props) {
  return (
    <View className="flex flex-row items-center gap-5">
      <View>
        <Image
          className="h-16 w-16 rounded-full"
          source={image}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
      </View>

      <View>
        <Text className="font-_bold text-lg text-text_neutral">{name}</Text>

        <View className="flex flex-row gap-8">
          <Text className="font-regular text-small text-text_neutral">
            {donationsQty} Doações
          </Text>
          <Text className="font-regular text-small text-text_neutral">
            {followingQty} Seguindo
          </Text>
        </View>
      </View>
    </View>
  );
}

export default HeaderStatisticsProfile;
