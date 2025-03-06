import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ResetPasswordImage from 'src/assets/images/ResetPasswordImage.svg';
import { Button, Input } from 'src/components';
import { resetPassword } from 'src/services/password-recovery';
import { z } from 'zod';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const passwordSchema = z
    .object({
      password: z.string().min(8, 'Mínimo de 8 caracteres'),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    });

  type PasswordFormData = z.infer<typeof passwordSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleResetPassword = async (data: PasswordFormData) => {
    if (loading || !token) return;

    setLoading(true);
    try {
      await resetPassword(
        token as string,
        data.password,
        data.passwordConfirmation
      );
      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      router.replace('/sign-in');
    } catch (error) {
      Alert.alert('Erro', error.message);
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
            <ResetPasswordImage width={220} height={160} />
          </View>

          <View className="mb-6">
            <Text className="mb-2 text-center font-reapp_bold text-3xl text-color_primary">
              Nova Senha
            </Text>
            <Text className="text-center text-base text-neutral-600">
              Crie uma nova senha segura para sua conta
            </Text>
          </View>

          <View className="mb-4">
            <Input
              placeholder="Digite sua nova senha"
              secureTextEntry
              onChangeText={(text) =>
                setValue('password', text, { shouldValidate: true })
              }
              value={watch('password')}
              {...register('password')}
            />
            {errors.password && (
              <Text className="mt-2 font-reapp_medium text-sm text-color_redsh">
                {errors.password.message}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Input
              placeholder="Confirme a nova senha"
              secureTextEntry
              onChangeText={(text) =>
                setValue('passwordConfirmation', text, { shouldValidate: true })
              }
              value={watch('passwordConfirmation')}
              {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && (
              <Text className="mt-2 font-reapp_medium text-sm text-color_redsh">
                {errors.passwordConfirmation.message}
              </Text>
            )}
          </View>

          <Button
            customStyles={`w-full justify-center rounded-lg bg-color_primary py-4 shadow-lg ${loading ? 'opacity-90' : ''}`}
            textColor="text-white font-reapp_bold"
            onPress={handleSubmit(handleResetPassword)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              'Redefinir Senha'
            )}
          </Button>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
