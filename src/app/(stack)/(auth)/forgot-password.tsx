import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useState } from 'react';
import { Text, View } from 'react-native';
import ForgetPasswordImage from 'src/assets/images/ForgetPassowordImage.svg';

const ForgetPasswordImageStyled = cssInterop(ForgetPasswordImage, {
  className: 'style',
});

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <View className="gap-y-3 p-4">
      <View>
        <Text className="font-reapp_bold text-xl text-text_neutral/90">
          Esqueceu a senha?
        </Text>
      </View>
      <View className="mb-4 items-center">
        <ForgetPasswordImageStyled className="w-64 h-72" />
      </View>

      <View>
        <Input
          placeholder="Digite o email da sua conta"
          inputMode="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          className="border-color_primary/60 border-2 focus:border-color_primary rounded-sm h-12"
        />
      </View>

      <View>
        <Button
          className="w-full justify-center h-11 bg-color_primary active:bg-color_secundary/90 disabled:opacity-85 disabled:bg-color_primary/50"
          onPress={() => {
            router.replace('recovery-password/' + encodeURIComponent(email));
          }}
          disabled={email.length === 0}
        >
          <Text className="text-base text-white font-semibold">
            Receber código de verificação
          </Text>
        </Button>
      </View>
    </View>
  );
}
