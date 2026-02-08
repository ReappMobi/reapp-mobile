import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { CircleCheck, CircleX } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import DefaultAvatar from '@/assets/images/avatar.png';
import { ScreenContainer } from '@/components';
import { ControlledCategoryInput } from '@/components/app/form/controlled-category-input';
import { ControlledInput } from '@/components/app/form/controlled-input';
import { ControlledMaskedInput } from '@/components/app/form/controlled-masked-input';
import { Form } from '@/components/app/form/form';
import {
  AvatarPicker,
  RequestMediaExtended,
} from '@/components/ui/avatar-picker';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ReappException } from '@/errors/ReappException';
import { showToast } from '@/lib/toast-config';
import {
  CreateAccountFormData,
  createAccountSchema,
  createInstitutionSchema,
} from '@/schemas/auth/sign-up.schema';
import { useCreateAccount } from '@/services/account/account.service';
import { CreateAccountData } from '@/services/account/account.types';
import { AccountType } from '@/types/Account';
import { BackendErrorCodes } from '@/types/errors';

export default function SignUpPage() {
  const { type } = useLocalSearchParams<{ type: 'donor' | 'institution' }>();
  const isInstitution = type === 'institution';
  const [step, setStep] = useState(1);
  const [media, setMedia] = useState<RequestMediaExtended | null>(null);
  const { mutate: createAccount, isPending: loading } = useCreateAccount({
    onSuccess: ({ name }) => {
      showToast({
        type: 'success',
        header: 'Conta criada',
        description: `Olá  ${name} sua conta foi criada com sucesso!`,
        icon: CircleCheck,
      });
      router.dismissAll();
    },
    onError: (error) => {
      if (
        ReappException.isCode(error, BackendErrorCodes.AVATAR_MUST_BE_IMAGE) ||
        ReappException.isCode(
          error,
          BackendErrorCodes.EMAIL_ALREADY_REGISTERED
        ) ||
        ReappException.isCode(error, BackendErrorCodes.CNPJ_ALREADY_REGISTERED)
      ) {
        showToast({
          type: 'error',
          header: 'Erro ou criar conta',
          description: error.message,
          icon: CircleX,
        });
      } else {
        showToast({
          type: 'error',
          header: 'Erro ou criar conta',
          description:
            'Houve um problema ao criar sua conta! Tente novamente mais tarde.',
          icon: CircleX,
        });
      }
    },
  });

  const schema = isInstitution ? createInstitutionSchema : createAccountSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async ({
    confirmPassword,
    ...data
  }: CreateAccountFormData) => {
    let mediaToSubmit = media;

    if (!mediaToSubmit) {
      const { uri, width, height } = Image.resolveAssetSource(DefaultAvatar);
      mediaToSubmit = {
        uri,
        name: 'default-avatar.png',
        type: 'image/png',
        size: 0,
        width,
        height,
      };
    }

    createAccount({
      accountType:
        type === 'donor' ? AccountType.DONOR : AccountType.INSTITUTION,
      ...data,
      media: mediaToSubmit,
    } as CreateAccountData);
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger([
      'name',
      'email',
      'password',
      'confirmPassword',
    ]);
    if (isValid && isInstitution) {
      setStep(2);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScreenContainer className="flex-grow justify-center">
        <Card className="gap-1.5">
          <CardHeader className="items-center">
            <AvatarPicker onImageSelected={setMedia} />
            <CardTitle variant="h4">
              {isInstitution ? 'Nova Instituição' : 'Nova Conta'}
            </CardTitle>
            <CardDescription>
              {isInstitution
                ? step === 1
                  ? 'Passo 1: Dados de acesso'
                  : 'Passo 2: Dados da instituição'
                : 'Preencha os dados abaixo para criar sua conta'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form form={form} onSubmit={onSubmit} className="gap-y-3">
              {(!isInstitution || (isInstitution && step === 1)) && (
                <>
                  <ControlledInput
                    name="name"
                    label={isInstitution ? 'Nome da Instituição' : 'Nome'}
                    placeholder={
                      isInstitution ? 'Nome da instituição' : 'Seu nome'
                    }
                  />
                  <ControlledInput
                    name="email"
                    label="Email"
                    placeholder="exemplo@email.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <ControlledInput
                    name="password"
                    label="Senha"
                    placeholder="••••••••"
                    secureTextEntry
                  />
                  <ControlledInput
                    name="confirmPassword"
                    label="Confirmar Senha"
                    placeholder="••••••••"
                    secureTextEntry
                  />
                </>
              )}

              {isInstitution && step === 2 && (
                <>
                  <ControlledMaskedInput
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    name="phone"
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    keyboardType="phone-pad"
                  />
                  <ControlledMaskedInput
                    type="cnpj"
                    name="cnpj"
                    label="CNPJ"
                    placeholder="00.000.000/0000-00"
                    keyboardType="number-pad"
                  />
                  <ControlledCategoryInput
                    name="category"
                    label="Categoria"
                    placeholder="Selecione uma categoria"
                  />
                </>
              )}

              <View className="mt-4 gap-y-2">
                {isInstitution && step === 1 ? (
                  <Button size="lg" onPress={handleNextStep}>
                    <Text>Próximo</Text>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onPress={form.handleSubmit(onSubmit)}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text>Cadastrar</Text>
                    )}
                  </Button>
                )}

                {isInstitution && step === 2 && (
                  <Button
                    variant="outline"
                    size="lg"
                    onPress={() => setStep(1)}
                    disabled={loading}
                  >
                    <Text>Voltar</Text>
                  </Button>
                )}

                {!isInstitution && (
                  <Button variant="ghost" onPress={() => router.back()}>
                    <Text>Cancelar</Text>
                  </Button>
                )}
              </View>
            </Form>
          </CardContent>
        </Card>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
}
