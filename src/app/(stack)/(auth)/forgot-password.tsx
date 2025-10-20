import { ControlledInput, Form } from '@/components';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useSendEmail } from '@/services/auth/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import ForgetPasswordImage from 'src/assets/images/ForgetPassowordImage.svg';
import { z } from 'zod';

const ForgetPasswordImageStyled = cssInterop(ForgetPasswordImage, {
  className: 'style',
});

const schema = z.object({
  email: z.string().email('Digite um email válido'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const { toast } = useToast();
  const { mutate: sendEmail, isPending: isSendingEmail } = useSendEmail();

  const form = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email }: FormData) => {
    sendEmail(
      { email },
      {
        onSuccess: ({ token }) => {
          toast('O código foi enviado para o seu email!');
          router.replace(`confirm-code/${token}`);
        },
        onError: (error) => {
          toast('Erro ao enviar o email de recuperação.');
          console.error('Error sending recovery email:', error);
        },
      }
    );
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="gap-y-3 p-4">
      <View>
        <Text className="font-reapp_bold text-xl text-text_neutral/90">
          Esqueceu a senha?
        </Text>
      </View>

      <View className="mb-4 items-center">
        <ForgetPasswordImageStyled className="w-64 h-72" />
      </View>

      <ControlledInput
        name="email"
        placeholder="Digite o email da sua conta"
        inputMode="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />

      <View>
        <Button
          className="w-full justify-center h-11 bg-color_primary active:bg-color_secundary/90 disabled:opacity-85 disabled:bg-color_primary/50"
          disabled={isSendingEmail}
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text className="text-base text-white font-semibold">
            Receber código de verificação
          </Text>
        </Button>
      </View>
    </Form>
  );
}
