import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  signInFormData,
  signInFormSchema,
} from 'src/schemas/auth/sign-in.schema';

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
      setLoading(false);
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="gap-3 px-4">
      <View className="pt-6">
        <Text className="text-base">Email</Text>
        <Input
          placeholder="Digite seu email"
          inputMode="email"
          autoFocus
          onChangeText={(text) =>
            setValue('email', text, { shouldValidate: true })
          }
          value={watch('email')}
          {...register('email')}
        />
        {errors.email && (
          <Text className="my-1 text-xs font-semibold text-color_redsh">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View>
        <Text className="text-base">Senha</Text>
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
          <Text className="my-1 text-xs font-semibold text-color_redsh">
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
          customStyles="w-full justify-center bg-primary"
          textColor="text-foreground"
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

      <View className="flex-row justify-center gap-2">
        <Text className="text-center font-reapp_regular text-base">
          Não possui conta?
        </Text>
        <Link
          href="/profile-selector"
          push
          className="text-base text-text_primary underline underline-offset-1"
        >
          Cadastre-se
        </Link>
      </View>
    </View>
  );
}
