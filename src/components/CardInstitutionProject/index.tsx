import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

import colors from '../../constants/colors';
import Button from '../Button';

type CardInstitutionProjectProps = {
  imagePath?: string;
  title?: string;
  subtitle?: string;
  textButton?: string;
  isFavoriteCard?: boolean;
  onPressLike?: () => void;
  onPress?: () => void;
  onPressDelete?: () => void;
};

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function CardInstitutionProject({
  imagePath,
  title,
  subtitle,
  textButton,
  isFavoriteCard,
  onPressLike,
  onPress,
  onPressDelete,
}: CardInstitutionProjectProps) {
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    onPressLike && onPressLike();
  };

  return (
    <View className="w-full rounded-md bg-white p-4 shadow-xl">
      <View className="relative mb-2.5 h-56 w-full items-center justify-center">
        {isLoadingImage && (
          <ActivityIndicator size="large" color={colors.color_primary} />
        )}

        <Image
          className="h-full w-full"
          source={imagePath}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
          onLoadStart={() => setIsLoadingImage(false)}
        />

        {isFavoriteCard && (
          <View className="absolute right-3 top-3">
            <Pressable onPress={handleLikePress}>
              <Ionicons
                name={isLiked ? 'heart-sharp' : 'heart-outline'}
                size={34}
                color="red"
              />
            </Pressable>
          </View>
        )}

        {onPressDelete && (
          <View className="absolute right-3 top-3">
            <Pressable onPress={onPressDelete}>
              <Ionicons name="trash-outline" size={26} color="red" />
            </Pressable>
          </View>
        )}
      </View>

      <View className="mb-2.5">
        <Text className="font-reapp_bold text-base text-text_neutral">
          {title}
        </Text>
      </View>

      {subtitle && (
        <View className="mb-2.5">
          <Text className="font-reapp_regular text-base text-text_neutral">
            {subtitle}
          </Text>
        </View>
      )}

      <Button
        customStyles="w-full justify-center bg-color_primary"
        textColor="text-text_light"
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text_white}
          />
        }
        onPress={onPress}
      >
        {textButton}
      </Button>
    </View>
  );
}

export default CardInstitutionProject;
