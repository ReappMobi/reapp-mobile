import { debounce } from 'es-toolkit/function';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Bookmark, Heart, MessageCircle } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useLike } from 'src/hooks/useLike';
import { useSave } from 'src/hooks/useSave';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/utils/time-ago';
import { Icon } from '../ui/icon';

type CardPostProps = {
  postId: string | number;
  userImageUrl?: string;
  userImageBlurhash?: string;
  mediaUrl?: string;
  mediaBlurhash?: string;
  name?: string;
  description?: string;
  updatedAt?: string;
  isLikedInitial?: boolean;
  isSavedInitial?: boolean;
  mediaAspect?: number;
  onPressInstitutionProfile?: () => void;
  onPressDelete?: () => void;
};

function CardPost({
  postId,
  userImageUrl,
  userImageBlurhash,
  mediaUrl,
  mediaBlurhash,
  name,
  mediaAspect = 1,
  description,
  updatedAt,
  isLikedInitial,
  isSavedInitial,
  onPressInstitutionProfile,
}: CardPostProps) {
  const [expanded, setExpanded] = useState(false);
  const { isLiked, toggleLike } = useLike(postId, isLikedInitial);
  const { isSaved, toggleSave } = useSave(postId, isSavedInitial);

  const canExpandContent = description.length > 100;

  const postedIn = timeAgo(updatedAt);

  const handleCommentPress = useCallback(
    debounce(() => {
      router.push(`/post-comments/${postId}`);
    }, 170),
    [postId]
  );

  return (
    <View className="w-full bg-white py-3">
      <View className="flex-row w-full gap-x-3">
        <View className="max-w-10">
          <Pressable onPress={onPressInstitutionProfile}>
            <View className="h-10 w-10 items-center justify-center">
              <Image
                className="h-full w-full rounded-full"
                source={{ uri: userImageUrl }}
                placeholder={{ blurhash: userImageBlurhash }}
                contentFit="cover"
                transition={500}
              />
            </View>
          </Pressable>
        </View>
        <View className="bg- w-full flex-1">
          <View className="flex-row items-center gap-x-2">
            <Text
              onPress={onPressInstitutionProfile}
              className="font-medium text-base text-text_neutral"
            >
              {name}
            </Text>
            <Text>
              <Text className="font-ligth text-xs text-gray-500">
                {postedIn}
              </Text>
            </Text>
          </View>
          <View>
            <View className="pb-2">
              <Text
                numberOfLines={expanded ? undefined : 4}
                className="font-regular text-sm text-text-neutral"
              >
                {description}
              </Text>

              {canExpandContent && (
                <Pressable onPress={() => setExpanded(!expanded)}>
                  <Text className="text-text_blue font-regular text-xs">
                    {expanded ? 'Ler menos' : 'Ler mais'}
                  </Text>
                </Pressable>
              )}
            </View>
            {mediaUrl && (
              <View className="h-max w-full items-center justify-center rounded-lg">
                <Image
                  className="w-full rounded-lg"
                  source={{ uri: mediaUrl }}
                  placeholder={{ blurhash: mediaBlurhash }}
                  contentFit="cover"
                  transition={500}
                  style={{ aspectRatio: mediaAspect }}
                />
              </View>
            )}
            <View className="flex-row gap-x-5 mt-3">
              <Pressable onPress={toggleLike}>
                <Icon
                  as={Heart}
                  size={23}
                  className={cn(
                    'stroke-text-neutral',
                    isLiked && 'stroke-rose-500 fill-rose-500'
                  )}
                />
              </Pressable>

              <Pressable onPress={toggleSave}>
                <Icon
                  as={Bookmark}
                  size={22}
                  className={cn(
                    ' stroke-text-neutral mt-0.5',
                    isSaved && ' fill-text-neutral'
                  )}
                />
              </Pressable>

              <Pressable onPress={handleCommentPress}>
                <Icon
                  as={MessageCircle}
                  size={22}
                  className={cn(' stroke-text-neutral mt-0.5')}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CardPost;
