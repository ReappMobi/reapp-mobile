import { router } from 'expo-router';
import { Text, View } from 'react-native';
import ForgetPasswordImage from 'src/assets/images/ForgetPassowordImage.svg';
import { Button, Input } from 'src/components';

export default function ForgotPassword() {
  return (
    <View className="gap-y-3 p-4">
      <View>
        <Text className="font-reapp_bold text-xl">Esqueceu a senha?</Text>
      </View>
      <View className="mb-4 items-center">
        <ForgetPasswordImage width={256} height={170} />
      </View>
      <View>
        <Text className="text-center font-reapp_regular text-base">
          Digite seu endereço de email
        </Text>
      </View>

      <View>
        <Input placeholder="Digite o email da sua conta" inputMode="email" />
      </View>

      <View>
        <Button
          customStyles="w-full justify-center bg-color_primary"
          textColor="text-text_light"
          onPress={() => {
            router.replace('set-new-password');
          }}
        >
          Enviar email
        </Button>
      </View>
    </View>
  );
}
