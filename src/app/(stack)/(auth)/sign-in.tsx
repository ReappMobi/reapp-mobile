import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Button, Input } from 'src/components';
import GoogleButton from 'src/components/GoogleButton';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email('Email inválido.'),
  password: z.string({ required_error: 'A senha é obrigatória.' }),
  isDonor: z.boolean({ required_error: 'Tipo de usuário é obrigatório.' }),
});

type signInFormData = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  const auth = useAuth();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await auth.signIn(data);
    if (res.user !== undefined) {
      router.replace('/');
    } else {
      Alert.alert('Erro no login', res.error);
    }
  };

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
          <GoogleButton />
        </View>
      </View>

      <Text className="text-center font-reapp_regular text-xs">
        Ou cadastre-se com seu email
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

      <View>
        <Text className="font-reapp_regular text-base">Tipo de usuário</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => setValue('isDonor', true, { shouldValidate: true })}
            className="flex-row items-center"
          >
            <Text className="mr-2">Sou doador</Text>
            <View
              className={`h-4 w-4 rounded-full border ${
                watch('isDonor') === true
                  ? 'bg-color_primary'
                  : 'bg-transparent'
              }`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setValue('isDonor', false, { shouldValidate: true })}
            className="flex-row items-center"
          >
            <Text className="mr-2">Sou instituição</Text>
            <View
              className={`h-4 w-4 rounded-full border ${
                watch('isDonor') === false
                  ? 'bg-color_primary'
                  : 'bg-transparent'
              }`}
            />
          </TouchableOpacity>
        </View>
        {errors.isDonor && (
          <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
            {errors.isDonor.message}
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
