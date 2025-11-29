import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { DrawerNavigationHelpers } from 'node_modules/@react-navigation/drawer/lib/typescript/src/types';
import React, { memo, useState } from 'react';
import {
  Alert,
  LayoutAnimation,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from 'src/hooks/useAuth';

interface DrawerMenuProps {
  navigation: DrawerNavigationHelpers;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = memo(({ navigation }) => {
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
      Alert.alert(
        'Atenção',
        'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.'
      );
    });
  };

  return (
    <View className="flex h-full w-full flex-col pt-4">
      <View className="flex flex-1 flex-col">
        {isDonor ? (
          <TouchableOpacity
            className="flex-row justify-between"
            onPress={() => {
              navigation.closeDrawer();
              router.push('/my-donations');
            }}
          >
            <Text className="font-bold text-lg">Minhas doações</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mb-2 flex-row items-center justify-between"
            onPress={handleDonationsPress}
          >
            <Text
              className={`font-bold text-lg ${isDonationsOpen ? 'text-primary' : ''}`}
            >
              Minhas doações
            </Text>
            <Ionicons
              name={isDonationsOpen ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}

        {isDonationsOpen && (
          <View className="ml-4 flex-col gap-y-2">
            <TouchableOpacity
              className="mt-4"
              onPress={() => {
                navigation.closeDrawer();
                router.push('/my-donations-institution-general');
              }}
            >
              <Text className="font-medium text-base">Gerais</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.closeDrawer();
                router.push('/my-donations-institution');
              }}
            >
              <Text className="font-medium text-base">Instituição</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.closeDrawer();
                router.push('/my-donations-institution-project');
              }}
            >
              <Text className="font-medium text-base">Projetos</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Postagens Salvas */}
        <TouchableOpacity
          className="mt-4 flex-row justify-between"
          onPress={() => {
            navigation.closeDrawer();
            router.push('/saved');
          }}
        >
          <Text className="font-bold text-lg">Postagens Salvas</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={() => {
            navigation.closeDrawer();
            router.push('/privacy');
          }}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="black" />
          <Text className="font-bold text-base">Privacidade (LGPD)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={handleCanalDuvidas}
        >
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text className="font-bold text-base">Canal de dúvidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={handleSignOut}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text className="font-bold text-base">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
