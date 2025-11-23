import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { getProjectCategories, postProject } from 'src/services/app-core';
import { z } from 'zod';

export default function ProjectCreate() {
  const auth = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('react');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await auth.getToken();
        const res = await getProjectCategories({ token });
        if (res.error) {
          Alert.alert('Erro na aplicação. Tente novamente mais tarde!');
          router.back();
        }
        setCategories(res);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro na aplicação. Tente novamente mais tarde!');
        router.back();
      }
    };

    fetchCategories();
  }, []);

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
    setLoading(true);
    const token = await auth.getToken();
    if (!image) {
      setLoading(false);
      Alert.alert('A foto de capa para o projeto é obrigatória!');
      return;
    }
    const dataReq = {
      name: data.name,
      subtitle: data.subtitle,
      description: data.description,
      categoryId: selectedCategory,
      image,
      token,
      institutionId: auth.user.id,
    };
    const res = await postProject(dataReq);
    if (res.error) {
      Alert.alert('Erro no cadastro do projeto', res.error);
    } else {
      Alert.alert('Projeto cadastrado com sucesso!');
      router.back();
    }
    setLoading(false);
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
            <Text className="text-md font-reapp_regular">Nome do Projeto</Text>

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
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.name.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              Subtítulo do projeto
            </Text>

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
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.subtitle.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="font-reapp_regular text-base">A ideia</Text>
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
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.description.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              Selecione uma categoria: *
            </Text>
            <View className="border-1 border border-text_secondary">
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {categories.map((category, index) => (
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
            <Text className="font-reapp_regular text-base">Imagem de capa</Text>
            <Button
              customStyles="w-full justify-center "
              textColor="text-color_blue"
              onPress={pickImage}
            >
              Selecionar Imagem de capa
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
            <Button
              customStyles="w-full justify-center bg-primary"
              textColor="text-text_light"
              onPress={handleSubmit(onSubmit)}
            >
              Cadastrar Projeto
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
