import { Image } from 'expo-image';
import { Text, View } from 'react-native';

interface MemberCardProps {
  id?: number | string;
  name: string;
  mediaUrl?: string;
  mediaBlurhash?: string;
  image?: string;
  blurhash?: string;
}

export function MemberCard({
  name,
  mediaUrl,
  mediaBlurhash,
  image,
  blurhash,
}: MemberCardProps) {
  return (
    <View className="flex-row items-center gap-x-4 p-2">
      <Image
        className="h-14 w-14 rounded-full"
        source={mediaUrl || image}
        placeholder={mediaBlurhash || blurhash}
        contentFit="cover"
        transition={500}
      />

      <View className="flex-1">
        <Text className="font-bold text-base ">{name}</Text>
      </View>
    </View>
  );
}
