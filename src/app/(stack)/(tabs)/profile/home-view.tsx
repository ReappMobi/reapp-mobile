import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { memo, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardPost } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { usePostsByInstitution } from 'src/hooks/usePostsByInstitution';
import { deletePublication } from 'src/services/app-core';
import { IPost } from 'src/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

const renderHeader = () => (
  <View className="mb-3 items-center justify-center bg-white">
    <Button
      variant="outline"
      onPress={() => {
        router.push({
          pathname: 'post-create',
        });
      }}
    >
      <Text>Cadastrar Nova Postagem</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.text_neutral} />
    </Button>
  </View>
);

function PostList({ institutionId }) {
  const { user, token } = useAuth();
  const { posts, setPosts, error, loading, refreshing, onRefresh } =
    usePostsByInstitution(institutionId);

  const handleDeletePost = useCallback(
    (postId: number) => {
      if (token) {
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
              onPress: () => {
                deletePublication({ id: postId, token })
                  .then(() => {
                    setPosts((prev) =>
                      prev.filter((post) => post.id !== postId)
                    );
                  })
                  .catch((error) => {
                    Alert.alert('Erro', 'Não foi possível excluir a postagem');
                    console.error(error);
                  });
              },
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      }
    },
    [token, setPosts]
  );

  if (loading && !token) {
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
        <TouchableOpacity onPress={onRefresh}>
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
        onPressDelete={() => handleDeletePost(item.id)}
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
      ListHeaderComponent={renderHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']} // Android
          tintColor="#0000ff" // iOS
          title="Recarregando..." // iOS
        />
      }
      ItemSeparatorComponent={() => <Separator />}
    />
  );
}

const HomeView = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="w-full flex-1 items-center justify-center bg-white">
      <PostList institutionId={id} />
    </View>
  );
};

export default memo(HomeView);
