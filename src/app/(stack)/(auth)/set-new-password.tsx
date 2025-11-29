import { View } from 'react-native';
import { Input } from 'src/components';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function SetNewPassword() {
  return (
    <View className="p-4">
      <View className="gap-y-3">
        <View>
          <Text className="font-bold text-xl">Recuperar senha</Text>
        </View>

        <View>
          <Text className="font-regular text-base text-text_neutral">
            Código de verificação
          </Text>
          <Input
            placeholder="Digite o código de verificação"
            inputMode="text"
          />
        </View>

        <View>
          <Text className="font-regular text-base">Nova Senha</Text>
          <Input placeholder="Senha (mínimo 8 caracteres)" secureTextEntry />
        </View>

        <View>
          <Text className="font-regular text-base">Confirmar senha</Text>
          <Input placeholder="Confirme a senha" secureTextEntry />
        </View>
        <View>
          <Button className="w-full">
            <Text>Atualizar senha</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
