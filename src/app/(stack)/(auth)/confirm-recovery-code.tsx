import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ConfirmCodeImage from 'src/assets/images/ConfirmCodeImage.svg';
import { Button, Input } from 'src/components';
import {
  recoveryPassword,
  sendRecoveryEmail,
} from 'src/services/password-recovery';
import { z } from 'zod';

export default function ConfirmRecoveryCode() {
  const { token, email } = useLocalSearchParams();
  const [currentToken, setCurrentToken] = useState(token);
  const [loading, setLoading] = useState(false);
  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const recoveryCodeSchema = z.object({
    code: z
      .string()
      .min(6, 'O código deve ter exatamente 6 dígitos')
      .max(6, 'O código deve ter exatamente 6 dígitos')
      .regex(/^\d+$/, 'O código deve conter apenas números'),
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  type RecoveryCodeFormData = z.infer<typeof recoveryCodeSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryCodeFormData>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleVerifyCode = async (data: RecoveryCodeFormData) => {
    if (loading || !token) return;

    setLoadingSendEmail(true);
    setLoading(true);
    try {
      const response = await recoveryPassword(
        currentToken as string,
        data.code
      );
      router.replace({
        pathname: '/reset-password',
        params: { token: response.token },
      });
    } catch (error) {
      Alert.alert('Erro na verificação', error.message);
    } finally {
      setLoading(false);
      setLoadingSendEmail(false);
    }
  };

  const handleResendCode = async () => {
    if (loadingSendEmail) {
      return;
    }
    setLoadingSendEmail(true);
    try {
      const response = await sendRecoveryEmail(email as string);
      setCurrentToken(response.token);
      Alert.alert('Código reenviado', 'Verifique sua caixa de entrada');
    } catch (error) {
      Alert.alert('Erro no envio do email', error.message);
    } finally {
      setCountdown(60);
      setLoadingSendEmail(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      className="bg-background_light"
    >
      <View className="flex-1 justify-center p-8">
        <View className="mb-8 items-center">
          <ConfirmCodeImage width={220} height={160} />
        </View>

        <View className="mb-8">
          <Text className="mb-2 text-center font-reapp_bold text-3xl text-color_primary">
            Verificação de Código
          </Text>
          <Text className="text-center text-base text-neutral-600">
            Insira o código de 6 dígitos que enviamos para{'\n'}seu endereço de
            email
          </Text>
        </View>

        <View className="mb-6">
          <Input
            placeholder="Digite o código aqui"
            inputMode="tel"
            maxLength={6}
            autoFocus
            onChangeText={(text) =>
              setValue('code', text.replace(/[^0-9]/g, ''), {
                shouldValidate: true,
              })
            }
            value={watch('code')}
            {...register('code')}
          />
          {errors.code && (
            <Text className="mt-2 font-reapp_medium text-sm text-color_redsh">
              {errors.code.message}
            </Text>
          )}
        </View>

        <Button
          customStyles="w-full justify-center rounded-lg bg-color_primary py-4 shadow-lg"
          textColor="text-white font-reapp_bold"
          onPress={handleSubmit(handleVerifyCode)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            'Verificar Código'
          )}
        </Button>

        <View className="mt-6 flex-row items-center justify-center">
          <Text className="mr-2 text-neutral-600">Não recebeu o código?</Text>
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={countdown > 0 || loadingSendEmail}
          >
            <Text
              className={`font-reapp_bold ${countdown > 0 || loadingSendEmail ? 'text-neutral-400' : 'text-color_primary'}`}
            >
              Reenviar código {countdown > 0 && `(${countdown}s)`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
