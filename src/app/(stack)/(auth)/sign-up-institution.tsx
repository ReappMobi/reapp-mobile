import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { getInstitutionCategories } from 'src/services/app-core';
import { z } from 'zod';

export default function SignUp() {
  const phoneRef = useRef(null);
  const cnpjRef = useRef(null);
  const auth = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('react');
  const [selectedState, setSelectedState] = useState('react');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getInstitutionCategories();
      if (res.error) {
        Alert.alert('Erro na aplicação. Tente novamente mais tarde');
        router.back();
      }
      setCategories(res);
    };
    fetchCategories();
  }, []);

  const states = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];

  const signUpInstitutionFormSchema = z
    .object({
      email: z
        .string({ required_error: 'O email é obrigatório.' })
        .email('Email inválido.'),
      name: z
        .string({ required_error: 'O nome é obrigatório.' })
        .max(25, 'O nome da instituição deve ter no máximo 25 caracteres.'),
      phone: z
        .string({ required_error: 'O telefone é obrigatório.' })
        .regex(
          /^\(\d{2}\) \d{5}-\d{4}$/,
          'O telefone não está no formato correto'
        ),
      password: z
        .string({ required_error: 'A senha é obrigatória.' })
        .min(8, 'A senha deve ter pelo menos 8 caracteres.'),
      city: z
        .string({ required_error: 'O nome da cidade é obrigatório.' })
        .max(25, 'O nome da cidade deve ter no máximo 25 caracteres.'),
      cnpj: z
        .string({ required_error: 'O CNPJ é obrigatório.' })
        .regex(
          /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
          'CNPJ inválido. Formato esperado: 00.000.000/0000-00'
        ),
      confirm_password: z.string({
        required_error: 'A confirmação da senha é obrigatória.',
      }),
      facebook: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            const facebookRegex =
              /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9.?\-_/]*$/;
            return facebookRegex.test(val);
          },
          {
            message: 'Link do Facebook inválido.',
          }
        ),
      instagram: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            const instagramRegex =
              /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9.?\-_/]*$/;
            return instagramRegex.test(val);
          },
          {
            message: 'Link do Instagram inválido.',
          }
        ),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: 'As senhas não coincidem.',
      path: ['confirm_password'],
    })
    .refine((data) => cnpjRef?.current.isValid(), {
      message: 'CNPJ inválido.',
      path: ['cnpj'],
    });
  type signUpInstitutionFormData = z.infer<typeof signUpInstitutionFormSchema>;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpInstitutionFormData>({
    resolver: zodResolver(signUpInstitutionFormSchema),
  });

  const onSubmit = async (data: any) => {
    const unmaskPhone = phoneRef?.current.getRawValue();
    const unmaskCnpj = cnpjRef?.current.getRawValue();
    const dataReq: { [key: string]: any } = {
      name: data.name,
      password: data.password,
      confirmPassword: data.confirm_password,
      phone: unmaskPhone,
      email: data.email,
      cnpj: unmaskCnpj,
      categoryId: selectedCategory,
      city: data.city,
      state: selectedState,
    };
    if (data.facebook) {
      dataReq.facebook = data.facebook;
    }

    if (data.instagram) {
      dataReq.instagram = data.instagram;
    }
    const res = await auth.institutionSignUp(dataReq);
    if (res.error) {
      Alert.alert('Erro no cadastro da instituição', res.error);
    } else {
      Alert.alert('Instituição cadastrada com sucesso!');
      clearHistory();
    }
  };

  const clearHistory = () => {
    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }
    router.replace('/sign-in'); // Replace the last remaining stack element
  };

  return (
    <ScrollView>
      <View className="px-4 py-2">
        <View className="gap-4">
          <View>
            <Text className="text-md font-reapp_regular">Email *</Text>

            <Input
              placeholder="exemplo@dominio.com"
              inputMode="email"
              onChangeText={(text) =>
                setValue('email', text, { shouldValidate: true })
              }
              value={watch('email')}
              {...register('email')}
            />
            {errors.email && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              Nome da Instituição *
            </Text>

            <Input
              placeholder="Nome"
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
            <Text className="text-md font-reapp_regular">Telefone *</Text>
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
              placeholder="(00) 0000-0000"
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
            <Text className="text-md font-reapp_regular">CNPJ *</Text>
            <TextInputMask
              type="cnpj"
              onChangeText={(text) =>
                setValue('cnpj', text, { shouldValidate: true })
              }
              value={watch('cnpj')}
              {...register('cnpj')}
              placeholder="12.345.678/0001-00"
              ref={cnpjRef}
              className="border-1 min-h-14 w-full rounded border border-text_secondary 
                  bg-input_background px-2 py-4 font-reapp_regular 
                  text-base text-text_gray"
            />
            {errors.cnpj && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.cnpj.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-md font-reapp_regular">
              Selecione uma categoria: *
            </Text>
            <View className="border-1 border border-text_secondary">
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {categories.map((category, index) => (
                  <Picker.Item
                    key={index}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              Selecione um estado: *
            </Text>
            <View className="border-1 border border-text_secondary">
              <Picker
                selectedValue={selectedState}
                onValueChange={(itemValue) => setSelectedState(itemValue)}
              >
                {states.map((category, index) => (
                  <Picker.Item
                    key={index}
                    label={category.label}
                    value={category.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Cidade *</Text>

            <Input
              placeholder="Digite a cidade"
              inputMode="text"
              {...register('city')}
              onChangeText={(text) =>
                setValue('city', text, { shouldValidate: true })
              }
              value={watch('city')}
              {...register('city')}
            />
            {errors.city && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.city.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Link do Facebook</Text>

            <Input
              placeholder="Link do facebook da instituição (opcional)"
              inputMode="text"
              {...register('facebook')}
              onChangeText={(text) =>
                setValue('facebook', text, { shouldValidate: true })
              }
              value={watch('facebook')}
              {...register('facebook')}
            />
            {errors.facebook && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.facebook.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              Link do Instagram
            </Text>

            <Input
              placeholder="Link do instagram da instituição (opcional)"
              inputMode="text"
              {...register('instagram')}
              onChangeText={(text) =>
                setValue('instagram', text, { shouldValidate: true })
              }
              value={watch('instagram')}
              {...register('instagram')}
            />
            {errors.instagram && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.instagram.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Senha *</Text>

            <Input
              placeholder="Senha (mínimo 8 caracteres)"
              secureTextEntry
              {...register('password')}
              onChangeText={(text) =>
                setValue('password', text, { shouldValidate: true })
              }
              value={watch('password')}
            />

            {errors.password && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.password.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              Confirmar senha *
            </Text>

            <Input
              placeholder="Confirme a senha"
              secureTextEntry
              {...register('confirm_password')}
              onChangeText={(text) =>
                setValue('confirm_password', text, { shouldValidate: true })
              }
              value={watch('confirm_password')}
            />

            {errors.confirm_password && (
              <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
                {errors.confirm_password.message}
              </Text>
            )}
          </View>

          <View>
            <Button
              customStyles="w-full justify-center bg-color_primary"
              textColor="text-text_light"
              onPress={handleSubmit(onSubmit)}
            >
              Cadastrar
            </Button>
          </View>

          <Text className="text-md text-center font-reapp_regular">
            Já possui uma conta?{' '}
            <Link
              href="/sign-in"
              replace
              className="text-md text-text_primary underline underline-offset-1"
              onPress={() => clearHistory()}
            >
              Entrar
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
