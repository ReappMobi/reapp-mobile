import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ForgetPasswordImage from 'src/assets/images/ForgetPassowordImage.svg';
import { Button, Input } from 'src/components';
import { sendRecoveryEmail } from 'src/services/password-recovery';
import { z } from 'zod';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const forgotPasswordFormSchema = z.object({
    email: z
      .string({ required_error: 'O email é obrigatório.' })
      .email('Email inválido.'),
  });

  type forgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: forgotPasswordFormData) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await sendRecoveryEmail(data.email);
      setEmailSent(true);
      router.replace({
        pathname: '/confirm-recovery-code',
        params: { token: response.token, email: data.email },
      });
    } catch (error) {
      Alert.alert('Erro no envio', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="bg-background_light"
      >
        <View className="flex-1 justify-center p-8">
          <View className="mb-8 items-center">
            <ForgetPasswordImage width={240} height={180} />
          </View>

          <View className="mb-6">
            <Text className="mb-2 text-center font-reapp_bold text-3xl text-color_primary">
              Redefinir Senha
            </Text>
            <Text className="text-center text-base text-neutral-600">
              Digite seu email para receber o código{'\n'}de redefinição de
              senha
            </Text>
          </View>

          <View className="mb-6">
            <Input
              placeholder="exemplo@email.com"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              onChangeText={(text) =>
                setValue('email', text, { shouldValidate: true })
              }
              value={watch('email')}
              {...register('email')}
            />
            {errors.email && (
              <Text className="mt-2 font-reapp_medium text-sm text-color_redsh">
                {errors.email.message}
              </Text>
            )}
          </View>

          <Button
            customStyles="w-full justify-center rounded-lg bg-color_primary py-4 shadow-lg"
            textColor="text-white font-reapp_bold"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              'Enviar Instruções'
            )}
          </Button>

          <TouchableOpacity
            className="mt-6 self-center"
            onPress={() => router.replace('/sign-in')}
          >
            <Text className="font-reapp_medium text-color_primary">
              Lembrou da senha? Faça login
            </Text>
          </TouchableOpacity>

          {emailSent && (
            <View className="mt-6 rounded-lg bg-green-100 p-3">
              <Text className="text-center text-green-800">
                Email enviado com sucesso! Verifique sua caixa de entrada
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
