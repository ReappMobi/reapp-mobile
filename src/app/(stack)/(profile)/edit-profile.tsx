import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ControlledInput } from '@/components/app/form/controlled-input';
import { Form } from '@/components/app/form/form';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
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
      email: user?.email || '',
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateAccount({
    onSuccess: async (data) => {
      if (data && token) {
        await saveUserAndToken(data as any, token);
        Alert.alert('Sucesso!', 'Perfil atualizado com sucesso.');
        router.back();
      }
    },
    onError: (error) => {
      Alert.alert('Erro ao atualizar perfil', error.message);
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
      style={{ flex: 1 }}
      contentContainerClassName="flex-1 bg-red-400"
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
            inputClassName="h-24 py-2"
          />

          <ControlledInput
            name="email"
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
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
            className="mt-6 h-12"
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
