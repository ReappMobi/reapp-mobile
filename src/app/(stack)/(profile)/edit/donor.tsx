import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useMediaPicker } from '@/hooks/useMediaPicker';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { FormInput } from 'src/components/FormInputField';
import { useAuth } from 'src/hooks/useAuth';
import { type RequestMedia, useUpdateAccount } from 'src/services/account';
import {
  type EditDonorProfileData,
  editDonorProfileSchema,
} from 'src/utils/profile-page/edit-donor-profile-schema';

const EditProfileForm = () => {
  const [media, setMedia] = useState<RequestMedia | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editDonorProfileSchema),
  });
  const { mutate: updateProfile, isPending } = useUpdateAccount();
  const { token, user, saveUserAndToken } = useAuth();
  const { pickMedia } = useMediaPicker();

  const pickImage = async () => {
    await pickMedia(['images'], (image) => {
      setMedia({
        uri: image.uri,
        name: image.fileName,
        type: image.type,
        size: image.fileSize,
        width: image.width,
        height: image.height,
      });
    });
  };

  const onSubmit = async (formData: EditDonorProfileData) => {
    if (isPending) {
      return;
    }
    updateProfile(
      {
        accountId: user.id,
        token,
        payload: { ...formData, media },
      },
      {
        onSuccess(data) {
          if (data) {
            saveUserAndToken(data, token);
          }
        },
      }
    );
  };

  return (
    <View className="flex-1w-full flex-col items-center px-4">
      <Pressable
        className="relative h-28 w-28 rounded-full border-2 border-text_primary/30 bg-text_primary/10"
        onPress={pickImage}
      >
        <Image
          source={{ uri: media?.uri || user.media?.remoteUrl }}
          placeholder={{ blurhash: user.media?.blurhash }}
          className="h-full w-full rounded-full"
        />
        <View className="absolute bottom-0 right-1 h-8 w-8 items-center justify-center rounded-full bg-text_primary">
          <Ionicons name="camera" size={18} color="white" />
        </View>
      </Pressable>

      <FormInput
        control={control}
        name="name"
        label="Nome"
        placeholder={user.name}
        error={errors}
      />

      <FormInput
        control={control}
        name="note"
        label="Nota"
        placeholder={user.note}
        error={errors}
      />

      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder={user.email}
        error={errors}
      />

      <FormInput
        control={control}
        name="password"
        label="Senha"
        placeholder="●●●●●●●●"
        error={errors}
      />

      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirmar Senha"
        placeholder="●●●●●●●●"
        error={errors}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        className="mt-4 w-full bg-color_primary active:scale-95 active:bg-color_secundary disabled:bg-color_secundary"
      >
        <Text>Salvar alterações</Text>
      </Button>
    </View>
  );
};

const EditDonorProfile = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <EditProfileForm />
    </KeyboardAvoidingView>
  );
};

export default EditDonorProfile;
