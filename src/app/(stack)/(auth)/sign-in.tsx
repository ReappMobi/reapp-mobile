import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { CircleX } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { ControlledInput, Form } from '@/components/app/form';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ReappException } from '@/errors/ReappException';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/lib/toast-config';
import {
  SignInFormData,
  signInFormSchema,
} from '@/schemas/auth/sign-in.schema';
import { useLogin } from '@/services/auth/auth.service';
import { LoginData } from '@/services/auth/auth.types';

export default function SignIn() {
  const { saveUserAndToken } = useAuth();

  const { mutate: login, isPending } = useLogin({
    onSuccess: async ({ token, user }) => {
      await saveUserAndToken(user, token);
      router.replace('/');
    },
    onError: (e) => {
      if (ReappException.isReappException(e)) {
        showToast({
          type: 'error',
          header: 'Erro ao fazer login',
          description: e.message,
          icon: CircleX,
        });
        return;
      }
      showToast({
        type: 'error',
        header: 'Erro ao fazer login',
        description:
          'Tivemos um problema na autenticação, tente novamente mais tarde.',
        icon: CircleX,
      });
      return;
    },
  });

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerClassName="flex-1"
    >
      <ScreenContainer className="items-center justify-center">
        <Card>
          <CardHeader>
            <Text variant="h3">Entre na sua conta</Text>
            <Text variant="muted" className="text-muted-foreground">
              Faça login na sua conta para continuar
            </Text>
          </CardHeader>
          <CardContent>
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

            <View className="gap-y-2 mt-2">
              <Link href="password-recovery">
                <Text className="underline text-sm text-secondary">
                  Esqueceu sua senha?
                </Text>
              </Link>
              <Button
                size="lg"
                onPress={form.handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text> Entrar </Text>
                )}
              </Button>
              <Text className="text-center text-xs font-medium text-muted-foreground">
                ou se preferir
              </Text>
              <Link href="/profile-selector" asChild>
                <Button size="default" disabled={isPending} variant="outline">
                  <Text>Criar uma conta</Text>
                </Button>
              </Link>
            </View>
          </CardContent>
        </Card>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
}
