import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import DonationConfirmScreenImage from 'src/assets/images/DonationConfirmScreenImage.svg';
import { Header } from 'src/components';
import Colors from 'src/constants/colors';

function DonationConfirmScreen({ route, navigation }) {
  const { name, date, value } = route.params;

  return (
    <View className="flex-1">
      <View className="items-center bg-color_primary px-4 pb-4 pt-4">
        <Header
          leftComponent={
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.text_white}
              onPress={() => navigation.goBack()}
            />
          }
          rightComponent={
            <Text className="mb-4 text-2xl font-bold uppercase text-white">
              reapp
            </Text>
          }
        />

        <View className="mb-4 mt-4">
          <DonationConfirmScreenImage width={256} height={199} />
        </View>

        <View>
          <Text className="text-center font-_bold text-xl text-white">
            Obrigado, {name}. Você doou para essa instituição
          </Text>
        </View>
      </View>

      <View className="mt-8 flex-1 items-center">
        <View className="items-center gap-y-4">
          <Text className="font-_medium text-base text-text_gray">{date}</Text>
          <Text className="text-text-neutral font-_bold text-xl">{name}</Text>
          <Text className="font-_regular text-xl">{value}</Text>
        </View>
      </View>
    </View>
  );
}

export default DonationConfirmScreen;
