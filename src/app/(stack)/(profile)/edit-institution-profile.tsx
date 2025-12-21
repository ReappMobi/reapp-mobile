import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import {
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { FormInputField } from 'src/components/FormInputField';
import { useAuth } from 'src/hooks/useAuth';
import { useUpdateAccount } from 'src/services/account/service';
import { RequestMedia } from 'src/types/RequestMedia';
import {
  FormData,
  schema,
} from 'src/utils/profile-page/edit-donor-profile-schema';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const EditProfileForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { token, user, saveUserAndToken } = useAuth();
  const { mutateAsync: updateAccount, isPending: loading } = useUpdateAccount();
  const [media, setMedia] = useState<RequestMedia | null>(null);
  const mediaTypes: MediaType[] = ['images'];

  const requestGalleryPermission = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Precisamos de permissão para acessar a galeria.');
    }
  };

  const pickImage = async () => {
    await requestGalleryPermission();
    const result = await launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, fileName, mimeType, fileSize, width, height } =
        result.assets[0];
      setMedia({
        uri,
        name: fileName,
        type: mimeType,
        size: fileSize,
        width,
        height,
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await updateAccount({
        accountId: user.id,
        data: { ...data, media },
      });
      if (response) {
        await saveUserAndToken(response, token);
        Alert.alert('Sucesso!', 'Perfil atualizado com sucesso.');
      }
    } catch (error: any) {
      Alert.alert('Erro ao atualizar perfil', error?.message);
    } finally {
      router.replace('/');
    }
  };

  return (
    <View className="w-full flex-col items-center p-4">
      <Pressable
        className="relative h-20 w-20 rounded-full bg-third"
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

      <FormInputField
        control={control}
        name="name"
        label="Nome"
        placeholder={user.name}
        error={errors}
        Icon={() => <Ionicons name="person-sharp" size={16} color="black" />}
      />

      <FormInputField
        control={control}
        name="note"
        label="Nota"
        placeholder={user.note}
        error={errors}
        Icon={() => <Ionicons name="sparkles" size={16} color="black" />}
      />

      <FormInputField
        control={control}
        name="email"
        label="Email"
        placeholder={user.email}
        error={errors}
        Icon={() => <Ionicons name="mail-sharp" size={16} color="black" />}
      />

      <FormInputField
        control={control}
        name="password"
        label="Senha"
        placeholder="●●●●●●●●"
        error={errors}
        Icon={() => (
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        )}
      />

      <FormInputField
        control={control}
        name="confirmPassword"
        label="Confirmar Senha"
        placeholder="●●●●●●●●"
        error={errors}
        Icon={() => (
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        )}
      />

      <Button
        className="mt-4 w-full"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text>Salvar alterações</Text>
        )}
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