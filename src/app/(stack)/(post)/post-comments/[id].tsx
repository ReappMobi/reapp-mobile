import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
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
        },
      }
    );
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

  const renderItem = ({ item }) => (
    <View className="flex-row gap-3 px-4 py-3 border-b border-gray-50">
      <Image
        source={{ uri: item.account.media?.remoteUrl }}
        className="h-9 w-9 rounded-full bg-gray-200"
      />
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-sm text-black">
            {item.account.name}
          </Text>
          <Text className="text-xs text-gray-400">
            {timeAgo(item.createdAt.toString())}
          </Text>
        </View>
        <Text className="text-sm text-gray-800 leading-5">{item.body}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
        <Pressable onPress={() => router.dismiss()} className="-ml-2 p-2">
          <Ionicons name="arrow-back" size={26} color="black" />
        </Pressable>
        <Text className="font-bold text-base">Comentários</Text>
        <View className="w-10" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View className="flex-1">
          {loading && page === 1 ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={loadMoreComments}
              onEndReachedThreshold={0.5}
              onRefresh={refreshComments}
              refreshing={loading && page === 1}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                !loading && (
                  <View className="pt-20 items-center justify-center">
                    <Text className="text-gray-400">
                      Nenhum comentário ainda.
                    </Text>
                  </View>
                )
              }
              ListFooterComponent={
                isFetching && page > 1 ? (
                  <View className="py-4">
                    <ActivityIndicator size="small" color="#000" />
                  </View>
                ) : null
              }
            />
          )}
        </View>

        <View className="px-4 py-3 border-t border-gray-100 bg-white pb-6">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1">
            <TextInput
              placeholder={`Comentar como...`}
              placeholderTextColor="#9ca3af"
              onChangeText={setComment}
              value={comment}
              multiline
              className="flex-1 py-3 text-sm text-black max-h-24"
              textAlignVertical="center"
            />
            {comment.length > 0 && (
              <Pressable
                onPress={sendComment}
                disabled={isAddCommentLoading}
                className="ml-2"
              >
                {isAddCommentLoading ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text className="font-semibold text-primary">Publicar</Text>
                )}
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Page;
