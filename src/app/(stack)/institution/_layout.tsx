import { Image } from 'expo-image';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, View } from 'react-native';

import { LoadingBox, ScreenContainer } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  followAccount,
  getInstitutionByAccountId,
  unfollowAccount,
} from 'src/services/app-core';
import { IInstitution } from 'src/types';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { MaterialTopTabs, TopTabs } from '@/components/ui/top-tab';
import { cn } from '@/lib/utils';

type HeaderProps = {
  institution: IInstitution;
  loading: boolean;
};

const Header = ({ institution, loading }: HeaderProps) => {
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

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'Atenção',
        'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.'
      );
    });
  }, [institution.phone]);

  return (
    <View className="mb-2 gap-y-3">
      <View className="flex-row-reverse gap-x-2">
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
          <Text className="font-bold text-xl">
            {institution?.account?.name ?? ''}
          </Text>

          {loading ? (
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
          ) : (
            <View>
              <Text className="text-sm">
                {institution?.category?.name ?? ''}
              </Text>
            </View>
          )}
          <View className="flex-row gap-x-1">
            <Text className="text-muted-foreground text-sm">
              {followersCount}
            </Text>
            <Text className="text-muted-foreground text-sm">
              {`${followersCount > 1 ? 'seguidores' : 'seguidor'} `}
            </Text>
          </View>
        </View>
      </View>

      <View className="gap-y-2">
        {isDonor && (
          <Button
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
        )}

        <View className="flex-row gap-x-2">
          <Button
            size="sm"
            className={cn('flex-1 bg-primary', isFollowing && 'bg-secondary')}
            onPress={isFollowing ? handleUnfollow : handleFollow}
          >
            <Text>{isFollowing ? 'Seguindo' : 'Seguir'}</Text>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-2"
            onPress={handleVolunteerPress}
          >
            <Text> Ser voluntário</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default function Layout() {
  const params = useLocalSearchParams();
  const { id } = params;
  const { token } = useAuth();
  const idNumber = Number(id);

  const [institution, setInstitution] = useState<IInstitution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
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
  }, [idNumber]);

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
    <ScreenContainer className="gap-y-4">
      <Header institution={institution} loading={loading} />
      <TopTabs>
        <MaterialTopTabs.Screen
          name="home"
          options={{ title: 'Início' }}
          initialParams={{ id: institution.id }}
        />
        <MaterialTopTabs.Screen
          name="projects"
          options={{ title: 'Projetos' }}
          initialParams={{ id: institution.id }}
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
      </TopTabs>
    </ScreenContainer>
  );
}
