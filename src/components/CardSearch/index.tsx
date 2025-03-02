import { Image } from 'expo-image';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CardSearchProps = {
  imageUrl?: string;
  title?: string;
  onPress?: () => void;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function CardSearch({ imageUrl, title, onPress }: CardSearchProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="mb-3.5 flex-row items-center gap-x-4 border-b-2 border-white p-4">
        <View>
          <Image
            className="h-9 w-9 rounded-full"
            source={imageUrl}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        </View>

        <View>
          <Text className="font-reapp_medium text-base">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardSearch;
