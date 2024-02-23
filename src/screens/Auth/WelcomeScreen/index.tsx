import Ionicons from '@expo/vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import SplashScreenImage from 'src/assets/images/SplashScreenImage.svg';
import { Button, Header, ScreenContainer } from 'src/components';
import Colors from 'src/constants/colors';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <View className="py-4">
        <Header
          leftComponent={
            <Text className="font-_bold text-2xl uppercase text-text_primary">
              reapp
            </Text>
          }
        />

        <View className="items-center justify-center gap-y-8">
          <SplashScreenImage width={256} height={183} />
          <Text className="font-_medium text-base">
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
            onPress={() => {
              navigation.dispatch(StackActions.push('LoginScreen'));
            }}
          >
            Continuar
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}
