import { Image } from 'expo-image';
import React from 'react';
import { View, Text } from 'react-native';

type VolunteerCardProps = {
  image?: string;
  name: string;
  blurhash?: string;
};

function VolunteerCard({ image, name, blurhash }: VolunteerCardProps) {
  return (
    <View className="flex-row items-center gap-x-2 border-b border-zinc-200 p-2">
      <Image
        className="h-[64] w-[64] rounded-full"
        source={image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <Text className="font-reapp_medium text-sm">{name}</Text>
    </View>
  );
}

export default VolunteerCard;
