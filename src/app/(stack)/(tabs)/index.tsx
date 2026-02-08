import { router } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardPost } from '@/components/app/post/card-post';
import { useAuth } from '@/hooks/useAuth';
import { useGetPosts } from '@/services/posts/post.service';
import { IPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

function PostList() {
  const { user } = useAuth();
  const {
    data: posts,
    isLoading: loading,
    error,
    isRefetching: refreshing,
    refetch: onRefresh,
  } = useGetPosts(1);

  const handleInstitutionProfileClick = useCallback((item: IPost) => {
    router.push({
      pathname: 'institution',
      params: { id: item.institution.account.id },
    });
  }, []);

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
        <Text className="font-medium text-base">Nenhum post encontrado.</Text>
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
        mediaAspect={item.media?.fileMeta.original.aspect || 1}
        mediaBlurhash={item.media?.blurhash || ''}
        userImageUrl={item.institution?.account?.media?.remoteUrl || ''}
        userImageBlurhash={item.institution?.account?.media?.blurhash || ''}
        name={item.institution?.account?.name || ''}
        updatedAt={item.updatedAt}
        description={item.body || ''}
        isSavedInitial={isSaved}
        isLikedInitial={isLiked}
        onPressInstitutionProfile={() => handleInstitutionProfileClick(item)}
      />
    );
  };

  return (
    <FlatList
      className="flex-1"
      ListHeaderComponent={null}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={Separator}
    />
  );
}

export default function Page() {
  const { isDonor } = useAuth();

  return (
    <View className="flex-1 bg-white p-2">
      {isDonor && (
        <Button
          size="sm"
          className="mb-2 justify-center bg-tercary active:bg-tercary/80"
          onPress={() => router.push('/donate')}
        >
          <Text>Doar para instituições sociais </Text>
        </Button>
      )}

      <PostList />
    </View>
  );
}
