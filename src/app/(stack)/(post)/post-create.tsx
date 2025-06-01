import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Camera } from 'expo-camera';
import {
  MediaType,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { postPublication } from 'src/services/app-core';
import { POSTS_PREFIX_KEY } from 'src/services/posts/post.service';
import { z } from 'zod';

export default function PostCreate() {
  const auth = useAuth();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaTypes: MediaType[] = ['images'];
  const queryClient = useQueryClient();


  const postCreateFormSchema = z.object({
    description: z
      .string({ required_error: 'O conteúdo da postagem é obrigatório.' })
      .max(200, 'O conteúdo da postagem deve ter no máximo 200 caracteres.'),
  });

  type postCreateFormData = z.infer<typeof postCreateFormSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<postCreateFormData>({
    resolver: zodResolver(postCreateFormSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const token = await auth.getToken();

    const dataReq = {
      content: data.description,
      media,
      token,
    };

    const res = await postPublication(dataReq);
 
    queryClient.invalidateQueries({queryKey: [POSTS_PREFIX_KEY]});
    setLoading(false);
    if (res.error) {
      Alert.alert('Erro no cadastro da postagem', res.error);
    } else {
      router.replace('/');
    }
  };

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
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Precisamos de permissão para acessar a câmera.');
    }
  };

  const takePicture = async () => {
    await requestCameraPermission();
    const result = await launchCameraAsync({
      mediaTypes,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  return loading ? (
    <Spinner visible={loading} />
  ) : (
    <SafeAreaView className="h-screen flex-1 py-4">
      <View
        className="mb-2 flex h-12  flex-row items-center px-3"
        style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}
      >
        <Pressable onPress={() => router.dismiss()}>
          <MaterialIcons name="close" size={28} color="#646464" />
        </Pressable>

        <Text className="mt-1 flex-1 pr-5 text-center font-reapp_medium text-lg text-slate-700">
          Nova Postagem
        </Text>
      </View>
      <View className="flex-1">
        {errors.description && (
          <Text className="my-1 px-2 font-reapp_regular text-xs text-color_redsh">
            {errors.description.message}
          </Text>
        )}
        <TextInput
          placeholder="Este é um rascunho da sua postagem..."
          inputMode="text"
          onChangeText={(text) =>
            setValue('description', text, { shouldValidate: true })
          }
          value={watch('description')}
          {...register('description')}
          multiline
          numberOfLines={5}
          textAlign="left"
          textAlignVertical="top"
          style={{ color: '' }}
          className="flex-1 px-4 text-base text-[#e2e2e2]"
        />

        {media && (
          <View className="my-4 px-4">
            <View className="items-relative w-64 items-end px-1">
              <Pressable onPress={() => setMedia(null)}>
                <Ionicons name="close-circle" size={26} color="#646464" />
              </Pressable>
              <Image
                source={{ uri: media }}
                style={{ width: 250, height: 150, borderRadius: 2 }}
              />
            </View>
          </View>
        )}
      </View>
      <View
        className="flex-row items-center justify-between px-4 pt-2"
        style={{ borderTopColor: '#a8a8a8', borderTopWidth: 1 }}
      >
        <View className="w-20 flex-row items-start gap-x-4">
          <Pressable onPress={takePicture}>
            <Ionicons name="camera" size={26} color="#646464" />
          </Pressable>
          <Pressable onPress={pickImage}>
            <Ionicons name="image" size={26} color="#646464" />
          </Pressable>
        </View>
        <Button
          onPress={handleSubmit(onSubmit)}
          size="small"
          variant="contained"
          textColor="text-text_light"
          customStyles="shadow-full w-24 items-center justify-center rounded-full bg-color_primary"
        >
          Postar
        </Button>
      </View>
    </SafeAreaView>
  );
}
