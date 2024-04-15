import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { Button, Input } from 'src/components';
import colors from 'src/constants/colors';

export default function SignUp() {
  const params = useLocalSearchParams();

  const clearHistory = () => {
    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }
    router.replace('/sign-in'); // Replace the last remaining stack element
  };

  const isDonor = params.donor === 'true';
  return (
    <ScrollView>
      <View className="px-4 py-2">
        <View className="gap-4">
          {isDonor && (
            <View className="flex-row justify-center gap-2">
              <View>
                <Button customStyles="w-14 justify-center bg-color_third_light">
                  <Ionicons
                    name="logo-facebook"
                    size={24}
                    color={colors.text_neutral}
                  />
                </Button>
              </View>

              <View>
                <Button customStyles="w-14 justify-center bg-color_third_light">
                  <Ionicons
                    name="logo-google"
                    size={24}
                    color={colors.text_neutral}
                  />
                </Button>
              </View>
            </View>
          )}

          {isDonor && (
            <Text className="text-center font-reapp_regular text-xs">
              Ou cadastre-se com seu email
            </Text>
          )}

          <View>
            <Text className="text-md font-reapp_regular">Email</Text>
            <Input placeholder="exemplo@dominio.com" inputMode="email" />
          </View>

          <View>
            <Text className="text-md font-reapp_regular">
              {isDonor ? 'Nome de usuário' : 'Nome da Instituição'}
            </Text>
            <Input placeholder="Nome" inputMode="text" />
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Telefone</Text>
            <Input placeholder="(00) 0000-0000" inputMode="tel" />
          </View>

          {!isDonor && (
            <View>
              <Text className="text-md font-reapp_regular">CNPJ</Text>
              <Input placeholder="12.345.678/0001-00" inputMode="numeric" />
            </View>
          )}

          <View>
            <Text className="text-md font-reapp_regular">Senha</Text>
            <Input placeholder="Senha (mínimo 8 caracteres)" secureTextEntry />
          </View>

          <View>
            <Text className="text-md font-reapp_regular">Confirmar senha</Text>
            <Input placeholder="Confirme a senha" secureTextEntry />
          </View>

          <View>
            <Button
              customStyles="w-full justify-center bg-color_primary"
              textColor="text-text_light"
              onPress={() => {}}
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
