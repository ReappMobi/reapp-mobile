import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from 'src/hooks/useAuth';
import { RequestMedia } from 'src/services/account';
import { postInstitutionMember } from 'src/services/app-core';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const volunteerCreateFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome do voluntário é obrigatório.' })
    .max(25, 'O nome do voluntário deve ter no máximo 25 caracteres.'),
});

type FormData = z.infer<typeof volunteerCreateFormSchema>;

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

const VolunteerCreateForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerCreateFormSchema),
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
      aspect: [128, 128],
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
    if (loading) {
      return;
    }
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
      const createVolunteerData = {
        name: data.name,
        media: mediaToUpload,
        memberType: 'VOLUNTEER',
      };

      const res = await postInstitutionMember(createVolunteerData, token);

      if (res.error) {
        Alert.alert('Erro no cadastro do voluntário', res.error);
      } else {
        Alert.alert('Voluntário cadastrado com sucesso!');
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
        className="relative h-[128] w-[128] rounded-full bg-third"
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
        label="Nome do Voluntário"
        placeholder="Digite o nome"
        error={errors}
      >
        <Ionicons name="person-sharp" size={16} color="black" />
      </FormInputField>

      {/* Botão de Enviar */}
      <Button
        className="mt-4 w-full"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text>Cadastrar Voluntário</Text>
        )}
      </Button>
    </View>
  );
};

const VolunteerCreate: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView>
        <VolunteerCreateForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VolunteerCreate;
