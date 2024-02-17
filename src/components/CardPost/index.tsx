import { Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

type CardPostProps = {
  userImagePath?: string;
  imagePath?: string;
  nameInstitution?: string;
  description?: string;
  timeAgo?: string;
  isLikedInitial?: boolean;
  isSavedInitial?: boolean;
  onPressLike?: () => void;
  onPressSave?: () => void;
};

function CardPost({
  userImagePath,
  imagePath,
  nameInstitution,
  description,
  timeAgo,
  isLikedInitial,
  isSavedInitial,
  onPressLike,
  onPressSave,
}: CardPostProps) {
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [expanded, setExpanded] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    onPressLike && onPressLike();
  };

  const handleSavePress = () => {
    setIsSaved(!isSaved);
    onPressSave && onPressSave();
  };

  const handleCommentPress = () => {};

  return (
    <View className="w-full bg-white p-4">
      <View>
        <View className="mb-2.5 flex-row items-center gap-x-2">
          <View className="h-8 w-8">
            <Image
              className="h-full w-full rounded-lg"
              source={{ uri: userImagePath }}
            />
          </View>

          <Text className="font-_medium text-base text-text_neutral">
            {nameInstitution}
          </Text>
        </View>

        <View />
      </View>

      <View className="mb-2.5 h-56 w-full">
        <Image className="h-full w-full" source={{ uri: imagePath }} />
      </View>

      <View className="mb-2.5">
        <Text className="font-_regular text-base text-text_neutral">
          {description}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-_regular text-xs text-text_gray">
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
