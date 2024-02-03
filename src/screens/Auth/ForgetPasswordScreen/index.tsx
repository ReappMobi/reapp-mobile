import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import ForgetPasswordImage from 'src/assets/images/ForgetPassowordImage.svg';
import { Button, Header, Input, ScreenContainer } from 'src/components';

function ForgetPasswordScreen() {
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

        <View className="gap-y-3">
          <View>
            <Text className="font-_bold text-xl">Esqueceu a senha?</Text>
          </View>
          <View className="mb-4 items-center">
            <ForgetPasswordImage width={256} height={170} />
          </View>
          <View>
            <Text className="text-center font-_regular text-base">
              Digite seu endereço de email
            </Text>
          </View>
          <View>
            <Input
              placeholder="Digite o email da sua conta"
              inputMode="email"
            />
          </View>

          <View>
            <Button
              customStyles="bg-color_primary w-full justify-center"
              textColor="text-text_light"
              onPress={() => {
                navigation.dispatch(
                  StackActions.push('ForgetPasswordResetScreen')
                );
              }}
            >
              Enviar email
            </Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

export default ForgetPasswordScreen;
