import { useMediaPicker } from '@/hooks/useMediaPicker';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { Button } from 'src/components';
import { FormInput } from 'src/components/FormInputField';
import { useAuth } from 'src/hooks/useAuth';
import { type RequestMedia, useUpdateAccount } from 'src/services/account';
import {
  type EditDonorProfileData,
  editDonorProfileSchema,
} from 'src/utils/profile-page/edit-donor-profile-schema';

const EditProfileForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editDonorProfileSchema),
  });
  const { token, user, saveUserAndToken } = useAuth();
  const [media, setMedia] = useState<RequestMedia | null>(null);
  const { pickMedia } = useMediaPicker();

  const { mutateAsync: updateAccount, isPending: loading } = useUpdateAccount({
    onSuccess: async (response) => {
      await saveUserAndToken(response, token);
      Alert.alert('Sucesso!', 'Perfil atualizado com sucesso.');
    },
    onError: (error) => {
      Alert.alert('Erro ao atualizar perfil', error.message);
    },
  });

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

  const onSubmit = async (data: EditDonorProfileData) => {
    if (loading) {
      return;
    }

    await updateAccount({
      accountId: user.id,
      token,
      payload: {
        ...data,
        media,
      },
    });
  };

  return (
    <View className="w-full flex-col items-center p-4">
      <Pressable
        className="relative h-20 w-20 rounded-full bg-color_third"
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
        customStyles="mt-4 w-full justify-center bg-color_primary"
        textColor="text-text_light"
        onPress={handleSubmit(onSubmit)}
      >
        Salvar alterações
      </Button>
    </View>
  );
};

const Page: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <EditProfileForm />
    </KeyboardAvoidingView>
  );
};

export default Page;
