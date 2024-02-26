import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Colors from 'src/constants/colors';

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

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
  const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);
  const [isSaved, setIsSaved] = useState<boolean>(isSavedInitial);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isUserImageLoading, setIsUserImageLoading] = useState<boolean>(true);
  const [isPostImageLoading, setIsPostImageLoading] = useState<boolean>(true);

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
          <View className="h-8 w-8 items-center justify-center">
            {isUserImageLoading && (
              <ActivityIndicator size="small" color={Colors.color_primary} />
            )}
            <Image
              className="h-full w-full"
              source={userImagePath}
              placeholder={blurhash}
              contentFit="cover"
              transition={500}
              onLoadStart={() => setIsUserImageLoading(false)}
            />
          </View>

          <Text className="font-_medium text-base text-text_neutral">
            {nameInstitution}
          </Text>
        </View>

        <Text className="font-_bold text-sm text-text_neutral">
          {nameInstitution}
        </Text>
      </View>
      <View />

      <View className="mb-2.5">
        <Text
          numberOfLines={expanded ? null : 3}
          className="font-_regular text-sm text-text_neutral "
          onPress={() => setExpanded(!expanded)}
        >
          {description}
        </Text>
      </View>
      {imagePath && (
        <View className="mb-2.5 h-56 w-full items-center justify-center">
          {isPostImageLoading && (
            <ActivityIndicator
              size="large"
              color={Colors.color_primary}
              className="items-center justify-center text-center"
            />
          )}

          <Image
            className="h-full w-full rounded-md"
            source={imagePath}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
            onLoadStart={() => setIsPostImageLoading(false)}
          />
        </View>
      )}

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
