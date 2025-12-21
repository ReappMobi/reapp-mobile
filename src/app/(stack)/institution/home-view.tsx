import { useRoute } from '@react-navigation/native';
import { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardPost } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { usePostsByInstitution } from 'src/hooks/usePostsByInstitution';
import { IPost } from 'src/types';
import { Separator } from '@/components/ui/separator';

function PostList({ institutionId }) {
  const { user } = useAuth();
  const { posts, error, loading, refreshing, onRefresh } =
    usePostsByInstitution(institutionId);

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
        <Text>{error.message}</Text>

        {/* Botão para tentar novamente */}
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem: ListRenderItem<IPost> = ({ item }) => {
    const isLiked = item.likes?.some((like) => like.accountId === user?.id);
    const isSaved = item.saves?.some((save) => save.accountId === user?.id);
    return posts.length > 0 ? (
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
    ) : (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-medium text-base">Nenhum post encontrado.</Text>
      </View>
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']} // Android
          tintColor="#0000ff" // iOS
          title="Recarregando..." // iOS
        />
      }
      ItemSeparatorComponent={Separator}
    />
  );
}

const HomeView = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="w-full bg-white flex-1 items-center justify-center">
      <PostList institutionId={id} />
    </View>
  );
};

export default memo(HomeView);
