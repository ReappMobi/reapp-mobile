import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';

type ExploreScreenCardProps = {
  imageUrl?: string;
  title?: string;
  isFavoritedInitial?: boolean;
  isFollowInitial?: boolean;
  isInstitution?: boolean;
  onPressFavorite?: () => void;
  onPressFollow?: () => void;
  onPressUnfollow?: () => void;
  onPressInfo?: () => void;
  onPressCard?: () => void;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ExploreScreenCard = ({
  imageUrl,
  title,
  isFavoritedInitial,
  isFollowInitial,
  isInstitution,
  onPressFavorite,
  onPressFollow,
  onPressUnfollow,
  onPressInfo,
  onPressCard,
}: ExploreScreenCardProps) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(isFavoritedInitial);
  const [isFollow, setIsFollow] = useState<boolean>(isFollowInitial);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const { isDonor } = useAuth();

  const handleFavoritePress = () => {
    setIsFavorited(!isFavorited);
    onPressFavorite && onPressFavorite();
  };

  const handleFollowPress = () => {
    setIsFollow(!isFollow);
    onPressFollow && onPressFollow();
  };

  const handleUnfollowPress = () => {
    setIsFollow(!isFollow);
    onPressUnfollow && onPressUnfollow();
  };

  let cardHeight: string;
  if (!isDonor) {
    cardHeight = 'h-36';
  } else if (isInstitution) {
    cardHeight = 'h-44';
  } else {
    cardHeight = 'h-40';
  }

  return (
    <TouchableOpacity onPress={onPressCard}>
      <View
        className={`${cardHeight} w-32 justify-between rounded-md border border-color_gray bg-white p-2`}
      >
        {onPressFavorite && (
          <View className="items-end justify-end">
            <Pressable onPress={handleFavoritePress}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={isFavorited ? 'red' : 'black'}
              />
            </Pressable>
          </View>
        )}

        <View className="h-16 w-full">
          {isLoadingImage && (
            <ActivityIndicator size="large" color={colors.color_primary} />
          )}
          <Image
            className="h-full w-full"
            source={imageUrl}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
            onLoadStart={() => setIsLoadingImage(false)}
          />
        </View>

        <Text className="text-center font-reapp_medium text-xs">{title}</Text>

        {isInstitution && isDonor && (
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={isFollow ? handleUnfollowPress : handleFollowPress}
            >
              <Ionicons
                name={isFollow ? 'close' : 'add'}
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
};

export default memo(ExploreScreenCard);
