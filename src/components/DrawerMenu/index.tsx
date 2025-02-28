import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React, { memo, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking,
  Alert,
} from 'react-native';
import { useAuth } from 'src/hooks/useAuth';

if (
  Platform.OS === 'android' &&
  UIManager &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const DrawerMenu: React.FC = memo(() => {
  const navigation = useNavigation();
  const { signOut, isDonor } = useAuth();

  const [isDonationsOpen, setIsDonationsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigation.dispatch(DrawerActions.closeDrawer());
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
        {/* Acordeão de "Minhas Doações" */}

        {isDonor ? (
          <TouchableOpacity
            className="flex-row justify-between"
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              router.push('/my-donations');
            }}
          >
            <Text className="font-reapp_bold text-lg">Minhas doações</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mb-2 flex-row items-center justify-between"
            onPress={handleDonationsPress}
          >
            <Text
              className={`font-reapp_bold text-lg ${isDonationsOpen ? 'text-color_primary' : ''}`}
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

        {/* Opções internas do acordeão */}
        {isDonationsOpen && (
          <View className="ml-4 flex-col gap-y-2">
            <TouchableOpacity
              className="mt-4"
              onPress={() => {
                navigation.dispatch(DrawerActions.closeDrawer());
                router.push('/my-donations-institution-general');
              }}
            >
              <Text className="font-reapp_medium text-base">Gerais</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.closeDrawer());
                router.push('/my-donations-institution');
              }}
            >
              <Text className="font-reapp_medium text-base">Instituição</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.closeDrawer());
                router.push('/my-donations-institution-project');
              }}
            >
              <Text className="font-reapp_medium text-base">Projetos</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Postagens Salvas */}
        <TouchableOpacity
          className="mt-4 flex-row justify-between"
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            router.push('/saved');
          }}
        >
          <Text className="font-reapp_bold text-lg">Postagens Salvas</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            router.push('/privacy');
          }}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="black" />
          <Text className="font-reapp_bold text-base">Privacidade (LGPD)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={handleCanalDuvidas}
        >
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text className="font-reapp_bold text-base">Canal de dúvidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={handleSignOut}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text className="font-reapp_bold text-base">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
