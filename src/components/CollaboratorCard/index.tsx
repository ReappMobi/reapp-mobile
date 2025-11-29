import { Image } from 'expo-image';
import { Text, View } from 'react-native';

interface CollaboratorCardProps {
  image?: string;
  blurhash?: string;
  name: string;
}

export const CollaboratorCard = ({
  image,
  blurhash,
  name,
}: CollaboratorCardProps) => {
  return (
    <View className="flex-row items-center gap-x-2 border-b border-zinc-200 p-2">
      <Image
        className="h-[64] w-[64] rounded-full"
        source={image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <Text className="font-medium text-sm">{name}</Text>
    </View>
  );
};
