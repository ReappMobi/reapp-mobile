import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Text } from 'src/components/ui/text';
import { useAuth } from 'src/hooks/useAuth';
import {
  signInFormData,
  signInFormSchema,
} from 'src/schemas/auth/sign-in.schema';
import { cn } from '@/lib/utils';

export default function SignIn() {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
    reValidateMode: 'onSubmit',
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
    <View className="gap-3 px-4 flex-1 bg-white">
      <View className="pt-1">
        <Text className="text-base text-sm">Email</Text>
        <Input
          autoFocus
          placeholder="Digite seu email"
          className={cn(errors.email && 'border-rose-400')}
          inputMode="email"
          {...register('email')}
        />
        {errors.email && (
          <Text className="my-1 text-xs font-semibold text-destructive">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View>
        <Text className="text-base text-sm">Senha</Text>
        <Input
          className={cn(errors.password && 'border-rose-400')}
          placeholder="Digite sua senha"
          secureTextEntry
          {...register('password')}
        />
        {errors.password && (
          <Text className="my-1 text-xs font-semibold text-destructive">
            {errors.password.message}
          </Text>
        )}
      </View>
      {/* TODO: enable password recovery */}
      <View>
        <Button size="lg" onPress={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text> Entrar </Text>
          )}
        </Button>
      </View>
      <Text className="text-center text-xs font-bold"> ou se preferir </Text>
      <Button
        size="default"
        onPress={() => router.push('/profile-selector')}
        disabled={loading}
        variant="outline"
      >
        <Text className="text-foreground font-semibold text-md">
          Cadastre-se
        </Text>
      </Button>
    </View>
  );
}
