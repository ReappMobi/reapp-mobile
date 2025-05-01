import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type CardPostProps = {
  postId: string | number;
  userImageUrl?: string;
  userImageBlurhash?: string;
  mediaUrl?: string;
  mediaBlurhash?: string;
  nameInstitution?: string;
  description?: string;
  timeAgo?: string;
  isLikedInitial?: boolean;
  isSavedInitial?: boolean;
  onPressInstitutionProfile?: () => void;
  onPressLike?: () => void;
  onPressUnlike?: () => void;
  onPressSave?: () => void;
  onPressUnSave?: () => void;
  onPressDelete?: () => void;
};

function CardPost({
  postId,
  userImageUrl,
  userImageBlurhash,
  mediaUrl,
  mediaBlurhash,
  nameInstitution,
  description,
  timeAgo,
  isLikedInitial,
  isSavedInitial,
  onPressInstitutionProfile,
  onPressLike,
  onPressUnlike,
  onPressSave,
  onPressUnSave,
  onPressDelete,
}: CardPostProps) {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);
  const [isSaved, setIsSaved] = useState<boolean>(isSavedInitial);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleLikePress = () => {
    setIsLiked((prevLiked) => {
      const newLiked = !prevLiked;

      if (newLiked) {
        onPressLike?.();
      } else {
        onPressUnlike?.();
      }

      return newLiked;
    });
  };

  const handleSavePress = () => {
    setIsSaved((prevSaved) => {
      const newSaved = !prevSaved;

      if (newSaved) {
        onPressSave?.();
      } else {
        onPressUnSave?.();
      }

      return newSaved;
    });
  };

  const handleCommentPress = () => {
    router.push(`/post-comments/${postId}`);
  };

  return (
    <View className="w-full bg-white p-4">
      <View className="flex flex-row justify-between">
        <Pressable onPress={onPressInstitutionProfile}>
          <View className="mb-2.5 flex-row items-center gap-x-2">
            <View className="h-10 w-10 items-center justify-center">
              <Image
                className="h-full w-full rounded-full"
                source={{ uri: userImageUrl }}
                placeholder={{ blurhash: userImageBlurhash }}
                contentFit="cover"
                transition={500}
              />
            </View>

            <Text className="font-reapp_medium text-base text-text_neutral">
              {nameInstitution}
            </Text>
          </View>
        </Pressable>
        {onPressDelete && (
          <Pressable onPress={onPressDelete}>
            <Ionicons name="trash-outline" size={26} color="black" />
          </Pressable>
        )}
      </View>

      <Pressable
        className="w-full"
        onPress={handleCommentPress}
        style={{ overflow: 'hidden' }}
      >
        <View className="mb-2.5">
          <Text
            numberOfLines={expanded ? null : 3}
            className="font-reapp_regular text-sm text-text_neutral "
          >
            {description}
          </Text>
          <Pressable onPress={() => setExpanded((prev) => !prev)}>
            <Text className="text-text_blue font-reapp_regular text-xs">
              {expanded ? 'Ler menos' : 'Ler mais'}
            </Text>
          </Pressable>
        </View>
        {mediaUrl && (
          <View className="mb-2.5 h-56 w-full items-center justify-center">
            <Image
              className="h-full w-full rounded-md"
              source={{ uri: mediaUrl }}
              placeholder={{ blurhash: mediaBlurhash }}
              contentFit="cover"
              transition={500}
            />
          </View>
        )}
      </Pressable>

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-reapp_regular text-xs text-text_gray">
            {timeAgo}
          </Text>
        </View>

        <View className="flex-row gap-x-4">
          <Pressable onPress={handleLikePress}>
            <Ionicons
              name={isLiked ? 'heart-sharp' : 'heart-outline'}
              size={26}
              color="black"
            />
          </Pressable>

          <Pressable onPress={handleSavePress}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color="black"
            />
          </Pressable>

          <Pressable onPress={handleCommentPress}>
            <FontAwesome name="comments-o" size={26} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default CardPost;
