import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import MailCheck from 'lucide-react-native/dist/esm/icons/mail-check';
import MailX from 'lucide-react-native/dist/esm/icons/mail-x';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { z } from 'zod';
import { ScreenContainer } from '@/components';
import { SafeKeyboardAvoidView } from '@/components/app/containers/keyboard-avoid-view';
import { ControlledInput, Form } from '@/components/app/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { showToast } from '@/lib/toast-config';
import { useSendRecoveryEmail } from '@/services/account/account.service';

const recoveryPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'O email é obrigatório',
    })
    .email({
      message: 'Formato de email inválido',
    }),
});
type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordSchema>;

export default function Page() {
  const { mutate: sendRecoveryEmail, isPending } = useSendRecoveryEmail({
    onError(err) {
      if (err.message === 'Conta não encontrada') {
        showToast({
          type: 'error',
          header: 'Conta não encontrada',
          description: 'Não encontramos nenhuma conta com esse email',
          icon: MailX,
        });
        return;
      }
      showToast({
        type: 'error',
        header: 'Erro ao enviar o emial',
        description: 'Tivemos um erro ao enviar o email',
        icon: MailX,
      });
    },
    onSuccess({ token }, { email }) {
      router.push({
        pathname: 'password-recovery/enter-code',
        params: { token, email },
      });
      showToast({
        type: 'success',
        header: 'Email enviado',
        description: 'Enviamos o código de recuperação para seu email',
        icon: MailCheck,
      });
    },
  });

  const form = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(recoveryPasswordSchema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = ({ email }: RecoveryPasswordFormData) => {
    if (email) {
      sendRecoveryEmail({ email });
    }
  };

  return (
    <SafeKeyboardAvoidView>
      <ScreenContainer className="items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5 items-center">
              <CardTitle variant="h4">Esqueceu sua senha?</CardTitle>
              <CardDescription variant="lead">
                Digite seu email para recuperar sua senha
              </CardDescription>
            </View>
          </CardHeader>
          <CardContent>
            <Form form={form} onSubmit={onSubmit}>
              <View className="gap-y-5 items-center">
                <ControlledInput name="email" placeholder="Digite seu email" />
                <Button
                  size="lg"
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <ActivityIndicator
                      size="large"
                      color={THEME['light'].primaryForeground}
                    />
                  ) : (
                    <Text> Enviar código de recuperação </Text>
                  )}
                </Button>
                <View className="flex-row items-center gap-x-1">
                  <Text variant="small">Lembrou sua senha?</Text>
                  <Link href="sign-in" asChild dismissTo>
                    <Text variant="small" className="text-primary">
                      Entrar
                    </Text>
                  </Link>
                </View>
              </View>
            </Form>
          </CardContent>
        </Card>
      </ScreenContainer>
    </SafeKeyboardAvoidView>
  );
}
