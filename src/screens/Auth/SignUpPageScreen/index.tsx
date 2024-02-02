import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Button, Header, Input, ScreenContainer } from '../../../components';
import Colors from '../../../constants/Colors';

function SignUpPageScreen({ route }) {
  const { isDonor } = route.params;
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
            {isDonor && (
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
            )}

            {isDonor && (
              <Text className="text-center font-_regular text-xs">
                Ou cadastre-se com seu email
              </Text>
            )}

            <View>
              <Text className="font-_regular text-base">Email</Text>
              <Input placeholder="exemplo@dominio.com" inputMode="email" />
            </View>

            <View>
              <Text className="font-_regular text-base">
                {isDonor ? 'Nome de usuário' : 'Nome da Instituição'}
              </Text>
              <Input placeholder="Nome" inputMode="text" />
            </View>

            <View>
              <Text className="font-_regular text-base">Telefone</Text>
              <Input placeholder="(00) 0000-0000" inputMode="tel" />
            </View>

            {!isDonor && (
              <View>
                <Text className="font-_regular text-base">CNPJ</Text>
                <Input placeholder="12.345.678/0001-00" inputMode="numeric" />
              </View>
            )}

            <View>
              <Text className="font-_regular text-base">Senha</Text>
              <Input
                placeholder="Senha (mínimo 8 caracteres)"
                secureTextEntry
              />
            </View>

            <View>
              <Text className="font-_regular text-base">Confirmar senha</Text>
              <Input placeholder="Confirme a senha" secureTextEntry />
            </View>

            <View>
              <Button
                customStyles="bg-color_primary w-full justify-center"
                textColor="text-text_light"
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('IdentityVerificationScreen')
                  );
                }}
              >
                Cadastrar
              </Button>
            </View>

            <Text className="text-center font-_regular text-base">
              Já possui uma conta?{' '}
              <Text
                className="text-base text-text_primary underline underline-offset-1"
                onPress={() => {
                  navigation.dispatch(StackActions.push('LoginScreen'));
                }}
              >
                Entrar
              </Text>
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

export default SignUpPageScreen;
