import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Colors from 'src/constants/colors';

type Props = {
  image?: string;
  title?: string;
  subtitle?: string;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function DonationInformationItem({ image, title, subtitle }: Props) {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  return (
    <View className="mb-5 flex flex-row items-center gap-5 border-b-2 border-color_gray_light pb-2">
      <View className="h-16 w-16 items-center justify-center">
        {isLoadingImage && (
          <ActivityIndicator size="small" color={Colors.color_primary} />
        )}
        <Image
          className="h-full w-full rounded-full"
          source={image}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
          onLoadEnd={() => setIsLoadingImage(false)}
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
