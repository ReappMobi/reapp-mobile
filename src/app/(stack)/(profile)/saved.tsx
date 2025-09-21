import { parseISO } from 'date-fns';
import { memo, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardPost } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { useSavedPosts } from 'src/hooks/useSavedPosts';
import {
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from 'src/services/app-core';
import type { IPost } from 'src/types';

type PostItemProps = {
  item: IPost;
  token: string | null;
  userId?: string | number;
};

const PostItem = memo<PostItemProps>(({ item, token, userId }) => {
  const isLiked = item.likes?.some((like) => like.accountId === userId);
  const isSaved = item.saves?.some((save) => save.accountId === userId);
  const handleLike = useCallback(() => {
    if (token) {
      likePost({ id: item.id, token });
    }
  }, [item.id, token]);

  const handleUnlike = useCallback(() => {
    if (token) {
      unlikePost({ id: item.id, token });
    }
  }, [item.id, token]);

  const handleSave = useCallback(() => {
    if (token) {
      savePost({ id: item.id, token });
    }
  }, [item.id, token]);

  const handleUnsave = useCallback(() => {
    if (token) {
      unsavePost({ id: item.id, token });
    }
  }, [item.id, token]);

  const timeString = timeAgo(item.updatedAt);

  return (
    <CardPost
      postId={item.id}
      mediaUrl={item.media?.remoteUrl || ''}
      mediaBlurhash={item.media?.blurhash || ''}
      userImageUrl={item.institution?.account?.media?.remoteUrl || ''}
      userImageBlurhash={item.institution?.account?.media?.blurhash || ''}
      nameInstitution={item.institution?.account?.name || ''}
      description={item.body || ''}
      timeAgo={timeString}
      isSavedInitial={isSaved}
      isLikedInitial={isLiked}
      onPressLike={handleLike}
      onPressUnlike={handleUnlike}
      onPressSave={handleSave}
      onPressUnSave={handleUnsave}
    />
  );
});

function timeAgo(dateString: string): string {
  const date = parseISO(dateString);

  const now = new Date();
  const differenceInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / 60000
  );

  if (differenceInMinutes <= 1) {
    return `${differenceInMinutes} minuto atrás`;
  }

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutos atrás`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} horas atrás`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 30) {
    if (differenceInDays === 1) {
      return `${differenceInDays} dia atrás`;
    }
    return `${differenceInDays} dias atrás`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);
  if (differenceInMonths < 12) {
    return `${differenceInMonths} meses atrás`;
  }

  const differenceInYears = Math.floor(differenceInMonths / 12);
  return `${differenceInYears} anos atrás`;
}

function PostList() {
  const { user, token } = useAuth();
  const { posts, loading, error, refreshing, onRefresh } = useSavedPosts();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!loading && error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error?.message || 'Ocorreu um erro ao carregar os posts'}</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem: ListRenderItem<IPost> = ({ item }) => (
    <PostItem item={item} token={token} userId={user?.id} />
  );

  return (
    <FlatList
      className="flex-1"
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']} // Android
          tintColor="#0000ff" // iOS
          title="Recarregando..." // iOS
        />
      }
      ItemSeparatorComponent={() => (
        <View className="mt-4 h-[2px] w-full bg-slate-200" />
      )}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-reapp_medium text-base">
            Nenhuma postagem salva.
          </Text>
        </View>
      }
    />
  );
}

const SavedPage = () => {
  return (
    <View className="flex-1 px-2 pb-12">
      <PostList />
    </View>
  );
};

export default SavedPage;
