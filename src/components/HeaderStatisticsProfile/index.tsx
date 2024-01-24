import React from 'react';
import { View, Text, Image } from 'react-native';

type Props = {
  image?: string;
  name?: string;
  donationsQty?: number;
  followingQty?: number;
};

function HeaderStatisticsProfile({
  image,
  name,
  donationsQty,
  followingQty,
}: Props) {
  return (
    <View className="flex flex-row items-center gap-5">
      <View>
        <Image className="h-16 w-16 rounded-full" source={{ uri: image }} />
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
