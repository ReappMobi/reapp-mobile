import type { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Link, router } from 'expo-router';
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  LogOut,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react-native';
import { useState } from 'react';
import { LayoutAnimation, Linking, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/lib/toast-config';

interface DrawerMenuProps {
  navigation: DrawerNavigationHelpers;
}

const DrawerMenu = ({ navigation }: DrawerMenuProps) => {
  const { signOut, isDonor } = useAuth();
  const [isDonationsOpen, setIsDonationsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigation.closeDrawer();
    router.replace('/welcome');
  };

  const handleDonationsPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDonationsOpen(!isDonationsOpen);
  };

  const handleCanalDuvidas = () => {
    const phoneNumber = '9898607-1896';

    const message =
      'Olá, tudo bem? Estou entrando em contato pelo Canal de Dúvidas e gostaria de tirar uma dúvida. Poderia me ajudar?';

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch(() => {
      showToast({
        type: 'error',
        header: 'Atenção',
        visibilityTime: 1500,
        description:
          'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.',
        icon: AlertCircle,
      });
    });
  };

  return (
    <View className="flex h-full w-full flex-col pt-4">
      <View className="flex flex-1 flex-col">
        {isDonor ? (
          <Link
            href="/my-donations"
            asChild
            onPress={() => navigation.closeDrawer()}
          >
            <Button variant="ghost" className="flex-row justify-between px-0">
              <Text className="font-bold text-lg">Minhas doações</Text>
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            className="mb-2 flex-row items-center justify-between px-0"
            onPress={handleDonationsPress}
          >
            <Text
              className={`font-bold text-lg ${isDonationsOpen ? 'text-primary' : ''}`}
            >
              Minhas doações
            </Text>
            <Icon
              as={isDonationsOpen ? ChevronUp : ChevronDown}
              className="text-foreground w-5 h-5"
            />
          </Button>
        )}

        {isDonationsOpen && (
          <View className="ml-4 flex-col gap-y-1">
            <Link
              href="/my-donations-institution-general"
              asChild
              onPress={() => navigation.closeDrawer()}
            >
              <Button variant="ghost" className="justify-start px-0">
                <Text className="font-medium text-base">Gerais</Text>
              </Button>
            </Link>

            <Link
              href="/my-donations-institution"
              asChild
              onPress={() => navigation.closeDrawer()}
            >
              <Button variant="ghost" className="justify-start px-0">
                <Text className="font-medium text-base">Instituição</Text>
              </Button>
            </Link>

            <Link
              href="/my-donations-institution-project"
              asChild
              onPress={() => navigation.closeDrawer()}
            >
              <Button variant="ghost" className="justify-start px-0">
                <Text className="font-medium text-base">Projetos</Text>
              </Button>
            </Link>
          </View>
        )}

        <Link href="/saved" asChild onPress={() => navigation.closeDrawer()}>
          <Button variant="ghost" className="justify-start px-0">
            <Text className="font-bold text-lg">Postagens Salvas</Text>
          </Button>
        </Link>
      </View>

      <View className="gap-y-2 pb-6">
        <Link href="/privacy" asChild onPress={() => navigation.closeDrawer()}>
          <Button variant="ghost" className="gap-x-2 justify-start px-0">
            <Icon as={ShieldCheck} className="text-foreground w-5 h-5" />
            <Text className="font-semibold text-base">Privacidade (LGPD)</Text>
          </Button>
        </Link>

        <Button
          variant="ghost"
          className=" gap-x-2 justify-start px-0"
          onPress={handleCanalDuvidas}
        >
          <Icon as={MessageCircle} className="text-foreground w-5 h-5" />
          <Text className="font-semibold text-base">Canal de dúvidas</Text>
        </Button>

        <Button
          variant="ghost"
          className="justify-start px-0"
          onPress={handleSignOut}
        >
          <Icon as={LogOut} className="text-foreground w-5 h-5" />
          <Text className="font-semibold text-base">Sair</Text>
        </Button>
      </View>
    </View>
  );
};

export { DrawerMenu };
