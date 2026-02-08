import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardPost } from '@/components/app/post/card-post';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import colors from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';
import {
  POSTS_PREFIX_KEY,
  useDeletePost,
  useGetPostsByInstitution,
} from '@/services/posts/post.service';
import { IPost } from '@/types';

interface PostListProps {
  institutionId: number;
  isMe?: boolean;
}

export function PostList({ institutionId, isMe }: PostListProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading: loading,
    isRefetching: refreshing,
    refetch: onRefresh,
    error,
  } = useGetPostsByInstitution(institutionId);

  const { mutate: deletePostMutation } = useDeletePost({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_PREFIX_KEY, 'institution', institutionId],
      });
    },
    onError: (error) => {
      Alert.alert('Erro', 'Não foi possível excluir a postagem');
      console.error(error);
    },
  });

  const handleDeletePost = useCallback(
    (postId: number) => {
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir esta postagem?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => deletePostMutation(postId),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    },
    [deletePostMutation]
  );

  const renderHeader = () => {
    if (!isMe) {
      return null;
    }
    return (
      <View className="mb-3 items-center justify-center bg-white">
        <Button
          variant="outline"
          onPress={() => {
            router.push({
              pathname: 'create-post',
            });
          }}
        >
          <Text>Cadastrar Nova Postagem</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text_neutral}
          />
        </Button>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem: ListRenderItem<IPost> = ({ item }) => {
    const isLiked = item.likes?.some((like) => like.accountId === user?.id);
    const isSaved = item.saves?.some((save) => save.accountId === user?.id);

    return (
      <CardPost
        postId={item.id}
        mediaUrl={item.media?.remoteUrl || ''}
        mediaBlurhash={item.media?.blurhash || ''}
        userImageUrl={item.institution?.account?.media?.remoteUrl || ''}
        userImageBlurhash={item.institution?.account?.media?.blurhash || ''}
        name={item.institution?.account?.name || ''}
        description={item.body || ''}
        updatedAt={item.updatedAt}
        isSavedInitial={isSaved}
        isLikedInitial={isLiked}
        onPressDelete={isMe ? () => handleDeletePost(item.id) : undefined}
      />
    );
  };

  return (
    <FlatList
      className="w-full"
      removeClippedSubviews
      maxToRenderPerBatch={10}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      ItemSeparatorComponent={() => <Separator />}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-medium text-base text-slate-500">
            Nenhuma postagem encontrada.
          </Text>
        </View>
      }
    />
  );
}
