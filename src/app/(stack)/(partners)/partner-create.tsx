import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  Alert,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { RequestMedia } from 'src/services/account';
import { postInstitutionMember } from 'src/services/app-core';
import { z } from 'zod';

const partnerCreateFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome do parceiro é obrigatório.' })
    .max(25, 'O nome do parceiro deve ter no máximo 25 caracteres.'),
});

type FormData = z.infer<typeof partnerCreateFormSchema>;

type RequestMediaExtended = RequestMedia & {
  uri: string;
  width?: number;
  height?: number;
};

type FormInputFieldProps = {
  control: any;
  name: keyof FormData;
  label: string;
  placeholder?: string;
  error: any;
  secureTextEntry?: boolean;
  children?: React.ReactNode;
};

const FormInputField: React.FC<FormInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  secureTextEntry,
  children,
}) => {
  return (
    <View className="my-1 w-full">
      <Text className="mb-1 text-sm">{label}</Text>

      <View className="border-1 h-12 w-full flex-row items-center rounded-md border border-text_primary px-2">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              className="flex-1"
            />
          )}
        />
        {children && <View className="ml-1">{children}</View>}
      </View>

      {error[name] && (
        <Text className="text-sm font-bold text-red-400">
          {error[name].message}
        </Text>
      )}
    </View>
  );
};

const PartnerCreateForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(partnerCreateFormSchema),
    defaultValues: {
      name: '',
    },
  });
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<RequestMediaExtended | null>(null);
  const mediaTypes: ImagePicker.MediaType[] = ['images'];

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Precisamos de permissão para acessar a galeria.');
    }
  };

  const pickImage = async () => {
    await requestGalleryPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      aspect: [180, 203],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, fileName, mimeType, fileSize, width, height } =
        result.assets[0];
      setMedia({
        uri,
        name: fileName,
        type: mimeType,
        size: fileSize,
        width,
        height,
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    if (loading) return;
    setLoading(true);

    try {
      let mediaToUpload = media;
      if (!mediaToUpload) {
        const imageUri =
          'https://drive.google.com/uc?id=1HH1UMVe2sSSW4bnNREHJpcVCRGWo589e';

        const { width, height } = await new Promise<{
          width: number;
          height: number;
        }>((resolve, reject) => {
          Image.getSize(
            imageUri,
            (width, height) => resolve({ width, height }),
            (error) => reject(error)
          );
        });

        mediaToUpload = {
          uri: imageUri,
          name: 'default-avatar.png',
          type: 'image/png',
          size: 0,
          width,
          height,
        };
      }
      const createPartnerData: {
        name: string;
        media: RequestMediaExtended;
        memberType: string;
      } = {
        name: data.name,
        media: mediaToUpload,
        memberType: 'PARTNER',
      };

      const res = await postInstitutionMember(createPartnerData, token);
      if (res.error) {
        Alert.alert('Erro no cadastro do parceiro', res.error);
      } else {
        Alert.alert('Parceiro cadastrado com sucesso!');
        router.back();
      }
    } catch (error: any) {
      Alert.alert('Erro no cadastro', error?.message || 'Tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full flex-col items-center p-4">
      {/* Seletor da imagem */}
      <Pressable
        className="relative h-[203] w-[180] rounded-md bg-color_third"
        onPress={pickImage}
      >
        <Image
          source={{
            uri:
              media?.uri ||
              'https://drive.google.com/uc?id=1HH1UMVe2sSSW4bnNREHJpcVCRGWo589e',
          }}
          className="h-full w-full rounded-md"
        />

        <View className="absolute bottom-0 right-1 h-8 w-8 items-center justify-center rounded-full bg-text_primary">
          <Ionicons name="camera" size={18} color="white" />
        </View>
      </Pressable>

      <FormInputField
        control={control}
        name="name"
        label="Nome do Parceiro"
        placeholder="Nome"
        error={errors}
      >
        <Ionicons name="person-sharp" size={16} color="black" />
      </FormInputField>

      {/* Botão de Enviar */}
      <Button
        customStyles="mt-4 w-full justify-center bg-color_primary"
        textColor="text-text_light"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          'Cadastrar Parceiro'
        )}
      </Button>
    </View>
  );
};

const PartnerCreate: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView>
        <PartnerCreateForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PartnerCreate;
