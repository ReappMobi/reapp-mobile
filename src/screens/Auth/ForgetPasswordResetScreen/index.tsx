import React from 'react';
import { View, Text } from 'react-native';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ScreenContainer from '../../../components/ScreenContainer';

function ForgetPasswordResetScreen() {
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
            <Text className="font-_bold text-xl">Recuperar senha</Text>
          </View>

          <View>
            <Text className="font-_regular text-base text-text_neutral">
              Código de verificação
            </Text>
            <Input
              placeholder="Digite o código de verificação"
              inputMode="text"
            />
          </View>

          <View>
            <Text className="font-_regular text-base">Nova Senha</Text>
            <Input placeholder="Senha (mínimo 8 caracteres)" secureTextEntry />
          </View>

          <View>
            <Text className="font-_regular text-base">Confirmar senha</Text>
            <Input placeholder="Confirme a senha" secureTextEntry />
          </View>
          <View>
            <Button
              customStyles="bg-color_primary w-full justify-center"
              textColor="text-text_light"
            >
              Atualizar senha
            </Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

export default ForgetPasswordResetScreen;
