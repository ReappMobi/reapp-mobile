import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, ScrollView, Text } from 'react-native';

import { Button, Header, Input, ScreenContainer } from '../../../components';
import Colors from '../../../constants/Colors';

function LoginPageScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <ScreenContainer>
        <View className="py-4">
          <Header
            leftComponent={
              <Text className="font-_bold text-2xl uppercase text-text_primary">
                reapp
              </Text>
            }
          />

          <View className="gap-3">
            <View className="flex-row justify-center gap-2">
              <View>
                <Button customStyles="w-14 justify-center bg-color_third_light">
                  <Ionicons
                    name="logo-facebook"
                    size={24}
                    color={Colors.text_neutral}
                  />
                </Button>
              </View>

              <View>
                <Button customStyles="w-14 justify-center bg-color_third_light">
                  <Ionicons
                    name="logo-google"
                    size={24}
                    color={Colors.text_neutral}
                  />
                </Button>
              </View>
            </View>

            <Text className="text-center font-_regular text-xs">
              Ou cadastre-se com seu email
            </Text>

            <View>
              <Text className="font-_regular text-base">Email</Text>
              <Input placeholder="Digite seu email" inputMode="email" />
            </View>

            <View>
              <Text className="font-_regular text-base">Senha</Text>
              <Input placeholder="Digite sua senha" secureTextEntry />
            </View>

            <Text
              className="text-base text-text_primary underline underline-offset-1"
              onPress={() => {
                navigation.dispatch(StackActions.push('ForgetPasswordScreen'));
              }}
            >
              Esqueci minha senha
            </Text>

            <View>
              <Button
                customStyles="bg-color_primary w-full justify-center"
                textColor="text-text_light"
              >
                Entrar
              </Button>
            </View>

            <Text className="text-center font-_regular text-base">
              Não possui conta?{' '}
              <Text
                className="text-base text-text_primary underline underline-offset-1"
                onPress={() => {
                  navigation.dispatch(StackActions.push('SignupSplash'));
                }}
              >
                Cadastre-se
              </Text>
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

export default LoginPageScreen;
