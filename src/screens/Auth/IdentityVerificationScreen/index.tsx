import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import IdentifyVerifyIllustation from 'src/assets/images/IdentityVerifyIlustration.svg';
import { Button, Header, Input, ScreenContainer } from 'src/components';

export default function IdentityVerificationScreen() {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <Header
        leftComponent={
          <Text className="font-reapp_bold text-2xl uppercase text-text_primary">
            reapp
          </Text>
        }
      />
      <View className="flex-1">
        <View className="gap-y-8">
          <Text className="font-reapp_bold text-xl">
            Verifique sua identidade
          </Text>
          <IdentifyVerifyIllustation width={256} height={170} />
          <Text className="bg- mb-4 text-center font-reapp_regular text-lg text-text_neutral">
            Digite seu número de telefone
          </Text>
          <Input placeholder="(00) 0000-000" />
          <Button
            customStyles="mt-4 w-full justify-center bg-color_primary p-5"
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
