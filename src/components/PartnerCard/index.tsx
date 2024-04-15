import { Image } from 'expo-image';
import React from 'react';
import { View, Text } from 'react-native';

type PartnerCardProps = {
  image?: string;
  name: string;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function PartnerCard({ image, name }: PartnerCardProps) {
  return (
    <View className="min-h-[156] w-[138] gap-y-0.5 rounded-md bg-white p-4 shadow-lg">
      <Image
        className="h-[113] w-full"
        source={image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <Text className="text-center font-reapp_medium text-sm text-text_neutral">
        {name}
      </Text>
    </View>
  );
}

export default PartnerCard;
