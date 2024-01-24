import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';

function SignUpPageScreen() {
  return (
    <ScrollView>
      <ScreenContainer>
        <View>
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
              <Input placeholder="exemplo@dominio.com" inputMode="email" />
            </View>

            <View>
              <Text className="font-_regular text-base">Nome de usuário</Text>
              <Input placeholder="Nome" inputMode="text" />
            </View>

            <View>
              <Text className="font-_regular text-base">Telefone</Text>
              <Input placeholder="(00) 0000-0000" inputMode="tel" />
            </View>

            <View>
              <Text className="font-_regular text-base">Senha</Text>
              <Input
                placeholder="Senha (mínimo 8 caracteres)"
                secureTextEntry
              />
            </View>

            <View>
              <Text className="font-_regular text-base">Confirmar senha</Text>
              <Input
                placeholder="Senha (mínimo 8 caracteres)"
                secureTextEntry
              />
            </View>

            <View>
              <Button
                customStyles="bg-color_primary w-full justify-center"
                textColor="text-text_light"
              >
                Cadastrar
              </Button>
            </View>

            <Text className="text-center font-_regular">
              Já possui uma conta?{' '}
              <Text className="text-text_primary underline underline-offset-1">
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
