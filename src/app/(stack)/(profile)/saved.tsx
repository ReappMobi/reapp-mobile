import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardPost } from '@/components/app/post/card-post';
import { useAuth } from 'src/hooks/useAuth';
import { useSavedPosts } from 'src/hooks/useSavedPosts';
import { IPost } from 'src/types';

function PostList() {
  const { user } = useAuth();
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
        institutionAccountId={item.institution?.account?.id}
      />
    );
  };

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
          <Text className="font-medium text-base">Nenhuma postagem salva.</Text>
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
