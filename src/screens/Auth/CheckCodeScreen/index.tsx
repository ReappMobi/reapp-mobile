import React from 'react';
import { Text, View } from 'react-native';
import CheckCodeScreenImage from 'src/assets/images/CheckCodeScreenImage.svg';
import { Button, Header, Input, ScreenContainer } from 'src/components';

export default function CheckCodeScreen() {
  //TODO: Change verificationNumber to the actual number
  const verificationNumber = '983277216';
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
        <View className="items-center gap-y-4">
          <Text className="self-start font-reapp_bold text-xl">
            Verificar código
          </Text>
          <Text className="text-md self-start font-reapp_regular text-text_neutral">
            enviado para {verificationNumber}
          </Text>
          <View className="mb-4">
            <CheckCodeScreenImage width={256} height={302.33} />
          </View>
          <Input placeholder="000-000-000" />
          <Button
            customStyles="mt-4 w-full justify-center bg-color_primary p-5"
            textColor="text-text_light"
          >
            Verificar
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}
