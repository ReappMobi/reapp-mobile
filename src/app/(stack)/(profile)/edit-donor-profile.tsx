import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import {
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import { Button } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { RequestMedia, updateAccount } from 'src/services/account';
import { z } from 'zod';

const MIN_STRING_LEN = 5;
const MAX_NAME_LEN = 25;
const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 25;
const MAX_NOTE_LEN = 50;

const MIN_LENGTH_MESSAGE = `Este campo deve ter pelo menos ${MIN_STRING_LEN} caracteres.`;
const MIN_PASSWORD_MESSAGE = `A senha deve ter pelo menos ${MIN_PASSWORD_LEN} caracteres.`;
const MAX_LENGTH_MESSAGE = `Este campo deve ter no máximo ${MAX_NAME_LEN} caracteres.`;
const MAX_NOTE_LENGTH_MESSAGE = `Este campo deve ter no máximo ${MAX_NOTE_LEN} caracteres.`;
const MAX_PASSWORD_MESSAGE = `A senha deve ter no máximo ${MAX_PASSWORD_LEN} caracteres.`;
const UNMATCHED_PASSWORD_MESSAGE = 'As senhas devem ser iguais.';
const INVALID_EMAIL_MESSAGE = 'O email deve ser válido.';

const schema = z
  .object({
    name: z
      .string()
      .min(MIN_STRING_LEN, { message: MIN_LENGTH_MESSAGE })
      .max(MAX_NAME_LEN, { message: MAX_LENGTH_MESSAGE })
      .optional()
      .or(z.literal('')),
    note: z
      .string()
      .min(MIN_STRING_LEN, { message: MIN_LENGTH_MESSAGE })
      .max(MAX_NOTE_LEN, { message: MAX_NOTE_LENGTH_MESSAGE })
      .optional()
      .or(z.literal('')),
    email: z.string().email({ message: INVALID_EMAIL_MESSAGE }).optional(),
    password: z
      .optional(
        z
          .string()
          .min(MIN_PASSWORD_LEN, { message: MIN_PASSWORD_MESSAGE })
          .max(MAX_PASSWORD_LEN, { message: MAX_PASSWORD_MESSAGE })
      )
      .or(z.literal('')),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: UNMATCHED_PASSWORD_MESSAGE,
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

type FormInputFieldProps = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error: any;
  Icon: React.FC;
};

const FormInputField: React.FC<FormInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  Icon,
}) => {
  return (
    <View className="my-1 w-full">
      <Text className="w-content mb-1 text-sm">{label}</Text>
      <View className="border-1 h-16 w-full flex-row items-center gap-x-1 rounded-md border border-text_primary px-2">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              className="flex-1"
            />
          )}
        />
        <Icon />
      </View>
      {error[name] && (
        <Text className="text-sm font-bold text-red-400">
          {error[name].message}
        </Text>
      )}
    </View>
  );
};

const EditProfileForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { token, user, saveUserAndToken } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [media, setMedia] = React.useState<RequestMedia | null>(null);
  const mediaTypes: MediaType[] = ['images'];

  const requestGalleryPermission = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Precisamos de permissão para acessar a galeria.');
    }
  };

  const pickImage = async () => {
    await requestGalleryPermission();
    const result = await launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: false,
      aspect: [4, 3],
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
      const response = await updateAccount(
        token,
        user.accountType,
        media,
        data
      );
      if (response) {
        await saveUserAndToken(response, token);
        Alert.alert('Sucesso!', 'Perfil atualizado com sucesso.');
      }
    } catch (error) {
      Alert.alert('Erro ao atualizar perfil', error.message);
    } finally {
      router.replace('/');
      setLoading(false);
    }
  };

  return (
    <View className="w-full flex-col items-center p-4">
      <Pressable
        className="relative h-20 w-20 rounded-full bg-color_third"
        onPress={pickImage}
      >
        <Image
          source={{ uri: media?.uri || user.media.remoteUrl }}
          className="h-full w-full rounded-full"
        />
        <View className="absolute bottom-0 right-1 h-8 w-8 items-center justify-center rounded-full bg-text_primary">
          <Ionicons name="camera" size={18} color="white" />
        </View>
      </Pressable>

      <FormInputField
        control={control}
        name="name"
        label="Nome"
        placeholder={user.name}
        error={errors}
        Icon={() => <Ionicons name="person-sharp" size={16} color="black" />}
      />

      <FormInputField
        control={control}
        name="note"
        label="Nota"
        placeholder={user.note}
        error={errors}
        Icon={() => <Ionicons name="sparkles" size={16} color="black" />}
      />

      <FormInputField
        control={control}
        name="email"
        label="Email"
        placeholder={user.email}
        error={errors}
        Icon={() => <Ionicons name="mail-sharp" size={16} color="black" />}
      />

      <FormInputField
        control={control}
        name="password"
        label="Senha"
        placeholder="●●●●●●●●"
        error={errors}
        Icon={() => (
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        )}
      />

      <FormInputField
        control={control}
        name="confirmPassword"
        label="Confirmar Senha"
        placeholder="●●●●●●●●"
        error={errors}
        Icon={() => (
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        )}
      />

      <Button
        customStyles="mt-4 w-full justify-center bg-color_primary"
        textColor="text-text_light"
        onPress={handleSubmit(onSubmit)}
      >
        Salvar alterações
      </Button>
    </View>
  );
};

const EditDonorProfile = () => {
  // TODO: Fix when typing, the keyboard is covering the input field
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className=" items-center pt-4">
        <Text className=" text-xl font-bold">Editar Perfil</Text>
      </View>
      <EditProfileForm />
    </KeyboardAvoidingView>
  );
};

export default EditDonorProfile;
