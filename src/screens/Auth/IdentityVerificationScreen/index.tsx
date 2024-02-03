import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import IdentifyVerifyIllustation from '../../../assets/images/IdentityVerifyIlustration.svg';
import { ScreenContainer, Header, Input, Button } from '../../../components';

export default function IdentityVerificationScreen() {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <Header
        leftComponent={
          <Text className="font-_bold text-2xl uppercase text-text_primary">
            reapp
          </Text>
        }
      />
      <View className="flex-1">
        <View className="gap-y-8">
          <Text className="font-_bold text-xl">Verifique sua identidade</Text>
          <IdentifyVerifyIllustation width={256} height={170} />
          <Text className="bg- mb-4 text-center font-_regular text-lg text-text_neutral">
            Digite seu número de telefone
          </Text>
          <Input placeholder="(00) 0000-000" />
          <Button
            customStyles="w-full mt-4 p-5 justify-center bg-color_primary"
            textColor="text-text_light"
            onPress={() => {
              navigation.dispatch(StackActions.push('CheckCodeScreen'));
            }}
          >
            Enviar código
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}
