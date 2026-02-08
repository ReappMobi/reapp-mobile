import { Image } from 'expo-image';
import { ChevronRight, Heart, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import colors from '@/constants/colors';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id?: number | string;
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaBlurhash?: string;
  textButton?: string;
  isFavoriteCard?: boolean;
  isLikedInitial?: boolean;
  onPress?: () => void;
  onPressLike?: () => void;
  onPressDelete?: () => void;

  imagePath?: string;
  subtitle?: string;
}

const DEFAULT_BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export function ProjectCard({
  title,
  description,
  mediaUrl,
  mediaBlurhash,
  textButton = 'Ver mais',
  isFavoriteCard,
  isLikedInitial = true,
  onPress,
  onPressLike,
  onPressDelete,
  imagePath,
  subtitle,
}: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    onPressLike?.();
  };

  const displayImage = mediaUrl || imagePath;
  const displayDescription = description || subtitle;

  return (
    <View className="w-full rounded-xl bg-white p-4 shadow-sm border border-slate-100">
      <View className="relative mb-3 h-56 w-full overflow-hidden rounded-lg bg-slate-100 items-center justify-center">
        <Image
          className="h-full w-full"
          source={displayImage}
          placeholder={mediaBlurhash || DEFAULT_BLURHASH}
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

        {isFavoriteCard && (
          <Pressable
            onPress={handleLikePress}
            className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-white/80"
          >
            <Icon
              as={Heart}
              size={24}
              className={cn(
                'stroke-slate-900',
                isLiked && 'fill-rose-500 stroke-rose-500'
              )}
            />
          </Pressable>
        )}

        {onPressDelete && (
          <Pressable
            onPress={onPressDelete}
            className="absolute left-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-white/80"
          >
            <Icon as={Trash2} size={22} className="stroke-rose-600" />
          </Pressable>
        )}
      </View>

      <View className="mb-2">
        <Text className="font-bold text-lg text-slate-900">{title}</Text>
      </View>

      {displayDescription && (
        <View className="mb-4">
          <Text
            numberOfLines={3}
            className="font-regular text-sm text-slate-600"
          >
            {displayDescription}
          </Text>
        </View>
      )}

      <Button
        className="w-full flex-row items-center justify-center gap-x-2"
        onPress={onPress}
      >
        <Text>{textButton}</Text>
        <Icon as={ChevronRight} size={18} className="stroke-white" />
      </Button>
    </View>
  );
}
