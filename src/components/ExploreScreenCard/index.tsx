import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';

type ExploreScreenCardProps = {
  imageUrl?: string;
  nameInstitution?: string;
  isFavoritedInitial?: boolean;
  isFollowInitial?: boolean;
  isInstitution?: boolean;
  onPressFavorite?: () => void;
  onPressFollow?: () => void;
  onPressInfo?: () => void;
  onPressCard?: () => void;
};

function ExploreScreenCard({
  imageUrl,
  nameInstitution,
  isFavoritedInitial,
  isFollowInitial,
  isInstitution,
  onPressFavorite,
  onPressFollow,
  onPressInfo,
  onPressCard,
}: ExploreScreenCardProps) {
  const [isFavorited, setIsFavorited] = useState(isFavoritedInitial);
  const [isFollow, setIsFollow] = useState(isFollowInitial);

  const handleFavoritePress = () => {
    setIsFavorited(!isFavorited);
    onPressFavorite && onPressFavorite();
  };

  const handleFollowPress = () => {
    setIsFollow(!isFollow);
    onPressFollow && onPressFollow();
  };

  return (
    <TouchableOpacity onPress={onPressCard}>
      <View className="w-28 gap-y-1 rounded-md border border-color_gray bg-white p-2">
        <View className="items-end justify-end">
          <Pressable onPress={handleFavoritePress}>
            <Ionicons
              name="heart-outline"
              size={24}
              color={isFavorited ? 'red' : 'black'}
            />
          </Pressable>
        </View>

        <View className="gap-y-2">
          <View className="h-16 w-full">
            <Image className="h-full w-full" source={{ uri: imageUrl }} />
          </View>

          <Text className="text-center font-_medium text-xs">
            {nameInstitution}
          </Text>
        </View>

        {isInstitution && (
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={handleFollowPress}>
              <Ionicons
                name={isFollow ? 'remove' : 'add'}
                size={27}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressInfo}>
              <Ionicons name="ellipsis-vertical" size={22} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ExploreScreenCard;
