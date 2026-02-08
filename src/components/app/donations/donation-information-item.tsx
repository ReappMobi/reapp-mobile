import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/ui/text';
import colors from '@/constants/colors';

interface DonationInformationItemProps {
  image?: string;
  title?: string;
  subtitle?: string;
}

const BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export function DonationInformationItem({
  image,
  title,
  subtitle,
}: DonationInformationItemProps) {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  return (
    <View className="mb-5 flex-row items-center gap-x-5 border-b border-slate-100 pb-3">
      <View className="h-16 w-16 items-center justify-center">
        <Image
          className="h-full w-full rounded-full bg-slate-100"
          source={image}
          placeholder={BLURHASH}
          contentFit="cover"
          transition={500}
          onLoadStart={() => setIsLoadingImage(true)}
          onLoadEnd={() => setIsLoadingImage(false)}
        />
        {isLoadingImage && (
          <View className="absolute inset-0 items-center justify-center">
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </View>

      <View className="flex-1">
        <Text className="font-medium text-base">{title}</Text>
        <Text className="font-regular text-sm">{subtitle}</Text>
      </View>
    </View>
  );
}
