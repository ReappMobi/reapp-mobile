import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, Image } from 'react-native';

import Colors from '../../constants/Colors';
import Button from '../Button';

type CardInstitutionProjectProps = {
  imagePath?: string;
  title?: string;
  description?: string;
  textButton?: string;
  onPress?: () => void;
};

function CardInstitutionProject({
  imagePath,
  title,
  description,
  textButton,
  onPress,
}: CardInstitutionProjectProps) {
  return (
    <View className="w-full rounded-md bg-white p-4 shadow-xl">
      <View className="mb-2.5 h-56 w-full">
        <Image className="h-full w-full" source={{ uri: imagePath }} />
      </View>

      <View className="mb-2.5">
        <Text className="font-_bold text-base text-text_neutral">{title}</Text>
      </View>

      {description && (
        <View className="mb-2.5">
          <Text className="font-_regular text-base text-text_neutral">
            {description}
          </Text>
        </View>
      )}

      <Button
        customStyles="bg-color_primary w-full justify-center"
        textColor="text-text_light"
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.text_white}
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
