import { debounce } from 'es-toolkit/function';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Bookmark from 'lucide-react-native/dist/esm/icons/bookmark';
import CircleCheck from 'lucide-react-native/dist/esm/icons/circle-check';
import CircleX from 'lucide-react-native/dist/esm/icons/circle-x';
import EllipsisVertical from 'lucide-react-native/dist/esm/icons/ellipsis-vertical';
import Heart from 'lucide-react-native/dist/esm/icons/heart';
import MessageCircle from 'lucide-react-native/dist/esm/icons/message-circle';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useLike } from '@/hooks/useLike';
import { useSave } from '@/hooks/useSave';
import { useBlockUser } from '@/services/block/block.service';
import { useReportContent } from '@/services/report/report.service';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { showToast } from '@/lib/toast-config';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/utils/time-ago';

type CardPostProps = {
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
};

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
  const [optionsDialogOpen, setOptionsDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const { isLiked, toggleLike } = useLike(postId, isLikedInitial);
  const { isSaved, toggleSave } = useSave(postId, isSavedInitial);

  const { mutate: reportMutate } = useReportContent({
    onSuccess: () => {
      showToast({
        type: 'success',
        header: 'Denúncia enviada',
        description: 'Sua denúncia foi enviada com sucesso.',
        icon: CircleCheck,
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        header: 'Erro',
        description: 'Não foi possível enviar a denúncia.',
        icon: CircleX,
      });
    },
  });

  const { mutate: blockMutate } = useBlockUser({
    onSuccess: () => {
      showToast({
        type: 'success',
        header: 'Usuário bloqueado',
        description: 'Usuário bloqueado com sucesso.',
        icon: CircleCheck,
      });
      onBlockUser?.();
    },
    onError: () => {
      showToast({
        type: 'error',
        header: 'Erro',
        description: 'Não foi possível bloquear o usuário.',
        icon: CircleX,
      });
    },
  });

  const canExpandContent = description?.length ? description.length > 100 : false;

  const postedIn = timeAgo(updatedAt);

  const handleCommentPress = useCallback(
    debounce(() => {
      router.push(`/post-comments/${postId}`);
    }, 170),
    [postId]
  );

  const handleReport = () => {
    setReportReason('');
    setReportDialogOpen(true);
  };

  const handleReportConfirm = () => {
    if (!reportReason.trim()) {
      return;
    }

    reportMutate({
      targetType: 'POST',
      targetId: Number(postId),
      reason: reportReason,
    });
  };

  const handleBlock = () => {
    if (!institutionAccountId) {
      return;
    }

    setBlockDialogOpen(true);
  };

  const handleBlockConfirm = () => {
    if (!institutionAccountId) {
      return;
    }

    blockMutate({ userId: institutionAccountId });
  };

  const handleOptionsPress = () => {
    setOptionsDialogOpen(true);
  };

  return (
    <View className="w-full bg-white py-3">
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
                className="font-medium text-base text-foreground"
              >
                {name}
              </Text>
              <Text>
                <Text className="font-ligth text-xs text-gray-500">
                  {postedIn}
                </Text>
              </Text>
            </View>
            <Button variant="ghost" size="icon" onPress={handleOptionsPress}>
              <Icon
                as={EllipsisVertical}
                size={18}
                className="stroke-gray-400"
              />
            </Button>
          </View>
          <View>
            <View className="pb-2">
              <Text
                numberOfLines={expanded ? undefined : 4}
                className="font-regular text-sm text-text-neutral"
              >
                {description}
              </Text>

              {canExpandContent && (
                <Pressable onPress={() => setExpanded(!expanded)}>
                  <Text className="text-text_blue font-regular text-xs">
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
                    'stroke-text-neutral',
                    isLiked && 'stroke-rose-500 fill-rose-500'
                  )}
                />
              </Pressable>

              <Pressable onPress={toggleSave}>
                <Icon
                  as={Bookmark}
                  size={22}
                  className={cn(
                    ' stroke-text-neutral mt-0.5',
                    isSaved && ' fill-text-neutral'
                  )}
                />
              </Pressable>

              <Pressable onPress={handleCommentPress}>
                <Icon
                  as={MessageCircle}
                  size={22}
                  className={cn(' stroke-text-neutral mt-0.5')}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <AlertDialog open={optionsDialogOpen} onOpenChange={setOptionsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Opções</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2">
            <AlertDialogAction onPress={handleReport}>
              <Text>Denunciar publicação</Text>
            </AlertDialogAction>
            {institutionAccountId && (
              <AlertDialogAction variant="destructive" onPress={handleBlock}>
                <Text>Bloquear usuário</Text>
              </AlertDialogAction>
            )}
            <AlertDialogCancel>
              <Text>Cancelar</Text>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Denunciar publicação</AlertDialogTitle>
            <AlertDialogDescription>
              Descreva o motivo da denúncia:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            placeholder="Motivo da denúncia"
            placeholderTextColor="#9ca3af"
            value={reportReason}
            onChangeText={setReportReason}
            multiline
            maxLength={500}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancelar</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={handleReportConfirm}>
              <Text>Enviar</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bloquear usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja bloquear {name}? Você não verá mais as publicações deste
              perfil.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancelar</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onPress={handleBlockConfirm}
            >
              <Text>Bloquear</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}

export default CardPost;
