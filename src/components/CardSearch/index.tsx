import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

type CardSearchProps = {
  imageUrl?: string;
  title?: string;
  onPress?: () => void;
};
function CardSearch({ imageUrl, title, onPress }: CardSearchProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="mb-3.5 flex-row items-center gap-x-4 border-b-2 border-white p-4">
        <View>
          <Image className="h-9 w-9 rounded-full" source={{ uri: imageUrl }} />
        </View>

        <View>
          <Text className="font-_medium text-base">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardSearch;
