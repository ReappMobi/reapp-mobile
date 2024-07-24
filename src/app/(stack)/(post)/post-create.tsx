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
import { postPublication } from 'src/services/app-core';
import { z } from 'zod';

export default function PostCreate() {
  const auth = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const postCreateFormSchema = z.object({
    description: z
      .string({ required_error: 'A legenda é obrigatória.' })
      .max(200, 'A legenda deve ter no máximo 200 caracteres.'),
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
    if (!image) {
      setLoading(false);
      Alert.alert('A Foto da postagem é obrigatória!');
      return;
    }

    const dataReq = {
      caption: data.description,
      image,
      token,
      institutionId: auth.user.id,
    };

    const res = await postPublication(dataReq);

    setLoading(false);
    if (res.error) {
      Alert.alert('Erro no cadastro da postagem', res.error);
    } else {
      Alert.alert('Postagem cadastrada com sucesso!');
      router.back();
    }
  };

  const pickImage = async () => {
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
        <View className="items-center justify-center">
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
          <Text className="font-reapp_regular text-base">Legenda</Text>
          <Input
            placeholder="Digite uma legenda para a postagem"
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
          <Button
            customStyles="w-full justify-center bg-color_primary"
            textColor="text-text_light"
            onPress={handleSubmit(onSubmit)}
          >
            Postar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
