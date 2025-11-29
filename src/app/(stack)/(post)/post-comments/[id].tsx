import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'src/hooks/useAuth';
import {
  COMMENTS_PREFIX_KEY,
  useAddComment,
  useGetPostComments,
} from 'src/services/comments/comments.service';
import { timeAgo } from 'src/utils/time-ago';

const Page = () => {
  const { token } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const queryClient = useQueryClient();
  const {
    data,
    isPending: loading,
    isFetching,
  } = useGetPostComments({
    page,
    token,
    postId: +id,
  });
  const { mutate: addCommentMutate, isPending: isAddCommentLoading } =
    useAddComment();

  useEffect(() => {
    if (!data) {
      return;
    }

    setComments((prevComments) => {
      if (page === 1) {
        return data;
      }

      const existingCommentIds = new Set(
        prevComments.map((comment) => comment.id)
      );
      const newComments = data.filter(
        (comment) => !existingCommentIds.has(comment.id)
      );

      return [...prevComments, ...newComments];
    });

    setHasMore(data.length > 0);
  }, [data, page]);

  const sendComment = () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      return;
    }

    if (comment.trim() !== '') {
      addCommentMutate(
        { token, postId: Number(id), content: trimmedComment },
        {
          onSuccess: () => {
            setPage(1);
            queryClient.invalidateQueries({
              queryKey: [COMMENTS_PREFIX_KEY, +id],
            });
            setComment('');
          },
          onError: () => {
            Alert.alert('Erro', 'Problema ao adicionar o comentário.');
            setComment('');
          },
        }
      );
    }
  };

  const loadMoreComments = () => {
    if (!loading && !isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const refreshComments = () => {
    setPage(1);
    queryClient.invalidateQueries({
      queryKey: [COMMENTS_PREFIX_KEY, +id],
    });
  };

  if ((loading || isFetching) && page === 1) {
    return (
      <SafeAreaView className="flex-1 bg-white pt-10">
        <View
          className="mb-2 flex h-12 flex-row items-center px-3"
          style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}
        >
          <Pressable onPress={() => router.dismiss()}>
            <MaterialIcons name="chevron-left" size={28} color="#646464" />
          </Pressable>

          <Text className="mt-1 flex-1 pr-5 text-center font-medium text-lg text-slate-700">
            Comentários
          </Text>
        </View>

        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <View
        className="mb-2 flex h-12 flex-row items-center px-3"
        style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}
      >
        <Pressable onPress={() => router.dismiss()}>
          <MaterialIcons name="chevron-left" size={28} color="#646464" />
        </Pressable>

        <Text className="mt-1 flex-1 pr-5 text-center font-medium text-lg text-slate-700">
          Comentários
        </Text>
      </View>

      <View className="mt-2 flex-1">
        {comments.length === 0 && !loading ? (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="font-medium text-base">
              Nenhum comentário encontrado.
            </Text>
          </View>
        ) : (
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View className="my-3 flex-row items-start gap-x-2 px-2">
                <Image
                  className="h-8 w-8 rounded-full"
                  source={{ uri: item.account.media?.remoteUrl }}
                />
                <View className="flex-1">
                  <View className="flex-row gap-x-2">
                    <Text className="font-medium text-xs">
                      {item.account.name}
                    </Text>
                  </View>
                  <Text className="text-sm">{item.body}</Text>
                  <Text className="text-xs text-gray-400">
                    {timeAgo(item.createdAt.toString())}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMoreComments}
            onEndReachedThreshold={0.5}
            onRefresh={refreshComments}
            refreshing={loading && page === 1}
            ListFooterComponent={
              isFetching && page > 1 ? (
                <ActivityIndicator size="small" color="#000" />
              ) : null
            }
          />
        )}

        <View className="h-14 flex-row items-center border-t border-gray-400 px-2">
          <Octicons name="paper-airplane" size={22} color="#646464" />
          <TextInput
            placeholder="Adicionar um novo comentário"
            onChangeText={setComment}
            value={comment}
            className="ml-2 flex-1"
          />
          <Pressable onPress={sendComment} disabled={isAddCommentLoading}>
            <Text className="text-md font-bold text-green-700">
              {isAddCommentLoading ? 'Enviando...' : 'Comentar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;
