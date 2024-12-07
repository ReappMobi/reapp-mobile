import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Input } from 'src/components';
import config from 'src/config';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { z } from 'zod';

let GoogleSignin = {
  configure: (_: any) => {},
};
let statusCodes = null;

if (config.ENV !== 'development') {
  GoogleSignin = require('@react-native-google-signin/google-signin');
  statusCodes =
    require('@react-native-google-signin/google-signin').statusCodes;
}
// Botar no .env
GoogleSignin.configure({
  webClientId:
    '831403833609-voubrli7i5ei1qqr4pmu3sgpq7k9b3mc.apps.googleusercontent.com',
});

const signUpDonorFormSchema = z
  .object({
    email: z
      .string({ required_error: 'O email é obrigatório.' })
      .email('Email inválido.'),
    name: z
      .string({ required_error: 'O nome é obrigatório.' })
      .max(25, 'O nome deve ter no máximo 25 caracteres'),
    phone: z
      .string()
      .regex(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        'O telefone não está no formato correto'
      )
      .optional(),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(8, 'A senha deve ter pelo menos 8 caracteres.'),
    confirm_password: z.string({
      required_error: 'A confirmação da senha é obrigatória.',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem.',
    path: ['confirm_password'],
  });

type signUpDonorFormData = z.infer<typeof signUpDonorFormSchema>;

export default function SignUp() {
  const phoneRef = useRef(null);
  const auth = useAuth();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpDonorFormData>({
    resolver: zodResolver(signUpDonorFormSchema),
  });

  const onSubmit = async (data: any) => {
    const unmaskPhone = phoneRef?.current.getRawValue();
    const dataReq = {
      name: data.name,
      password: data.password,
      phone: unmaskPhone,
      email: data.email,
    };
    const res = await auth.donnorSignUp(dataReq);
    if (res.error) {
      Alert.alert('Erro no cadastro de doador', res.error);
    } else {
      Alert.alert('Doador cadastrado com sucesso!');
      clearHistory();
    }
  };

  const onSubmitGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const res = await auth.donnorSignUpGoogle({ idToken: userInfo.idToken });
      if (res.error) {
        Alert.alert('Erro no cadastro de doador', res.error);
      } else {
        Alert.alert('Doador cadastrado com sucesso!');
        clearHistory();
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

  const isErrorWithCode = (error) => {
    if (error.code) {
      return true;
    }
    return false;
  };

  const clearHistory = () => {
    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }
    router.replace('/sign-in'); // Replace the last remaining stack element
  };

  return (
    <ScrollView>
      <View className="px-4 py-2">
        <View className="gap-4">
          <View className="flex-row justify-center gap-2">
            {/*
            <View>
              <Button customStyles="w-14 justify-center bg-color_third_light">
                <Ionicons
                  name="logo-facebook"
                  size={24}
                  color={colors.text_neutral}
                />
              </Button>
            </View>
            */}

            <View className="items-center">
              <Button
                customStyles="w-11/12"
                startIcon={
                  <Ionicons
                    name="logo-google"
                    size={24}
                    color={colors.text_neutral}
                  />
                }
                onPress={onSubmitGoogle}
              >
                Cadastre-se com Google
              </Button>
            </View>
          </View>

          <Text className="text-center font-reapp_regular text-xs">
            Ou cadastre-se com seu email
          </Text>

          <View>
            <Text className="text-md font-reapp_regular">Email *</Text>

            <Input
              placeholder="exemplo@dominio.com"
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
            <Text className="text-md font-reapp_regular">
              Nome de usuário *
            </Text>

            <Input
              placeholder="Nome"
              inputMode="text"
              {...register('name')}
              onChangeText={(text) =>
                setValue('name', text, { shouldValidate: true })
              }
              value={watch('name')}
              {...register('name')}
            />
            {errors.name && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.name.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Telefone</Text>
            <TextInputMask
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              onChangeText={(text) =>
                setValue('phone', text, { shouldValidate: true })
              }
              value={watch('phone')}
              {...register('phone')}
              placeholder="(00) 0000-0000"
              ref={phoneRef}
              className="border-1 min-h-14 w-full rounded border border-text_secondary 
                  bg-input_background px-2 py-4 font-reapp_regular 
                  text-base text-text_gray"
            />

            {errors.phone && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.phone.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Senha *</Text>

            <Input
              placeholder="Senha (mínimo 8 caracteres)"
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

          <View>
            <Text className="text-md font-reapp_regular">
              Confirmar senha *
            </Text>

            <Input
              placeholder="Confirme a senha"
              secureTextEntry
              {...register('confirm_password')}
              onChangeText={(text) =>
                setValue('confirm_password', text, { shouldValidate: true })
              }
              value={watch('confirm_password')}
            />

            {errors.confirm_password && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.confirm_password.message}
              </Text>
            )}
          </View>

          <View>
            <Button
              customStyles="w-full justify-center bg-color_primary"
              textColor="text-text_light"
              onPress={handleSubmit(onSubmit)}
            >
              Cadastrar
            </Button>
          </View>

          <Text className="text-md text-center font-reapp_regular">
            Já possui uma conta?{' '}
            <Link
              href="/sign-in"
              replace
              className="text-md text-text_primary underline underline-offset-1"
              onPress={() => clearHistory()}
            >
              Entrar
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
