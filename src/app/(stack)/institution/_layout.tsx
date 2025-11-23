import Ionicons from '@expo/vector-icons/Ionicons';
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Linking, Text, View } from 'react-native';
import { Button, LoadingBox, ScreenContainer } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  followAccount,
  getInstitutionByAccountId,
  unfollowAccount,
} from 'src/services/app-core';
import { IInstitution } from 'src/types';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

type HeaderProps = {
  institution: IInstitution;
  loading: boolean;
};

const Header = memo<HeaderProps>(({ institution, loading }) => {
  const { isDonor, token } = useAuth();

  const [isFollowing, setIsFollowing] = useState<boolean>(
    !!institution?.isFollowing
  );
  const [followersCount, setFollowersCount] = useState<number>(
    institution ? institution.account?.followersCount : 0
  );

  useEffect(() => {
    if (institution?.isFollowing !== undefined) {
      setIsFollowing(institution.isFollowing);
    }
  }, [institution?.isFollowing]);

  const handleFollow = async () => {
    if (!institution?.account) {
      return;
    }
    try {
      await followAccount({ id: institution.account.id, token });
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    } catch (error) {
      console.error('Erro ao seguir a instituição:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!institution?.account) {
      return;
    }
    try {
      await unfollowAccount({ id: institution.account.id, token });
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    } catch (error) {
      console.error('Erro ao deixar de seguir a instituição:', error);
    }
  };

  const handleVolunteerPress = useCallback(() => {
    const phoneNumber = institution.phone;

    const message =
      'Olá, estou vindo pelo Reapp e tenho interesse em ser voluntário!';

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'Atenção',
        'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.'
      );
    });
  }, [institution.phone]);

  return (
    <View>
      <View className="mt-4 flex-row items-center gap-x-2 py-4">
        <Image
          className="h-16 w-16 rounded-full"
          source={
            institution?.account?.media
              ? institution.account.media.remoteUrl
              : ''
          }
          placeholder={
            institution?.account?.media
              ? institution.account.media.blurhash
              : ''
          }
          contentFit="cover"
          transition={500}
        />
        <View className="w-full flex-1 gap-y-0 pt-4">
          <Text className="font-reapp_bold text-lg">
            {institution?.account?.name ?? ''}
          </Text>

          {loading ? (
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
          ) : (
            <View>
              <Text className="text-md pb-2 font-reapp_medium">
                {institution?.category?.name ?? ''}
              </Text>
              {/*
                <Text className="text-md pb-2 font-reapp_medium">
                  {institution ? `${institution.city}/${institution.state}` : ''}
                </Text>
              */}
            </View>
          )}

          <View className="gap-y-2">
            <Button
              textColor="text-white"
              size="small"
              customStyles={`justify-center ${
                isFollowing ? 'bg-gray-400' : 'bg-primary'
              }`}
              onPress={isFollowing ? handleUnfollow : handleFollow}
            >
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>

            {isDonor && (
              <View className="flex-row">
                <Button
                  textColor="text-white"
                  size="small"
                  customStyles="mr-2 w-20 justify-center bg-primary"
                  onPress={() =>
                    router.push({
                      pathname: '/donate',
                      params: {
                        institutionId: institution?.id,
                        phone: institution?.phone,
                      },
                    })
                  }
                >
                  Doar
                </Button>
                <Button
                  startIcon={
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                  }
                  customStyles="flex-1 items-center justify-start gap-x-1"
                  size="small"
                  textSize="text-sm"
                  onPress={handleVolunteerPress}
                >
                  Quero ser voluntário
                </Button>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="flex-row justify-center gap-x-2 py-4">
        <Text className="text-md font-reapp_medium">
          <Text className="text-md font-reapp_bold text-text_primary">
            {followersCount}
          </Text>
          {` Seguidores`}
        </Text>
        {/*
        <Text className="text-md font-reapp_medium">
          <Text className="text-md font-reapp_bold text-text_primary">
            {institution ? institution.donations : ''}
          </Text>
          {` Doadores`}
        </Text>
        */}
        {/*
        <Text className="text-md font-reapp_medium">
          <Text className="text-md font-reapp_bold text-text_primary">
            {institution ? institution.partnersQty : ''}
          </Text>
          {` Parceiros`}
        </Text>
        */}
      </View>
    </View>
  );
});

const Layout = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const { getToken } = useAuth();
  const idNumber = Number(id);

  const [institution, setInstitution] = useState<IInstitution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const renderLabel = useMemo(() => {
    return ({ children, focused }: { focused: boolean; children: string }) => (
      <Text
        className={`font-reapp_medium text-base text-text_neutral ${
          focused ? 'text-text_primary underline' : ''
        }`}
      >
        {children}
      </Text>
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const fetchedInstitution = await getInstitutionByAccountId(
          idNumber,
          token
        );
        setInstitution(fetchedInstitution);
      } catch (err) {
        console.error('Erro ao buscar a instituição:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [idNumber, getToken]);

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingBox customStyle="h-7 w-full mt-5 mb-3 rounded-md bg-slate-400" />
      </ScreenContainer>
    );
  }

  if (!institution) {
    return (
      <ScreenContainer>
        <Text>Não foi possível carregar a instituição.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header institution={institution} loading={false} />

      <MaterialTopTabs
        id={undefined}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarBounces: true,
          tabBarPressColor: 'transparent',
          tabBarItemStyle: {
            width: 'auto',
            height: 'auto',
            paddingHorizontal: 0,
            marginRight: 8,
          },
          tabBarLabel: renderLabel,
          swipeEnabled: true,
          tabBarIndicator: () => null,
          tabBarStyle: {
            marginLeft: 16,
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
          },
          lazy: true,
        }}
      >
        <MaterialTopTabs.Screen
          name="home-view"
          options={{ title: 'Início' }}
          initialParams={{ id: institution.id }}
        />
        <MaterialTopTabs.Screen
          name="projects"
          options={{ title: 'Projetos' }}
          initialParams={{ id: institution.id }}
        />
        {/* 
        <MaterialTopTabs.Screen
          name="transparency"
          options={{ title: 'Transparência' }}
          initialParams={{ id: institution.id }}
        />
        */}
        <MaterialTopTabs.Screen
          name="contacts"
          options={{ title: 'Contatos' }}
          initialParams={{ institution }}
        />
        <MaterialTopTabs.Screen
          name="partners"
          options={{ title: 'Parceiros' }}
          initialParams={{ id: institution.id }}
        />
        <MaterialTopTabs.Screen
          name="collaborators"
          options={{ title: 'Colaboradores' }}
          initialParams={{ id: institution.id }}
        />
        <MaterialTopTabs.Screen
          name="volunteers"
          options={{ title: 'Voluntários' }}
          initialParams={{ id: institution.id }}
        />
      </MaterialTopTabs>
    </ScreenContainer>
  );
};

export default memo(Layout);
