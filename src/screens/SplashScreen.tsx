import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text } from 'react-native';

import SplashScreenImage from '../assets/images/SplashScreenImage.svg';
import Button from '../components/Button';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';

export default function SplashScreen() {
  return (
    <ScreenContainer>
      <Header
        leftComponent={
          <Text className="text-2xl font-bold uppercase text-text_primary">
            reapp
          </Text>
        }
      />

      <View className="items-center justify-center gap-y-8">
        <SplashScreenImage width={256} height={183} />
        <Text className="text-base font-medium">
          Somos uma organização que busca facilitar o encontro de doadores e
          parceiros com instituições beneficentes. Vamos começar?
        </Text>
        <Button
          customStyles="justify-center gap-x-1 mt-8"
          endIcon={
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_primary}
            />
          }
        >
          Continuar
        </Button>
      </View>
    </ScreenContainer>
  );
}
