import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'src/components';
import { z } from 'zod';

export default function ProjectCreate() {
  const projectCreateFormSchema = z.object({
    name: z
      .string({ required_error: 'O nome do projeto é obrigatório' })
      .max(25, 'O nome deve ter no máximo 25 caracteres'),
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
    // const dataReq = {
    //   name: data.name,
    //   description: data.description,
    // };
    const res = null;
    //chamar função para registro do projeto
    if (res.error) {
      Alert.alert('Erro no cadastro do projeto', res.error);
    } else {
      Alert.alert('Projeto cadastrado com sucesso!');
      router.back();
    }
  };

  const [, setImage] = useState(null);

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
    <SafeAreaView className="flex-1 px-4">
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
          <Text className="font-reapp_regular text-base">Descrição</Text>
          <Input
            placeholder="Digite uma descrição para o seu projeto"
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

        {/* Opção para inserir vídeo */}
        <View>
          <Button
            customStyles="w-full justify-center bg-color_primary"
            textColor="text-text_light"
            onPress={handleSubmit(onSubmit)}
          >
            Cadastrar Projeto
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
