import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';

import { CardPost } from '@/components/app/post/card-post';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { THEME } from '@/lib/theme';
import { useGetPostsByInstitution } from '@/services/posts/post.service';
import { IPost } from '@/types';
import { ListHeeader } from './list-header';

interface PostListProps {
  institutionId: number;
  isMe?: boolean;
}

export function PostList({ institutionId, isMe }: PostListProps) {
  const { user } = useAuth();

  const {
    data: posts,
    isLoading: loading,
    isRefetching: refreshing,
    refetch: onRefresh,
    error,
  } = useGetPostsByInstitution(institutionId);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={THEME.light.primary} />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </ScreenContainer>
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
      ListHeaderComponent={() => (
        <ListHeeader
          icon={ChevronRight}
          title="Adicionar post"
          isMe={isMe}
          onPressActionButton={() =>
            router.push({
              pathname: 'create-post',
            })
          }
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[THEME.light.primary]}
        />
      }
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-medium text-base">
            Nenhuma postagem encontrada.
          </Text>
        </View>
      }
    />
  );
}
