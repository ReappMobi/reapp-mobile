import { router } from 'expo-router';
import { View } from 'react-native';
import ForgetPasswordImage from 'src/assets/images/ForgetPassowordImage.svg';
import { Input } from 'src/components';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function ForgotPassword() {
  return (
    <View className="gap-y-3 p-4">
      <View>
        <Text className="font-bold text-xl">Esqueceu a senha?</Text>
      </View>
      <View className="mb-4 items-center">
        <ForgetPasswordImage width={256} height={170} />
      </View>
      <View>
        <Text className="text-center font-regular text-base">
          Digite seu endereço de email
        </Text>
      </View>

      <View>
        <Input placeholder="Digite o email da sua conta" inputMode="email" />
      </View>

      <View>
        <Button
          className="w-full"
          onPress={() => {
            router.replace('set-new-password');
          }}
        >
          <Text>Enviar email</Text>
        </Button>
      </View>
    </View>
  );
}
