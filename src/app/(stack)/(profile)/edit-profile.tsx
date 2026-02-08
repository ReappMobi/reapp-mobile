import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { CircleCheck, CircleX } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ControlledInput } from '@/components/app/form/controlled-input';
import { Form } from '@/components/app/form/form';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { THEME } from '@/lib/theme';
import { showToast } from '@/lib/toast-config';
import {
  type EditProfileFormData,
  editProfileSchema,
} from '@/schemas/auth/edit-profile.schema';
import { useUpdateAccount } from '@/services/account/account.service';
import type { RequestMedia } from '@/services/account/account.types';

export default function EditProfileScreen() {
  const { user, token, saveUserAndToken } = useAuth();
  const [media, setMedia] = useState<RequestMedia | null>(null);

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || '',
      note: user?.note || '',
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateAccount({
    onSuccess: async (data) => {
      if (data && token) {
        await saveUserAndToken(data as any, token);
        showToast({
          type: 'success',
          header: 'Sucesso!',
          description: 'Perfil atualizado com sucesso.',
          icon: CircleCheck,
        });
        router.back();
      }
    },
    onError: (error) => {
      showToast({
        type: 'error',
        header: 'Erro ao atualizar perfil',
        description: error.message,
        icon: CircleX,
      });
    },
  });

  const onSubmit = (data: EditProfileFormData) => {
    if (!user?.id) {
      return;
    }

    updateProfile({
      id: user.id,
      ...data,
      media,
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: THEME.light.background }}
      contentContainerClassName="flex-1"
    >
      <ScrollView contentContainerClassName="p-6">
        <View className="items-center mb-8">
          <AvatarPicker
            initialImage={user?.media?.remoteUrl}
            onImageSelected={setMedia}
          />
        </View>

        <Form form={form} onSubmit={onSubmit} className="gap-4">
          <ControlledInput name="name" label="Nome" placeholder="Seu nome" />

          <ControlledInput
            name="note"
            label="Nota/Biografia"
            placeholder="Conte um pouco sobre você"
            multiline
            numberOfLines={3}
            inputClassName="py-2"
          />

          <View className="mt-4 gap-4">
            <Text className="text-lg font-bold">Alterar senha</Text>

            <ControlledInput
              name="password"
              label="Nova senha"
              placeholder="●●●●●●"
              secureTextEntry
            />

            <ControlledInput
              name="confirmPassword"
              label="Confirmar nova senha"
              placeholder="●●●●●●"
              secureTextEntry
            />
          </View>

          <Button
            size="lg"
            onPress={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            <Text className="text-primary-foreground font-bold">
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </Text>
          </Button>
        </Form>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
