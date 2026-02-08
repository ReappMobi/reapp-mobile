import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, View } from 'react-native';

import { LoadingBox } from '@/components';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  useFollowAccount,
  useUnfollowAccount,
} from '@/services/account/account.service';
import { IInstitution } from '@/types';

interface InstitutionHeaderProps {
  institution: IInstitution;
  loading: boolean;
  isMe?: boolean;
}

export function InstitutionHeader({
  institution,
  loading,
  isMe,
}: InstitutionHeaderProps) {
  const { isDonor } = useAuth();

  const [isFollowing, setIsFollowing] = useState<boolean>(
    !!institution?.isFollowing
  );
  const [followersCount, setFollowersCount] = useState<number>(
    institution?.account?.followersCount ?? 0
  );

  const { mutate: follow } = useFollowAccount({
    onSuccess: () => {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    },
    onError: (error) => {
      console.error('Erro ao seguir a instituição:', error);
    },
  });

  const { mutate: unfollow } = useUnfollowAccount({
    onSuccess: () => {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    },
    onError: (error) => {
      console.error('Erro ao deixar de seguir a instituição:', error);
    },
  });

  useEffect(() => {
    if (institution?.isFollowing !== undefined) {
      setIsFollowing(institution.isFollowing);
    }
    if (institution?.account?.followersCount !== undefined) {
      setFollowersCount(institution.account.followersCount);
    }
  }, [institution?.isFollowing, institution?.account?.followersCount]);

  const handleFollow = () => {
    if (institution?.account) {
      follow(institution.account.id);
    }
  };

  const handleUnfollow = () => {
    if (institution?.account) {
      unfollow(institution.account.id);
    }
  };

  const handleVolunteerPress = useCallback(() => {
    const phoneNumber = institution.phone;
    if (!phoneNumber) {
      Alert.alert(
        'Atenção',
        'Esta instituição não possui telefone cadastrado.'
      );
      return;
    }

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
            <Text className="text-muted-foreground text-sm font-bold">
              {followersCount}
            </Text>
            <Text className="text-muted-foreground text-sm">
              {`${followersCount > 1 ? 'seguidores' : 'seguidor'} `}
            </Text>
          </View>
        </View>
      </View>

      {!isMe && (
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
      )}
    </View>
  );
}
