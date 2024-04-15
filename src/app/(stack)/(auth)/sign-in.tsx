import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { View, Text } from 'react-native';
import { Button, Input } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';

export default function SignIn() {
  const auth = useAuth();
  return (
    <View className="gap-3 px-4">
      <View className="flex-row justify-center gap-2">
        <View>
          <Button customStyles="w-14 justify-center bg-color_third_light">
            <Ionicons
              name="logo-facebook"
              size={24}
              color={colors.text_neutral}
            />
          </Button>
        </View>

        <View>
          <Button customStyles="w-14 justify-center bg-color_third_light">
            <Ionicons
              name="logo-google"
              size={24}
              color={colors.text_neutral}
            />
          </Button>
        </View>
      </View>

      <Text className="text-center font-reapp_regular text-xs">
        Ou cadastre-se com seu email
      </Text>

      <View>
        <Text className="font-reapp_regular text-base">Email</Text>
        <Input placeholder="Digite seu email" inputMode="email" />
      </View>

      <View>
        <Text className="font-reapp_regular text-base">Senha</Text>
        <Input placeholder="Digite sua senha" secureTextEntry />
      </View>

      <Text
        className="text-base text-text_primary underline underline-offset-1"
        onPress={() => router.push('/forgot-password')}
      >
        Esqueci minha senha
      </Text>

      <View>
        <Button
          customStyles="w-full justify-center bg-color_primary"
          textColor="text-text_light"
          onPress={() => {
            auth.signIn();
            auth.signed && router.replace('/');
          }}
        >
          Entrar
        </Button>
      </View>

      <Text className="text-center font-reapp_regular text-base">
        Não possui conta?{' '}
        <Link
          href="/profile-selector"
          push
          className="text-base text-text_primary underline underline-offset-1"
        >
          Cadastre-se
        </Link>
      </Text>
    </View>
  );
}
