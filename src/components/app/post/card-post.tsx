import { debounce } from 'es-toolkit/function';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  Bookmark,
  EllipsisVertical,
  Heart,
  MessageCircle,
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ActionSheetIOS, Alert, Platform, Pressable, View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { useLike } from '@/hooks/useLike';
import { useSave } from '@/hooks/useSave';
import { cn } from '@/lib/utils';
import { blockUser } from '@/services/block';
import { reportContent } from '@/services/report';
import { timeAgo } from '@/utils/time-ago';

interface CardPostProps {
  postId: string | number;
  userImageUrl?: string;
  userImageBlurhash?: string;
  mediaUrl?: string;
  mediaBlurhash?: string;
  name?: string;
  description?: string;
  updatedAt?: string;
  isLikedInitial?: boolean;
  isSavedInitial?: boolean;
  mediaAspect?: number;
  institutionAccountId?: number;
  onPressInstitutionProfile?: () => void;
  onPressDelete?: () => void;
  onBlockUser?: () => void;
}

export function CardPost({
  postId,
  userImageUrl,
  userImageBlurhash,
  mediaUrl,
  mediaBlurhash,
  name,
  mediaAspect = 1,
  description,
  updatedAt,
  isLikedInitial,
  isSavedInitial,
  institutionAccountId,
  onPressInstitutionProfile,
  onBlockUser,
}: CardPostProps) {
  const [expanded, setExpanded] = useState(false);
  const { isLiked, toggleLike } = useLike(postId, isLikedInitial);
  const { isSaved, toggleSave } = useSave(postId, isSavedInitial);
  const { token } = useAuth();

  const canExpandContent = description?.length
    ? description.length > 100
    : false;

  const postedIn = timeAgo(updatedAt);

  const handleCommentPress = useCallback(
    debounce(() => {
      router.push(`/post-comments/${postId}`);
    }, 170),
    [postId]
  );

  const handleReport = useCallback(() => {
    if (!token) {
      Alert.alert('Erro', 'Você precisa estar autenticado para denunciar.');
      return;
    }

    Alert.prompt(
      'Denunciar publicação',
      'Descreva o motivo da denúncia:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar',
          onPress: async (reason) => {
            if (!reason?.trim()) {
              return;
            }
            try {
              await reportContent({
                targetType: 'POST',
                targetId: Number(postId),
                reason,
                token,
              });
              Alert.alert('Sucesso', 'Denúncia enviada com sucesso.');
            } catch {
              Alert.alert('Erro', 'Não foi possível enviar a denúncia.');
            }
          },
        },
      ],
      'plain-text'
    );
  }, [postId, token]);

  const handleBlock = useCallback(async () => {
    if (!token || !institutionAccountId) {
      return;
    }

    Alert.alert(
      'Bloquear usuário',
      `Deseja bloquear ${name}? Você não verá mais as publicações deste perfil.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Bloquear',
          style: 'destructive',
          onPress: async () => {
            try {
              await blockUser(institutionAccountId, token);
              Alert.alert('Sucesso', 'Usuário bloqueado com sucesso.');
              onBlockUser?.();
            } catch {
              Alert.alert('Erro', 'Não foi possível bloquear o usuário.');
            }
          },
        },
      ]
    );
  }, [institutionAccountId, name, onBlockUser, token]);

  const handleOptionsPress = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancelar', 'Denunciar publicação', 'Bloquear usuário'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            handleReport();
          }
          if (buttonIndex === 2) {
            handleBlock();
          }
        }
      );
      return;
    }

    Alert.alert('Opções', undefined, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Denunciar publicação', onPress: handleReport },
      { text: 'Bloquear usuário', style: 'destructive', onPress: handleBlock },
    ]);
  }, [handleBlock, handleReport]);

  return (
    <View className="w-full bg-background py-3">
      <View className="flex-row w-full gap-x-3">
        <View className="max-w-10">
          <Pressable onPress={onPressInstitutionProfile}>
            <View className="h-10 w-10 items-center justify-center">
              <Image
                className="h-full w-full rounded-full"
                source={{ uri: userImageUrl }}
                placeholder={{ blurhash: userImageBlurhash }}
                contentFit="cover"
                transition={500}
              />
            </View>
          </Pressable>
        </View>

        <View className="w-full flex-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-x-2 flex-1">
              <Text
                onPress={onPressInstitutionProfile}
                className="font-medium text-base text-slate-900"
              >
                {name}
              </Text>
              <Text>
                <Text className="font-ligth text-xs text-slate-500">
                  {postedIn}
                </Text>
              </Text>
            </View>

            <Pressable onPress={handleOptionsPress} hitSlop={8}>
              <Icon as={EllipsisVertical} size={18} className="stroke-gray-400" />
            </Pressable>
          </View>

          <View>
            <View className="pb-2">
              <Text
                numberOfLines={expanded ? undefined : 4}
                className="font-regular text-sm text-slate-900"
              >
                {description}
              </Text>

              {canExpandContent && (
                <Pressable onPress={() => setExpanded(!expanded)}>
                  <Text className="text-blue-500 font-regular text-xs">
                    {expanded ? 'Ler menos' : 'Ler mais'}
                  </Text>
                </Pressable>
              )}
            </View>

            {mediaUrl && (
              <View className="h-max w-full items-center justify-center rounded-lg">
                <Image
                  className="w-full rounded-lg"
                  source={{ uri: mediaUrl }}
                  placeholder={{ blurhash: mediaBlurhash }}
                  contentFit="cover"
                  transition={500}
                  style={{ aspectRatio: mediaAspect }}
                />
              </View>
            )}

            <View className="flex-row gap-x-5 mt-3">
              <Pressable onPress={toggleLike}>
                <Icon
                  as={Heart}
                  size={23}
                  className={cn(
                    'stroke-foreground',
                    isLiked && 'stroke-rose-500 fill-rose-500'
                  )}
                />
              </Pressable>

              <Pressable onPress={toggleSave}>
                <Icon
                  as={Bookmark}
                  size={22}
                  className={cn('stroke-foreground mt-0.5', isSaved && ' fill-slate-900')}
                />
              </Pressable>

              <Pressable onPress={handleCommentPress}>
                <Icon
                  as={MessageCircle}
                  size={22}
                  className="stroke-foreground mt-0.5"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
