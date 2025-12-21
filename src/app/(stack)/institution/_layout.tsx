import Ionicons from '@expo/vector-icons/Ionicons';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { LoadingBox, ScreenContainer } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  useFollowAccount,
  useUnfollowAccount,
} from 'src/services/account/service';
import { useGetInstitutionByAccountId } from 'src/services/institutions/service';
import { IInstitution } from 'src/types';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

type HeaderProps = {
  institution: IInstitution | null | undefined;
  loading: boolean;
};

const Header = memo<HeaderProps>(({ institution, loading }) => {
  const { isDonor } = useAuth();

  const [isFollowing, setIsFollowing] = useState<boolean>(
    !!institution?.isFollowing
  );
  const [followersCount, setFollowersCount] = useState<number>(
    institution ? institution.account?.followersCount : 0
  );

  const { mutateAsync: followAccount } = useFollowAccount();
  const { mutateAsync: unfollowAccount } = useUnfollowAccount();

  useEffect(() => {
    if (institution?.isFollowing !== undefined) {
      setIsFollowing(institution.isFollowing);
    }
    if (institution?.account?.followersCount !== undefined) {
      setFollowersCount(institution.account.followersCount);
    }
  }, [institution]);

  const handleFollow = async () => {
    if (!institution?.account) {
      return;
    }
    try {
      await followAccount(institution.account.id);
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
      await unfollowAccount(institution.account.id);
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    } catch (error) {
      console.error('Erro ao deixar de seguir a instituição:', error);
    }
  };

  const handleVolunteerPress = useCallback(() => {
    if (!institution?.phone) {
      return;
    }
    const phoneNumber = institution.phone;

    const message =
      'Olá, estou vindo pelo Reapp e tenho interesse em ser voluntário!';

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'Atenção',
        'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.'
      );
    });
  }, [institution?.phone]);

  return (
    <View className="bg-white">
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
          <Text className="font-bold text-lg">
            {institution?.account?.name ?? ''}
          </Text>

          {loading ? (
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
          ) : (
            <View>
              <Text className="text-md pb-2 font-medium">
                {institution?.category?.name ?? ''}
              </Text>
            </View>
          )}

          <View className="gap-y-2">
            <Button
              size="sm"
              className={`${isFollowing ? 'bg-gray-400' : 'bg-primary'}`}
              onPress={isFollowing ? handleUnfollow : handleFollow}
            >
              <Text>{isFollowing ? 'Seguindo' : 'Seguir'}</Text>
            </Button>

            {isDonor && (
              <View className="flex-row">
                <Button
                  size="sm"
                  className="mr-2 w-20"
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
                  <Text>Doar</Text>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-start"
                  onPress={handleVolunteerPress}
                >
                  <Ionicons name="chevron-forward" size={20} color="#000" />
                  <Text>Quero ser voluntário</Text>
                </Button>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="flex-row justify-center gap-x-2 py-4">
        <Text className="text-md font-medium">
          <Text className="text-md font-bold text-text_primary">
            {followersCount}
          </Text>
          {` Seguidores`}
        </Text>
      </View>
    </View>
  );
});

const Layout = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const idNumber = Number(id);

  const { data: institution, isLoading: loading } =
    useGetInstitutionByAccountId(idNumber);

  const renderLabel = useMemo(() => {
    return ({ children, focused }: { focused: boolean; children: string }) => (
      <Text
        className={`font-medium text-base text-text_neutral ${
          focused ? 'text-text_primary underline' : ''
        }`}
      >
        {children}
      </Text>
    );
  }, []);

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
            marginRight: 16,
            tabBarItemStyle: {
              width: 'auto',
            },
          },
          tabBarLabel: renderLabel,
          swipeEnabled: true,
          tabBarIndicator: () => null,
          tabBarStyle: {
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
