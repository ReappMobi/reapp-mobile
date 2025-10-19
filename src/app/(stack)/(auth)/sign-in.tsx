import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import {
  type signInFormData,
  signInFormSchema,
} from '@/schemas/auth/sign-in.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, TextInput, View } from 'react-native';

export default function SignIn() {
  const passwordInputRef = useRef<TextInput>(null);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const auth = useAuth();

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    try {
      await auth.signIn(data);
      setLoading(false);
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="gap-2 px-4">
      <View className="pt-4 group">
        <Label className="text-color_primary font-semibold group-focus:text-color_secundary">
          Email
        </Label>
        <Input
          id="email"
          placeholder="Digite seu email"
          inputMode="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={onEmailSubmitEditing}
          returnKeyType="next"
          submitBehavior="submit"
          autoFocus
          onChangeText={(text) =>
            setValue('email', text, { shouldValidate: true })
          }
          value={watch('email')}
          {...register('email')}
          className="border-color_primary/60 border-2 focus:border-color_primary rounded-sm h-12"
        />
        {errors.email && (
          <Text className="my-0.5 text-xs font-semibold text-rose-500">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View className="group">
        <Label className="text-color_primary/70 font-semibold group-focus:text-color_secundary">
          Senha
        </Label>
        <Input
          ref={passwordInputRef}
          id="password"
          textContentType="password"
          placeholder="Digite sua senha"
          secureTextEntry
          {...register('password')}
          onChangeText={(text) =>
            setValue('password', text, { shouldValidate: true })
          }
          value={watch('password')}
          returnKeyType="done"
          submitBehavior="submit"
          onSubmitEditing={handleSubmit(onSubmit)}
          className="border-color_primary/60  border-2 focus:border-color_primary rounded-sm h-12"
        />
        {errors.password && (
          <Text className="my-0.5 text-xs font-semibold text-rose-500">
            {errors.password.message}
          </Text>
        )}
      </View>

      <Text
        className="text-color_primary font-semibold underline underline-offset-3 text-sm"
        onPress={() => router.push('/forgot-password')}
      >
        Esqueci minha senha
      </Text>

      <View className="gap-2 pt-4">
        <Button
          className="w-full justify-center h-11 bg-color_primary active:bg-color_secundary/90 disabled:opacity-85 disabled:bg-color_primary/50"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-white">Entrar</Text>
        </Button>

        <Text className="text-center text-xs text-color_secundary">
          Não tem uma conta?
        </Text>

        <Link asChild href="/profile-selector" push>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-2 h-11 justify-center items-center border-color_primary active:border-color_primary/60 active:bg-color_primary/20"
          >
            <Text className="text-color_primary h-min">Criar conta</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
