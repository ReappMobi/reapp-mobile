import { router } from 'expo-router';
import React, { useCallback, memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, CardPost } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { usePosts } from 'src/hooks/usePosts';
import {
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from 'src/services/app-core';
import { useGetPosts } from 'src/services/posts/post.service';
import { IPost } from 'src/types';
import { timeAgo } from 'src/utils/time-ago';

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

  const handleInstitutionProfileClick = useCallback((item: IPost) => {
    router.push({
      pathname: 'institution',
      params: { id: item.institution.account.id },
    });
  }, []);

  const timeString = timeAgo(item.updatedAt);

  return (
    <CardPost
      postId={item.id}
      mediaUrl={item.media?.remoteUrl || ''}
      mediaAspect={item.media?.fileMeta.original.aspect || 1}
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
      onPressInstitutionProfile={() => handleInstitutionProfileClick(item)}
    />
  );
});

function PostList() {
  const { user, token } = useAuth();
  const {
    data: posts,
    isLoading: loading,
    error,
    isRefetching: refreshing,
    refetch: onRefresh,
  } = useGetPosts(token || '', 1);

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
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-reapp_medium text-base">
          Nenhum post encontrado.
        </Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<IPost> = ({ item }) => (
    <PostItem item={item} token={token} userId={user?.id} />
  );

  return (
    <FlatList
      className="flex-1"
      ListHeaderComponent={null}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']}
          tintColor="#0000ff"
          title="Recarregando..."
        />
      }
      ItemSeparatorComponent={() => (
        <View className="mt-4 h-[2px] w-full bg-slate-200" />
      )}
    />
  );
}

export default function Page() {
  const { isDonor } = useAuth();

  return (
    <View className="flex-1 bg-white px-2 pt-1">
      {isDonor && (
        <Button
          size="small"
          textColor="text-white"
          customStyles="mb-2 justify-center bg-third"
          onPress={() => router.push('/donate')}
        >
          Doar para instituições sociais
        </Button>
      )}

      <PostList />
    </View>
  );
}
