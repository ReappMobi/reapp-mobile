import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, ScrollView, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  useCreateProject,
  useGetProjectCategories,
} from 'src/services/projects/service';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function ProjectCreate() {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('1'); // Default to 1 or logic to pick first

  const { data: categories = [] } = useGetProjectCategories();
  const { mutateAsync: createProject, isPending: loading } = useCreateProject();

  const projectCreateFormSchema = z.object({
    name: z
      .string({ required_error: 'O nome do projeto é obrigatório' })
      .max(25, 'O nome deve ter no máximo 25 caracteres'),
    subtitle: z
      .string({ required_error: 'O subtítlo do projeto é obrigatório' })
      .max(50, 'O subtítulo deve ter no máximo 50 caracteres'),
    description: z
      .string({ required_error: 'A legenda é obrigatória.' })
      .max(200, 'O legenda deve ter no máximo 200 caracteres.'),
  });

  type projectCreateFormData = z.infer<typeof projectCreateFormSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<projectCreateFormData>({
    resolver: zodResolver(projectCreateFormSchema),
  });

  const onSubmit = async (data: any) => {
    if (!image) {
      Alert.alert('A foto de capa para o projeto é obrigatória!');
      return;
    }
    try {
      await createProject({
        name: data.name,
        subtitle: data.subtitle,
        description: data.description,
        categoryId: selectedCategory,
        media: image,
        institutionId: user.id,
      });

      Alert.alert('Projeto cadastrado com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro no cadastro do projeto', error?.message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 px-4">
        <Spinner
          visible={loading}
          textContent="Carregando..."
          textStyle={{ color: '#FFF' }}
        />
        <View className="gap-3">
          <View>
            <Text className="text-md font-regular">Nome do Projeto</Text>

            <Input
              placeholder="Nome do projeto"
              inputMode="text"
              {...register('name')}
              onChangeText={(text) =>
                setValue('name', text, { shouldValidate: true })
              }
              value={watch('name')}
              {...register('name')}
            />
            {errors.name && (
              <Text className="my-1 font-regular text-xs text-color_redsh">
                {errors.name.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-regular">Subtítulo do projeto</Text>

            <Input
              placeholder="Subtítulo do projeto"
              inputMode="text"
              {...register('subtitle')}
              onChangeText={(text) =>
                setValue('subtitle', text, { shouldValidate: true })
              }
              value={watch('subtitle')}
              {...register('subtitle')}
            />
            {errors.subtitle && (
              <Text className="my-1 font-regular text-xs text-color_redsh">
                {errors.subtitle.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="font-regular text-base">A ideia</Text>
            <Input
              placeholder="Digite uma descrição sobre a ideia do projeto"
              inputMode="text"
              onChangeText={(text) =>
                setValue('description', text, { shouldValidate: true })
              }
              customStyle="h-32"
              value={watch('description')}
              {...register('description')}
              multiline
              numberOfLines={5}
            />
            {errors.description && (
              <Text className="my-1 font-regular text-xs text-color_redsh">
                {errors.description.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-regular">
              Selecione uma categoria: *
            </Text>
            <View className="border-1 border border-text_secondary">
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {categories.map((category: any, index: number) => (
                  <Picker.Item
                    key={index}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View className="">
            <Text className="font-regular text-base">Imagem de capa</Text>
            <Button variant="link" className="w-full" onPress={pickImage}>
              <Text>Selecionar Imagem de capa</Text>
            </Button>
          </View>
          {image && (
            <View className="mt-4 items-center">
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
              />
            </View>
          )}

          {/* Opção para inserir vídeo */}
          <View>
            <Button className="w-full" onPress={handleSubmit(onSubmit)}>
              <Text>Cadastrar Projeto</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
