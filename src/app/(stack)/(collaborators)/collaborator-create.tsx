import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Alert, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { postCollaborator } from 'src/services/app-core';
import { z } from 'zod';

export default function CollaboratorCreate() {
  const auth = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const collaboratorCreateFormSchema = z.object({
    name: z
      .string({ required_error: 'O nome do colaborador é obrigatório.' })
      .max(25, 'O nome do colaborador deve ter no máximo 200 caracteres.'),
  });

  type collaboratorCreateFormData = z.infer<
    typeof collaboratorCreateFormSchema
  >;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<collaboratorCreateFormData>({
    resolver: zodResolver(collaboratorCreateFormSchema),
  });

  const onSubmit = async (data: any) => {
    const dataReq = {
      name: data.name,
      image,
      institutionId: auth.user.id,
    };

    const token = await auth.getToken();
    const res = await postCollaborator(dataReq, token);
    setLoading(false);
    if (res.error) {
      Alert.alert('Erro no cadastro da colaborador', res.error);
    } else {
      Alert.alert('Colaborador cadastrado com sucesso!');
      router.back();
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
    <SafeAreaView className="flex-1 px-4">
      <Spinner
        visible={loading}
        textContent="Carregando..."
        textStyle={{ color: '#FFF' }}
      />
      <View className="gap-3">
        <View>
          <Text className="font-reapp_regular text-base">
            Foto do colaborador
          </Text>
          <Button
            customStyles="w-full justify-center "
            textColor="text-color_blue"
            onPress={pickImage}
          >
            Selecionar Foto
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

        <View>
          <Text className="font-reapp_regular text-base">
            Nome do colaborador
          </Text>
          <Input
            placeholder="Digite o nome do colaborador"
            inputMode="text"
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
          <Button
            customStyles="w-full justify-center bg-color_primary"
            textColor="text-text_light"
            onPress={handleSubmit(onSubmit)}
          >
            Cadastrar Colaborador
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
