import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ScreenContainer from '../../../components/ScreenContainer';

function SignUpInstitutionPageScreen() {
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
            <View>
              <Text className="font-_regular text-base">Email</Text>
              <Input placeholder="exemplo@dominio.com" inputMode="email" />
            </View>

            <View>
              <Text className="font-_regular text-base">
                Nome da Instituição
              </Text>
              <Input placeholder="Nome" inputMode="text" />
            </View>

            <View>
              <Text className="font-_regular text-base">Telefone</Text>
              <Input placeholder="(00) 0000-0000" inputMode="tel" />
            </View>

            <View>
              <Text className="font-_regular text-base">CNPJ</Text>
              <Input placeholder="12.345.678/0001-00" inputMode="numeric" />
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

            <Text className="text-center font-_regular text-base">
              Já possui uma conta?{' '}
              <Text className="text-base text-text_primary underline underline-offset-1">
                Entrar
              </Text>
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

export default SignUpInstitutionPageScreen;
