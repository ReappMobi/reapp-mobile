import { Text, View } from 'react-native';
import { Button, Input } from 'src/components';

export default function SetNewPassword() {
  return (
    <View className="p-4">
      <View className="gap-y-3">
        <View>
          <Text className="font-reapp_bold text-xl">Recuperar senha</Text>
        </View>

        <View>
          <Text className="font-reapp_regular text-base text-text_neutral">
            Código de verificação
          </Text>
          <Input
            placeholder="Digite o código de verificação"
            inputMode="text"
          />
        </View>

        <View>
          <Text className="font-reapp_regular text-base">Nova Senha</Text>
          <Input placeholder="Senha (mínimo 8 caracteres)" secureTextEntry />
        </View>

        <View>
          <Text className="font-reapp_regular text-base">Confirmar senha</Text>
          <Input placeholder="Confirme a senha" secureTextEntry />
        </View>
        <View>
          <Button
            customStyles="w-full justify-center bg-primary"
            textColor="text-text_light"
          >
            Atualizar senha
          </Button>
        </View>
      </View>
    </View>
  );
}
