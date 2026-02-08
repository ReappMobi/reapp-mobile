import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { ChevronRight, Heart, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import colors from '@/constants/colors';
import { THEME } from '@/lib/theme';
import { cn } from '@/lib/utils';
import {
  GET_PROJECTS_BY_INSTITUTION_ID_KEY,
  useDeleteProject,
} from '@/services/project/project.service';

interface ProjectCardProps {
  id: number;
  institutionId?: number;
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaBlurhash?: string;
  textButton?: string;
  isFavoriteCard?: boolean;
  isLikedInitial?: boolean;
  onPress?: () => void;
  onPressLike?: () => void;
  canDelete?: boolean;

  imagePath?: string;
  subtitle?: string;
}

const DEFAULT_BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export function ProjectCard({
  id,
  institutionId,
  title,
  description,
  mediaUrl,
  mediaBlurhash,
  textButton = 'Ver mais',
  isFavoriteCard,
  isLikedInitial = true,
  onPress,
  onPressLike,
  canDelete,
  imagePath,
  subtitle,
}: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject({
    onSuccess: () => {
      if (institutionId) {
        queryClient.invalidateQueries({
          queryKey: [GET_PROJECTS_BY_INSTITUTION_ID_KEY, institutionId],
        });
      }
      setShowDeleteDialog(false);
    },
    onError: (error) => {
      Alert.alert('Erro', 'Não foi possível excluir o projeto');
      console.error(error);
      setShowDeleteDialog(false);
    },
  });

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    onPressLike?.();
  };

  const handleDelete = () => {
    deleteProject(id);
  };

  const displayImage = mediaUrl || imagePath;
  const displayDescription = description || subtitle;

  return (
    <View className="w-full rounded-xl bg-white p-4 shadow-sm border border-slate-100">
      <View className="relative mb-3 h-56 w-full overflow-hidden rounded-lg bg-slate-100 items-center justify-center">
        <Image
          className="h-full w-full"
          source={displayImage}
          placeholder={mediaBlurhash || DEFAULT_BLURHASH}
          contentFit="cover"
          transition={500}
          onLoadStart={() => setIsLoadingImage(true)}
          onLoadEnd={() => setIsLoadingImage(false)}
        />

        {isLoadingImage && (
          <View className="absolute inset-0 items-center justify-center">
            <ActivityIndicator size="small" color={THEME.light.primary} />
          </View>
        )}

        {isFavoriteCard && (
          <Pressable
            onPress={handleLikePress}
            className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-white/80"
          >
            <Icon
              as={Heart}
              size={24}
              className={cn(
                'stroke-slate-900',
                isLiked && 'fill-rose-500 stroke-rose-500'
              )}
            />
          </Pressable>
        )}
        {canDelete && (
          <Pressable
            className="absolute left-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-muted"
            onPress={() => setShowDeleteDialog(true)}
          >
            <Icon as={Trash2} size={22} className="stroke-rose-600" />
          </Pressable>
        )}
      </View>

      <View className="mb-2">
        <Text className="font-bold text-lg text-slate-900">{title}</Text>
      </View>

      {displayDescription && (
        <View className="mb-4">
          <Text
            numberOfLines={3}
            className="font-regular text-sm text-slate-600"
          >
            {displayDescription}
          </Text>
        </View>
      )}

      <Button
        className="w-full flex-row items-center justify-center gap-x-2"
        onPress={onPress}
      >
        <Text>{textButton}</Text>
        <Icon as={ChevronRight} size={18} className="stroke-white" />
      </Button>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este projeto? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <Text>Cancelar</Text>
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onPress={handleDelete}
              disabled={isDeleting}
            >
              <Text>{isDeleting ? 'Excluindo...' : 'Excluir'}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
