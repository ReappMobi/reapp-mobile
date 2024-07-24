import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Pressable, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { editDonorInformation } from 'src/services/user';
import { z } from 'zod';

const editInformationDonorFormSchema = z.object({
  name: z
    .string()
    .max(25, 'O nome deve ter no máximo 25 caracteres')
    .optional(),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'O telefone não está no formato correto')
    .optional(),
});

type editInformationFormData = z.infer<typeof editInformationDonorFormSchema>;

export default function EditInformationDonor() {
  const auth = useAuth();
  const phoneRef = useRef(null);
  const [image, setImage] = useState(auth.user.avatar);
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<editInformationFormData>({
    resolver: zodResolver(editInformationDonorFormSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const unmaskPhone = phoneRef?.current.getRawValue();
    const token = await auth.getToken();
    if (
      image === auth.user.avatar &&
      (!data.name || data.name === auth.user.name) &&
      (!unmaskPhone || unmaskPhone === auth.user.phone)
    ) {
      setLoading(false);
      Alert.alert('Você não fez nenhuma alteração nas informações.');
      return;
    }
    const dataReq = {
      name: data.name,
      image,
      phone: unmaskPhone,
      token,
      donorId: auth.user.id,
    };

    const res = await editDonorInformation(dataReq);
    setLoading(false);
    if (res.error) {
      Alert.alert('Erro na edição de perfil', res.error);
    } else {
      auth.user = res;
      Alert.alert('Edição efetuada com sucesso!');
      router.back();
    }
  };

  const handleCancel = () => {
    Alert.alert('Edição cancelada com sucesso.');
    router.back();
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

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View className="mt-3 gap-3 px-4">
      <Spinner
        visible={loading}
        textContent="Carregando..."
        textStyle={{ color: '#FFF', fontFamily: 'reapp_regular' }}
      />

      <View className="items-center justify-center">
        <Image
          className="mb-3 h-20 w-20 rounded-full"
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
          source={{ uri: image }}
        />
        <Pressable onPress={pickImage}>
          <Text className="font-reapp_medium text-base text-text_primary">
            Editar foto de perfil
          </Text>
        </Pressable>
      </View>

      <View>
        <Text className="font-reapp_regular text-base">Nome</Text>
        <Input
          placeholder={auth.user.name}
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
        <Text className="font-reapp_regular text-base">Telefone</Text>
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          onChangeText={(text) =>
            setValue('phone', text, { shouldValidate: true })
          }
          value={watch('phone')}
          {...register('phone')}
          placeholder={auth.user.phone}
          ref={phoneRef}
          className="border-1 min-h-14 w-full rounded border border-text_secondary 
                  bg-input_background px-2 py-4 font-reapp_regular 
                  text-base text-text_gray"
        />

        {errors.phone && (
          <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
            {errors.phone.message}
          </Text>
        )}
      </View>

      <View>
        <Button
          customStyles="w-full justify-center bg-color_primary"
          textColor="text-text_light"
          onPress={handleSubmit(onSubmit)}
        >
          Editar
        </Button>
        <Button
          customStyles="mt-4 w-full justify-center bg-color_redsh"
          textColor="text-text_light"
          onPress={handleCancel}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
}
