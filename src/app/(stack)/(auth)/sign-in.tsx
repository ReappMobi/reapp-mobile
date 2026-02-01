import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Button } from 'src/components/ui/button';
import { Text } from 'src/components/ui/text';
import { useAuth } from 'src/hooks/useAuth';
import {
  signInFormData,
  signInFormSchema,
} from 'src/schemas/auth/sign-in.schema';
import { ControlledInput, Form } from '@/components/app/form';
import { SignInData } from '@/types';

export default function SignIn() {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const form = useForm<signInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: SignInData) => {
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
      <Form form={form} onSubmit={onSubmit} className="gap-y-4">
        <ControlledInput
          name="email"
          label="Email"
          placeholder="Digite seu email"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <ControlledInput
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
        />
      </Form>

      <View className="gap-y-2">
        <Link href="password-recovery">
          <Text className="underline text-sm text-secondary">
            Esqueceu sua senha?
          </Text>
        </Link>
        <Button
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text> Entrar </Text>
          )}
        </Button>
        <Text className="text-center text-xs font-medium text-muted-foreground">
          ou se preferir
        </Text>
        <Link href="/profile-selector" asChild>
          <Button size="default" disabled={loading} variant="outline">
            <Text>Cadastre-se</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
