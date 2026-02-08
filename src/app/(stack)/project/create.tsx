import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { MediaType } from 'expo-image-picker';
import { router } from 'expo-router';
import {
  Camera,
  CircleAlert,
  CircleCheck,
  CircleX,
  Image as ImageIcon,
  Plus,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { ScreenContainer } from '@/components';
import { ControlledInput, Form } from '@/components/app/form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { useCamera } from '@/hooks/useCamera';
import { useGallery } from '@/hooks/useGallery';
import { useProject } from '@/hooks/useProject';
import { THEME } from '@/lib/theme';
import { showToast } from '@/lib/toast-config';
import {
  CreateProjectFormData,
  createProjectSchema,
} from '@/schemas/create-project.schema';
import {
  GET_PROJECTS_BY_INSTITUTION_ID_KEY,
  GET_PROJECTS_KEY,
  useCreateProject,
} from '@/services/project/project.service';
import { CreateProjectData } from '@/services/project/project.types';

export default function Page() {
  const mediaTypes: MediaType[] = ['images'];
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { takePicture } = useCamera();
  const { pickMedia } = useGallery();
  const { category, setCurrentCategory } = useProject();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      subtitle: '',
      description: '',
      category: '',
      media: undefined,
    },
  });

  const { mutate: createProject, isPending } = useCreateProject({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECTS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PROJECTS_BY_INSTITUTION_ID_KEY, user?.institution?.id],
      });

      showToast({
        type: 'success',
        header: 'Projeto criado',
        description: 'Seu projeto foi criado com sucesso.',
        icon: CircleCheck,
      });

      setCurrentCategory(null);
      router.back();
    },
    onError: (error) => {
      showToast({
        type: 'error',
        header: 'Erro ao criar projeto',
        description:
          error.message || 'Não foi possível criar o seu projeto agora.',
        icon: CircleAlert,
      });
    },
  });

  useEffect(() => {
    if (category) {
      form.setValue('category', category.name);
    }
  }, [category, form]);

  const selectGallery = async () => {
    await pickMedia(mediaTypes, (media) => form.setValue('media', media));
    setIsDialogOpen(false);
  };

  const selectCamera = async () => {
    await takePicture(mediaTypes, (media) => form.setValue('media', media));
    setIsDialogOpen(false);
  };

  const handleSaveButtonClick = (data: CreateProjectData) => {
    createProject(data);
  };

  const media = form.watch('media');

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View>
          <Text className="font-bold text-xl">Adicionar projeto</Text>
          <Text className="mt-3 text-xs text-muted-foreground">
            * item obrigatório
          </Text>
        </View>

        <Form form={form} onSubmit={handleSaveButtonClick} className="flex-1">
          <ScrollView
            className="mt-2"
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="gap-y-4">
              <ControlledInput
                name="name"
                label="Nome do projeto*"
                placeholder="Ex.: Projeto Ilumina"
                autoFocus
              />

              <ControlledInput
                name="subtitle"
                label="Subtitulo para o projeto*"
                placeholder="Ex.: Projeto de ajuda ao meio ambiente."
              />

              <ControlledInput
                name="description"
                label="Descrição*"
                placeholder="Descreva seu projeto aqui"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                inputClassName="h-32 pt-3"
              />

              <Pressable onPress={() => router.push('project/categories')}>
                <View pointerEvents="none">
                  <ControlledInput
                    name="category"
                    label="Categoria*"
                    placeholder="Ex.: Meio ambiente"
                    editable={false}
                  />
                </View>
              </Pressable>

              <View>
                <Text className="text-sm font-bold text-muted-foreground mb-2">
                  Conteúdo de mída*
                </Text>
                <Button
                  variant="outline"
                  size="lg"
                  className="justify-start border-dashed"
                  onPress={() => setIsDialogOpen(true)}
                >
                  <Icon as={Plus} size={24} className="text-gray-500" />
                  <Text className="text-sm text-gray-800 ml-2">
                    Adicionar mídia
                  </Text>
                </Button>

                {form.formState.errors.media && (
                  <Text className="text-sm text-red-500 mt-1">
                    {form.formState.errors.media.message}
                  </Text>
                )}
              </View>

              {media && (
                <View className="mt-4">
                  <View className="relative w-40">
                    <Pressable
                      onPress={() => form.setValue('media', '')}
                      className="absolute -top-3 -right-3 z-10"
                    >
                      <Icon as={CircleX} size={26} className="text-gray-500" />
                    </Pressable>
                    <Image
                      source={{ uri: media }}
                      style={{ width: 150, height: 150, borderRadius: 8 }}
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          <Button
            onPress={form.handleSubmit(handleSaveButtonClick)}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator
                size="small"
                color={THEME.light.primaryForeground}
              />
            ) : (
              <Text className="text-md font-semibold text-white">Salvar</Text>
            )}
          </Button>
        </Form>
      </KeyboardAwareScrollView>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escolher mídia</DialogTitle>
          </DialogHeader>
          <View className="gap-y-4">
            <Button
              size="lg"
              variant="outline"
              className="flex-row justify-start gap-x-3"
              onPress={selectCamera}
            >
              <Icon as={Camera} className="text-foreground/90 h-5 w-5" />
              <Text>Tirar foto ou vídeo</Text>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-row justify-start gap-x-3"
              onPress={selectGallery}
            >
              <Icon as={ImageIcon} className="text-foreground/90 h-5 w-5" />
              <Text>Escolher da galeria</Text>
            </Button>
          </View>
        </DialogContent>
      </Dialog>
    </ScreenContainer>
  );
}
