import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
/*
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
*/
import {
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Pressable,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { RequestMedia } from 'src/services/account';
import { SignUpData } from 'src/types';
import { z } from 'zod';

// ----------------------
// Configurações do Zod
// ----------------------
const MIN_NAME_LEN = 3;
const MAX_NAME_LEN = 25;

const MIN_NOTE_LEN = 5;
const MAX_NOTE_LEN = 50;

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 25;

const INVALID_EMAIL_MESSAGE = 'O email deve ser válido.';
const PHONE_REGEX = /^\(\d{2}\)\s*\d{5}-\d{4}$/; // (99) 99999-9999

const schema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmPassword'],
  });

// Tipagem do formulário
type FormData = z.infer<typeof schema>;

// Tipagem da mídia (imagem) selecionada
type RequestMediaExtended = RequestMedia & {
  uri: string;
  width?: number;
  height?: number;
};

// -------------------
// Campo de input base
// -------------------
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

// ----------------------------------------------------------------
// Campo específico para tratar input mascarado (Telefone e CNPJ)
// ----------------------------------------------------------------
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

// -----------------------
// Formulário de Cadastro
// -----------------------
const SignUpForm: React.FC = () => {
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
      confirmPassword: '',
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
    if (loading) return;
    setLoading(true);

    try {
      const signUpData: SignUpData = {
        accountType: 'DONOR',
        name: data.name,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone.replace(/\D/g, ''),
        email: data.email,
        note: data.note || '',
      };

      // Cria objeto de mídia padrão se nenhuma imagem for selecionada
      let mediaToUpload = media;
      if (!mediaToUpload) {
        const defaultMediaSource = Image.resolveAssetSource(
          require('src/assets/images/DefaultAvatar.png')
        );
        mediaToUpload = {
          uri: defaultMediaSource.uri,
          name: 'default-avatar.png',
          type: 'image/png',
          size: 0, // Tamanho pode ser ajustado conforme necessidade
          width: defaultMediaSource.width,
          height: defaultMediaSource.height,
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
        className="relative h-20 w-20 rounded-full bg-color_third"
        onPress={pickImage}
      >
        <Image
          source={
            media?.uri
              ? { uri: media.uri }
              : require('src/assets/images/DefaultAvatar.png')
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

      {/* Confirmar Senha */}
      <FormInputField
        control={control}
        name="confirmPassword"
        label="Confirmar Senha"
        placeholder="●●●●●●●●"
        error={errors}
        secureTextEntry
      >
        <Ionicons name="key" size={16} color="black" />
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
          'Cadastrar'
        )}
      </Button>
    </View>
  );
};

// -------------------------
// Página principal do Signup
// -------------------------

const SignUp: React.FC = () => {
  const [googleLoading] = useState<boolean>(false);
  //const auth = useAuth();

  /*
  const clearHistory = useCallback(() => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace('/sign-in');
  }, [auth]);

  */
  const onSubmitGoogle = async () => {
    /*
    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const res = await auth.donnorSignUpGoogle({ idToken: userInfo.idToken });
      if (res.error) {
        Alert.alert('Erro no cadastro de doador', res.error);
      } else {
        Alert.alert('Doador cadastrado com sucesso!');
        clearHistory();
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert('Autenticação cancelada');
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert('Autenticação em andamento');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Autenticação com o Google não disponível no momento');
            break;
          default:
            Alert.alert(
              'Autenticação com o Google falhou. Tente novamente mais tarde'
            );
        }
      } else {
        Alert.alert(
          'Autenticação com o Google falhou. Tente novamente mais tarde'
        );
      }
    }
    finally{
      setGoogleLoading(false);
    }
      */
    Alert.alert('O cadastro com o Google esta indisponível no momento.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView>
        <View className="items-center pt-4">
          <Text className="mb-4 text-center font-reapp_medium text-xl">
            Cadastro de Doador
          </Text>
          <View className="flex-row justify-center gap-2">
            <View className="items-center">
              <Button
                customStyles="w-10/12"
                startIcon={
                  <Ionicons
                    name="logo-google"
                    size={24}
                    color={colors.text_neutral}
                  />
                }
                onPress={onSubmitGoogle}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  'Cadastre-se com Google'
                )}
              </Button>
            </View>
          </View>
          <Text className="mt-4 text-center font-reapp_regular text-xs">
            Ou cadastre-se com seu email
          </Text>
        </View>

        <SignUpForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
