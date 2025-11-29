import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { MediaType } from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { useCamera } from 'src/hooks/useCamera';
import { useGallery } from 'src/hooks/useGallery';
import { useProject } from 'src/hooks/useProject';
import {
  CreateProjectFormData,
  createProjectSchema,
} from 'src/schemas/create-project.schema';

type ModalOptionsProps = {
  selectGallery: () => void;
  selectCamera: () => void;
};

const ModalOptions: React.FC<ModalOptionsProps> = React.memo(
  ({ selectGallery, selectCamera }) => {
    return (
      <View className="h-54 gap-y-4 p-4">
        <Text className="text-lg font-bold">Selecionar Mídia</Text>
        <Pressable onPress={selectGallery}>
          <View className="flex-row items-center gap-x-4">
            <Ionicons name="images-outline" size={24} color="black" />
            <View>
              <Text className="text-md font-medium">Galeria</Text>
              <Text className="text-sm">Selecione uma imagem da galeria</Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={selectCamera}>
          <View className="flex-row items-center gap-x-4">
            <Feather name="camera" size={24} color="black" />
            <View>
              <Text className="text-md font-medium">Câmera</Text>
              <Text className="text-sm">Tire uma foto com a câmera</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
);

// TODO: Migrate the react state context to a global state management library like Zustand or Redux
const Page: React.FC = () => {
  const mediaTypes: MediaType[] = ['images', 'videos'];

  const { token } = useAuth();
  const { takePicture } = useCamera();
  const { pickMedia } = useGallery();
  const { saveProject, loading, category } = useProject();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const modalizeRef = React.useRef<Modalize>(null);
  const onOpenModal = React.useCallback(() => {
    modalizeRef.current?.open();
  }, []);

  const selectGallery = async () => {
    await pickMedia(mediaTypes, (media) => setValue('media', media));
    modalizeRef.current?.close();
  };

  const selectCamera = async () => {
    await takePicture(mediaTypes, (media) => setValue('media', media));
    modalizeRef.current?.close();
  };

  const handleSaveButtonClick = async () => {
    const [result, error] = await saveProject(token, {
      name: watch('name'),
      subtitle: watch('subtitle'),
      description: watch('description'),
      category: watch('category'),
      media: watch('media'),
    });
    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }
    Alert.alert('Sucesso', `Projeto ${result.name} criado com sucesso!`);
    router.dismissTo('/');
  };

  React.useEffect(() => {
    setValue('category', category?.name);
  }, [category]);

  return (
    <View className="flex-1 bg-white px-4 pt-2">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text className="font-bold text-xl">Adicionar projeto</Text>
          <Text className="mt-3 text-xs">* item obrigatório</Text>
        </View>
        <ScrollView className="mt-2 gap-y-4">
          <View className="mt-4">
            <Text className="mb-1 font-medium text-sm">Nome do projeto*</Text>
            <Input
              {...register('name')}
              value={watch('name')}
              onChangeText={(text) => setValue('name', text)}
              autoFocus
              placeholder="Ex.: Projeto Ilumina"
            />
            {errors.name && (
              <Text className="text-sm text-red-500">
                {errors.name.message}
              </Text>
            )}
          </View>
          <View className="mt-4">
            <Text className="mb-1 font-medium text-sm">
              Subtitulo para o projeto*
            </Text>
            <Input
              {...register('subtitle')}
              value={watch('subtitle')}
              onChangeText={(text) => setValue('subtitle', text)}
              placeholder="Ex.: Projeto de ajuda ao meio ambiente."
            />
            {errors.subtitle && (
              <Text className="text-sm text-red-500">
                {errors.subtitle.message}
              </Text>
            )}
          </View>
          <View className="mt-4">
            <Text className="mb-1 font-medium text-sm">Descrição*</Text>
            <Input
              {...register('description')}
              value={watch('description')}
              onChangeText={(text) => setValue('description', text)}
              multiline
              placeholder="Descreva seu projeto aqui"
            />
            {errors.description && (
              <Text className="text-sm text-red-500">
                {errors.description.message}
              </Text>
            )}
          </View>
          <View className="mt-4">
            <Text className="mb-1 font-medium text-sm">Categoria*</Text>
            <Pressable onPress={() => router.push('project/categories')}>
              <Input
                placeholder="Ex.: Meio ambiente"
                editable={false}
                value={watch('category')}
                {...register('category')}
              />
            </Pressable>
            {errors.category && (
              <Text className="text-sm text-red-500">
                {errors.category.message}
              </Text>
            )}
          </View>

          <View className="mt-4">
            <Text className="text-md mb-2 font-semibold">Conteúdo de mída</Text>
            <Button
              startIcon={<AntDesign name="plus" size={24} color="#6b7280" />}
              variant="outlined"
              customStyles="border-1 justify-start gap-x-4 rounded-full border border-gray-400 bg-transparent p-3"
              onPress={onOpenModal}
            >
              <Text className="text-sm text-gray-800">Adicionar mídia</Text>
            </Button>

            {errors.media && (
              <Text className="text-sm text-red-500">
                {errors.media.message}
              </Text>
            )}
          </View>

          {watch('media') && (
            <View className="mt-8">
              <View className="items- relative w-40 items-end px-1">
                <Pressable onPress={() => setValue('media', null)}>
                  <Ionicons name="close-circle" size={26} color="#646464" />
                </Pressable>
                <Image
                  source={{ uri: watch('media') }}
                  style={{ width: 150, height: 150, borderRadius: 2 }}
                />
              </View>
            </View>
          )}
        </ScrollView>

        <Button
          customStyles="my-4 justify-center rounded-xl bg-green-600 p-3 text-white shadow-none"
          onPress={handleSubmit(handleSaveButtonClick)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator className="h-6" color="#fff" />
          ) : (
            <Text className="text-md font-semibold text-white">Salvar</Text>
          )}
        </Button>

        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          children={
            <ModalOptions
              selectGallery={selectGallery}
              selectCamera={selectCamera}
            />
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Page;
