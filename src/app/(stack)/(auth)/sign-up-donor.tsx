import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormInputField } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { RequestMedia } from 'src/types/RequestMedia';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const MIN_NAME_LEN = 3;
const MAX_NAME_LEN = 25;

const MIN_NOTE_LEN = 5;
const MAX_NOTE_LEN = 50;

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 25;

const INVALID_EMAIL_MESSAGE = 'O email deve ser válido.';
const PHONE_REGEX = /^\(\d{2}\)\s*\d{5}-\d{4}$/;

const schema = z.object({
  name: z
    .string()
    .min(MIN_NAME_LEN, `Nome deve ter pelo menos ${MIN_NAME_LEN} caracteres.`)
    .max(MAX_NAME_LEN, `Nome deve ter no máximo ${MAX_NAME_LEN} caracteres.`),
  note: z
    .string()
    .min(MIN_NOTE_LEN, `Nota deve ter pelo menos ${MIN_NOTE_LEN} caracteres.`)
    .max(MAX_NOTE_LEN, `Nota deve ter no máximo ${MAX_NOTE_LEN} caracteres.`)
    .optional()
    .or(z.literal('')),
  email: z.string().email({ message: INVALID_EMAIL_MESSAGE }),
  phone: z
    .string()
    .regex(PHONE_REGEX, 'Telefone inválido (use o formato (00) 00000-0000).'),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LEN,
      `A senha deve ter pelo menos ${MIN_PASSWORD_LEN} caracteres.`
    )
    .max(
      MAX_PASSWORD_LEN,
      `A senha deve ter no máximo ${MAX_PASSWORD_LEN} caracteres.`
    ),
});

// Tipagem do formulário
type FormData = z.infer<typeof schema>;

// Tipagem da mídia (imagem) selecionada
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
              autoCapitalize="none"
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

type MaskInputFieldProps = {
  control: any;
  name: keyof FormData;
  label: string;
  placeholder?: string;
  error: any;
  type: 'cel-phone' | 'cnpj';
  maskOptions?: any;
};

const MaskInputField: React.FC<MaskInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  type,
  maskOptions,
}) => {
  return (
    <View className="my-1 w-full">
      <Text className="mb-1 text-sm">{label}</Text>

      <View className="border-1 h-12 w-full flex-row items-center rounded-md border border-text_primary px-2">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputMask
              type={type}
              options={maskOptions}
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder={placeholder}
              className="flex-1 text-base"
            />
          )}
        />
      </View>

      {error[name] && (
        <Text className="text-sm font-bold text-red-400">
          {error[name].message}
        </Text>
      )}
    </View>
  );
};

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      note: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  // Controle de imagem
  const [media, setMedia] = useState<RequestMediaExtended | null>(null);
  const mediaTypes: MediaType[] = ['images'];

  // Pedir permissão para acessar a galeria
  const requestGalleryPermission = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Precisamos de permissão para acessar a galeria.');
    }
  };

  // Função para abrir a galeria e selecionar a imagem
  const pickImage = async () => {
    await requestGalleryPermission();
    const result = await launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
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
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const signUpData: SignUpData = {
        accountType: 'DONOR',
        name: data.name,
        password: data.password,
        phone: data.phone.replace(/\D/g, ''),
        email: data.email,
        note: data.note || '',
      };

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

      const res = await auth.signUp(signUpData, mediaToUpload);
      if (res.error) {
        Alert.alert('Erro no cadastro do doador', res.error);
      } else {
        Alert.alert('Doador cadastrado com sucesso!');
        router.replace('/sign-in');
      }
    } catch (error: any) {
      Alert.alert('Erro no cadastro', error?.message || 'Tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full flex-col items-center p-4">
      {/* Seletor da imagem de perfil */}
      <Pressable
        className="relative h-20 w-20 rounded-full bg-third"
        onPress={pickImage}
      >
        <Image
          source={
            media?.uri
              ? { uri: media.uri }
              : {
                  uri: 'https://drive.google.com/uc?id=1HH1UMVe2sSSW4bnNREHJpcVCRGWo589e',
                }
          }
          className="h-full w-full rounded-full"
          resizeMode="cover"
        />

        <View className="absolute bottom-0 right-1 h-8 w-8 items-center justify-center rounded-full bg-text_primary">
          <Ionicons name="camera" size={18} color="white" />
        </View>
      </Pressable>

      {/* Nome */}
      <FormInputField
        control={control}
        name="name"
        label="Nome do Doador"
        placeholder="Nome"
        error={errors}
      >
        <Ionicons name="person-sharp" size={16} color="black" />
      </FormInputField>

      {/* Nota */}
      <FormInputField
        control={control}
        name="note"
        label="Nota"
        placeholder="Nota ou breve descrição"
        error={errors}
      >
        <Ionicons name="sparkles" size={16} color="black" />
      </FormInputField>

      {/* Email */}
      <FormInputField
        control={control}
        name="email"
        label="Email"
        placeholder="exemplo@dominio.com"
        error={errors}
      >
        <Ionicons name="mail-sharp" size={16} color="black" />
      </FormInputField>

      {/* Telefone (mascarado) */}
      <MaskInputField
        control={control}
        name="phone"
        label="Telefone"
        placeholder="(00) 00000-0000"
        error={errors}
        type="cel-phone"
        maskOptions={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
      />

      {/* Senha */}
      <FormInputField
        control={control}
        name="password"
        label="Senha"
        placeholder="●●●●●●●●"
        error={errors}
        secureTextEntry
      >
        <Ionicons name="key" size={16} color="black" />
      </FormInputField>

      {/* Botão de Enviar */}
      <Button
        className="w-full mt-4"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white">Cadastrar</Text>
        )}
      </Button>
    </View>
  );
};

const SignUp = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView>
        <SignUpForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
