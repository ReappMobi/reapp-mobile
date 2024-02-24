import { Image } from 'expo-image';
import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  image?: string;
  title?: string;
  subtitle?: string;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function DonationInformationItem({ image, title, subtitle }: Props) {
  return (
    <View className="mb-5 flex flex-row items-center gap-5 border-b-2 border-color_gray_light pb-2">
      <View>
        <Image
          className="h-16 w-16 rounded-full"
          source={image}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
      </View>

      <View className="flex-1">
        <Text className="text-small font-_medium text-text_neutral">
          {title}
        </Text>

        <Text className="text-small font-_regular text-text_neutral">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

export default DonationInformationItem;
