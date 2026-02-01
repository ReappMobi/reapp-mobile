import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';

import CircleCheck from 'lucide-react-native/dist/esm/icons/circle-check';
import CircleX from 'lucide-react-native/dist/esm/icons/circle-x';
import MailX from 'lucide-react-native/dist/esm/icons/mail-x';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import z from 'zod';
import { ScreenContainer } from '@/components';
import { ControlledOTPInput, Form } from '@/components/app/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { showToast } from '@/lib/toast-config';
import {
  useRecoveryPassword,
  useSendRecoveryEmail,
} from '@/services/account/account.service';

const sendOTPSchema = z.object({
  code: z
    .string()
    .length(6, 'O código deve ter 6 dígitos')
    .regex(/^\d+$/, { message: 'O código só pode ter dígitos' }),
});

type SendOTPFormData = z.infer<typeof sendOTPSchema>;

export default function Page() {
  const { email, token: paramToken } = useLocalSearchParams<{
    token: string;
    email: string;
  }>();

  const [token, setToken] = useState(paramToken);
  const [tries, setTries] = useState(3);

  const [resendCountdown, setResendCountdown] = useState<number>(30);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Resend cutdown
  useEffect(() => {
    if (resendCountdown > 0) {
      resendTimerRef.current = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(resendTimerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, [resendCountdown]);

  const form = useForm<SendOTPFormData>({
    resolver: zodResolver(sendOTPSchema),
    defaultValues: {
      code: '',
    },
    reValidateMode: 'onChange',
  });

  const { mutate: verifyCode, isPending: isVerifying } = useRecoveryPassword({
    onSuccess: ({ token }) => {
      router.dismissTo({
        pathname: '/password-recovery/set-password',
        params: { token },
      });
    },
    onError: (error) => {
      showToast({
        type: 'error',
        header: 'Erro ao verificar código',
        description: error.message || 'Código inválido ou expirado',
        icon: CircleX,
      });
      setResendCountdown(0);
    },
  });

  const { mutate: resendCode, isPending: isResendingCode } =
    useSendRecoveryEmail({
      onSuccess: ({ token }) => {
        showToast({
          type: 'success',
          header: 'Código reenviado',
          description: 'Verifique seu email novamente',
          icon: CircleCheck,
        });
        setToken(token);
      },
      onError: (error) => {
        showToast({
          type: 'error',
          header: 'Erro ao reenviar',
          description: error.message,
          icon: CircleX,
        });
      },
    });

  const onSubmit = (data: SendOTPFormData) => {
    verifyCode({
      code: data.code,
      token,
    });
  };

  const handleResend = () => {
    if (email && token && tries > 0) {
      resendCode({ email });
      setTries((prev) => prev - 1);
    } else {
      showToast({
        type: 'error',
        header: 'Erro no email',
        description: 'Houve um erro ao recuperar sua senha',
        icon: MailX,
      });
      router.dismissAll();
    }
  };

  return (
    <ScreenContainer className="gap-y-4">
      <View>
        <Text variant="h3">Insira o código</Text>
        <View className="my-1">
          <Text variant="muted">
            Insira o código de 6 digitos que enviamos para o email
          </Text>
          <Text className="font-bold text-sm">{email}</Text>
        </View>
      </View>
      <Card className="max-w-sm">
        <CardContent>
          <Form form={form} onSubmit={onSubmit} className="gap-y-4 mt-4 p-3">
            <ControlledOTPInput
              name="code"
              separator={true}
              expiresIn={120} // 2 minutes
              showExpiryTimer={true}
              animate={true}
              shouldAutoSubmit={false}
              shouldHandleClipboard={true}
              disabled={isVerifying || isResendingCode}
            />
            <View className="flex-row items-center gap-x-0.5">
              <Text variant="small">Não recebeu um código? </Text>
              <Button
                variant="link"
                className="p-0"
                onPress={handleResend}
                disabled={resendCountdown > 0 && tries > 0}
              >
                <Text variant="small">Reenviar</Text>
              </Button>
            </View>
          </Form>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            disabled={isVerifying || isResendingCode}
          >
            {isVerifying && (
              <ActivityIndicator
                size="small"
                color={THEME['light'].primaryForeground}
              />
            )}
            <Text>Verficar</Text>
          </Button>
        </CardContent>
      </Card>
    </ScreenContainer>
  );
}
