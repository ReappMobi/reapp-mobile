import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import CircleCheck from 'lucide-react-native/dist/esm/icons/circle-check';
import CircleX from 'lucide-react-native/dist/esm/icons/circle-x';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import z from 'zod';
import { ScreenContainer } from '@/components';
import { ControlledInput, Form } from '@/components/app/form';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { showToast } from '@/lib/toast-config';
import { useResetPassword } from '@/services/account/account.service';

const passwordSchema = z
  .string({ required_error: 'Este campo é obrigatório' })
  .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  .max(20, { message: 'A senha deve ter no máximo 20 caracteres' });

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: z.string({
      required_error: 'Este campo é obrigatório',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function Page() {
  const { token } = useLocalSearchParams<{
    token: string;
  }>();

  const { mutate: resetPassword, isPending: isReseting } = useResetPassword({
    onSuccess: () => {
      showToast({
        type: 'success',
        header: 'Senha alterada!',
        description: 'Sua senha foi alterada com sucesso!',
        icon: CircleCheck,
      });
      router.dismissTo('sign-in');
    },
    onError: () => {
      showToast({
        type: 'error',
        header: 'Erro ao alter sua senha',
        description:
          'Houve um erro ao alterar sua senha, tente novamente mais tarde.',
        icon: CircleX,
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = ({ password, passwordConfirmation }: ResetPasswordData) => {
    resetPassword({
      token,
      passwordConfirmation,
      password,
    });
  };

  return (
    <ScreenContainer>
      <Text variant="h3">Alterar senha</Text>
      <View className="my-1">
        <Text variant="muted">Insira a sua nova senha</Text>
      </View>

      <Form form={form} onSubmit={onSubmit} className="gap-y-3 mt-4">
        <ControlledInput name="password" secureTextEntry label="Senha" />
        <ControlledInput
          name="passwordConfirmation"
          secureTextEntry
          label="Confirme sua senha"
        />
        <Button
          className="mt-3"
          onPress={form.handleSubmit(onSubmit)}
          disabled={isReseting}
        >
          {isReseting && (
            <ActivityIndicator
              size="small"
              color={THEME['light'].primaryForeground}
            />
          )}
          <Text>Alterar senha</Text>
        </Button>
      </Form>
    </ScreenContainer>
  );
}
