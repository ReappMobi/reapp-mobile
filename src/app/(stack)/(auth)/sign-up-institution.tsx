import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from 'src/components/ui/button';
import { Text } from 'src/components/ui/text';
import { useAuth } from 'src/hooks/useAuth';
import { getInstitutionCategories } from 'src/services/account/requests';
import { SignUpData } from 'src/types';
import { RequestMedia } from 'src/types/RequestMedia';
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
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; // 00.000.000/0000-00

/**
 * Definição do schema Zod
 * - name, note, email, phone, cnpj, password, confirmPassword, category
 * - Refinamos para validar se password === confirmPassword
 */
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
    cnpj: z
      .string()
      .regex(CNPJ_REGEX, 'CNPJ inválido (use o formato 00.000.000/0000-00).'),
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
    category: z.string().min(1, 'A categoria é obrigatória.'),
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

// --------------------------------------------
// Campo de Categoria com Autocomplete
// --------------------------------------------
type CategoryFieldProps = {
  control: any;
  name: keyof FormData;
  label: string;
  error: any;
  categories: any[];
};

const CategoryField: React.FC<CategoryFieldProps> = ({
  control,
  name,
  label,
  error,
  categories,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <View className="my-1 w-full">
      <Text className="mb-1 text-sm">{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="border-1 h-12 w-full flex-row items-center rounded-md border border-text_primary px-2">
              <TextInput
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setInputValue(text);
                  setShowSuggestions(text.length > 0);
                }}
                value={value}
                placeholder="Digite ou selecione uma categoria"
                className="flex-1"
              />
              <Ionicons name="pricetag" size={16} color="black" />
            </View>

            {/* Lista de sugestões */}
            {showSuggestions && filteredCategories.length > 0 && (
              <View className="mt-1 max-h-48 rounded border border-gray-300 bg-white">
                {filteredCategories.slice(0, 5).map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderBottomWidth: 1,
                      borderColor: '#DDD',
                    }}
                    onPress={() => {
                      onChange(cat.name);
                      setInputValue(cat.name);
                      setShowSuggestions(false);
                    }}
                  >
                    <Text>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      />

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
      cnpj: '',
      password: '',
      confirmPassword: '',
      category: '',
    },
  });

  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Controle de imagem
  const [media, setMedia] = useState<RequestMediaExtended | null>(null);
  const mediaTypes: MediaType[] = ['images'];

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getInstitutionCategories();
      if (res?.error) {
        Alert.alert('Erro na aplicação. Tente novamente mais tarde');
        router.back();
        return;
      }
      setCategories(res || []);
    };
    fetchCategories();
  }, []);

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
      // Monta o objeto de cadastro
      const signUpData: SignUpData = {
        accountType: 'INSTITUTION',
        name: data.name,
        password: data.password,
        phone: data.phone.replace(/\D/g, ''), // remove máscaras
        email: data.email,
        cnpj: data.cnpj.replace(/\D/g, ''), // remove máscaras
        category: data.category,
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
        Alert.alert('Erro no cadastro da instituição', res.error);
      } else {
        Alert.alert(
          'Solicitação de cadastro efetuada!',
          'Sua solicitação foi enviada com sucesso e será analisada em até 5 dias úteis. Você receberá um email com o resultado final. \n\nObrigado(a)!!'
        );
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
        label="Nome da Instituição"
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

      {/* CNPJ (mascarado) */}
      <MaskInputField
        control={control}
        name="cnpj"
        label="CNPJ"
        placeholder="00.000.000/0000-00"
        error={errors}
        type="cnpj"
      />

      {/* Categoria (com autocomplete) */}
      <CategoryField
        control={control}
        name="category"
        label="Categoria"
        error={errors}
        categories={categories}
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
        className="w-full mt-2"
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

// -------------------------
// Página principal do Signup
// -------------------------
const SignUpInstitution: React.FC = () => {
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

export default SignUpInstitution;
