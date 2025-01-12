import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Button, Input } from 'src/components';
import config from 'src/config';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email('Email inválido.'),
  password: z.string({ required_error: 'A senha é obrigatória.' }),
});

type signInFormData = z.infer<typeof signInFormSchema>;

let GoogleSignin = {
  configure: (_: any) => {},
};
let statusCodes = null;

if (config.ENV !== 'development') {
  GoogleSignin = require('@react-native-google-signin/google-signin');
  statusCodes =
    require('@react-native-google-signin/google-signin').statusCodes;
}

GoogleSignin.configure({
  webClientId:
    '831403833609-voubrli7i5ei1qqr4pmu3sgpq7k9b3mc.apps.googleusercontent.com',
});

export default function SignIn() {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await auth.signIn(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const res = await auth.signInGoogle({
        idToken: userInfo.idToken,
        clientId: userInfo.user.id,
      });
      if (res.user !== undefined) {
        router.replace('/');
      } else {
        Alert.alert('Erro no login', res.error);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert('Autenticação cancelada');
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert('Autenticação em andamento');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Autenticação com o Google não disponível no momento');
            break;
          default:
            Alert.alert(
              'Autenticação com o Google falhou. Tente novamente mais tarde'
            );
        }
      } else {
        Alert.alert(
          'Autenticação com o Google falhou. Tente novamente mais tarde'
        );
      }
    }
  };

  const isErrorWithCode = (error: any) => {
    if (error.code) {
      return true;
    }
    return false;
  };

  return (
    <View className="gap-3 px-4">
      <View className="flex-row justify-center gap-2">
        <View className="items-center">
          <Button
            customStyles="w-3/4"
            startIcon={
              <Ionicons
                name="logo-google"
                size={24}
                color={colors.text_neutral}
              />
            }
            onPress={onSubmitGoogle}
          >
            Login com Google
          </Button>
        </View>
      </View>

      <Text className="text-center font-reapp_regular text-xs">
        Ou entre com seu email e senha
      </Text>

      <View>
        <Text className="font-reapp_regular text-base">Email</Text>
        <Input
          placeholder="Digite seu email"
          inputMode="email"
          onChangeText={(text) =>
            setValue('email', text, { shouldValidate: true })
          }
          value={watch('email')}
          {...register('email')}
        />
        {errors.email && (
          <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View>
        <Text className="font-reapp_regular text-base">Senha</Text>
        <Input
          placeholder="Digite sua senha"
          secureTextEntry
          {...register('password')}
          onChangeText={(text) =>
            setValue('password', text, { shouldValidate: true })
          }
          value={watch('password')}
        />
        {errors.password && (
          <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
            {errors.password.message}
          </Text>
        )}
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
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            'Entrar'
          )}
        </Button>
      </View>

      <Text className="text-center font-reapp_regular text-base">
        Não possui conta?
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
