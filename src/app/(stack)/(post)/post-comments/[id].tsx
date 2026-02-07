import { useHeaderHeight } from '@react-navigation/elements';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from 'src/hooks/useAuth';
import { reportContent } from 'src/services/report';
import {
  COMMENTS_PREFIX_KEY,
  useAddComment,
  useGetPostComments,
} from 'src/services/comments/comments.service';
import { timeAgo } from 'src/utils/time-ago';
import { ScreenContainer } from '@/components';
import { Button } from '@/components/ui/button';
import colors from '@/constants/colors';

const Page = () => {
  const { token } = useAuth();

  const handleReportComment = useCallback(
    (commentId: number) => {
      const doReport = () => {
        Alert.prompt(
          'Denunciar comentário',
          'Descreva o motivo da denúncia:',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Enviar',
              onPress: async (reason) => {
                if (!reason?.trim()) { return; }
                try {
                  await reportContent({
                    targetType: 'COMMENT',
                    targetId: commentId,
                    reason,
                    token,
                  });
                  Alert.alert('Sucesso', 'Denúncia enviada com sucesso.');
                } catch {
                  Alert.alert('Erro', 'Não foi possível enviar a denúncia.');
                }
              },
            },
          ],
          'plain-text'
        );
      };

      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancelar', 'Denunciar comentário'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) { doReport(); }
          }
        );
      } else {
        Alert.alert('Opções', undefined, [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Denunciar comentário', onPress: doReport },
        ]);
      }
    },
    [token]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <View
        className="flex-row gap-3 px-4 py-3 border-b border-gray-50"
        onStartShouldSetResponder={() => true}
      >
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
          <Text
            className="text-sm text-gray-800 leading-5"
            onLongPress={() => handleReportComment(item.id)}
          >
            {item.body}
          </Text>
        </View>
      </View>
    ),
    [handleReportComment]
  );
  const { id } = useLocalSearchParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const headerHeight = useHeaderHeight();
  const androidHeaderHeight = useRef(headerHeight);

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

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? headerHeight : androidHeaderHeight.current
        }
        style={{ flex: 1 }}
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

        <View className="px-4 py-3 border-t border-gray-100 bg-white pb-2">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1">
            <TextInput
              placeholder={`Comentar como...`}
              placeholderTextColor="#9ca3af"
              autoFocus
              onChangeText={setComment}
              value={comment}
              multiline
              className="flex-1 py-3 text-sm text-black max-h-24"
              textAlignVertical="center"
              maxLength={200}
            />

            <Button
              onPress={sendComment}
              disabled={isAddCommentLoading || comment.length === 0}
              className="ml-2"
              variant="ghost"
            >
              {isAddCommentLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text className="font-semibold text-primary">Publicar</Text>
              )}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default Page;
