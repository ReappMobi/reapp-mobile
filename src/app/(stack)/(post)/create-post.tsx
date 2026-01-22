import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQueryClient } from '@tanstack/react-query';
import { Camera } from 'expo-camera';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import { CameraIcon, Images } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'src/hooks/useAuth';
import { postPublication } from 'src/services/app-core';
import { POSTS_PREFIX_KEY } from 'src/services/posts/post.service';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

const postCreateFormSchema = z.object({
  description: z
    .string({ required_error: 'O conteúdo da postagem é obrigatório.' })
    .max(200, 'O conteúdo da postagem deve ter no máximo 200 caracteres.'),
});

type postCreateFormData = z.infer<typeof postCreateFormSchema>;

export default function PostCreate() {
  const auth = useAuth();
  const [media, setMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const mediaTypes: MediaType[] = ['images'];
  const queryClient = useQueryClient();
  const headerHeight = useHeaderHeight();

  const androidHeaderHeight = useRef(headerHeight);

  const userAvatarUrl = auth.user.media?.remoteUrl;
  const username = auth.user.name;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<postCreateFormData>({
    resolver: zodResolver(postCreateFormSchema),
    mode: 'onChange',
  });

  const descriptionValue = watch('description');
  const isPostEmpty = !descriptionValue && !media;

  const onSubmit = async (data: postCreateFormData) => {
    setLoading(true);
    const token = await auth.getToken();

    const dataReq = {
      content: data.description,
      media,
      token,
    };

    const res = await postPublication(dataReq);

    queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
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
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? headerHeight : androidHeaderHeight.current
        }
        style={{ flex: 1 }}
      >
        <ScrollView className="px-4 pt-2">
          <View className="flex-row">
            <View className="items-center mr-3">
              <Image
                source={{ uri: userAvatarUrl }}
                className="h-10 w-10 rounded-full bg-gray-200"
              />
              <View className="w-[2px] flex-1 bg-gray-200 my-2 rounded-full" />
              <View className="h-4 w-4 rounded-full bg-gray-200 opacity-50" />
            </View>

            <View className="flex-1 pb-20">
              <Text className="font-semibold text-base text-black mb-1">
                {username}
              </Text>

              <TextInput
                placeholder="Compartilhe com a rede suas ações..."
                placeholderTextColor="#999"
                multiline
                autoFocus
                textAlignVertical="top"
                className="text-base text-black mb-2 min-h-[40px]"
                onChangeText={(text) =>
                  setValue('description', text, { shouldValidate: true })
                }
                value={watch('description')}
                {...register('description')}
              />

              {errors.description && (
                <Text className="mb-2 text-xs text-rose-500">
                  {errors.description.message}
                </Text>
              )}

              {media && (
                <View className="mb-4 relative">
                  <Image
                    source={{ uri: media }}
                    className="w-full h-64 rounded-xl bg-gray-100"
                    resizeMode="cover"
                  />
                  <Pressable
                    onPress={() => setMedia(null)}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center justify-between px-4 py-3 bg-white">
          <View className="flex-row gap-4 mt-2">
            <Pressable onPress={pickImage}>
              <Icon as={Images} size={22} className="stroke-text-neutral" />
            </Pressable>
            <Pressable onPress={takePicture}>
              <Icon as={CameraIcon} size={24} className="stroke-text-neutral" />
            </Pressable>
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isPostEmpty}
            className="rounded-full px-5 py-2"
          >
            <Text className="font-semibold">Postar</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
}
