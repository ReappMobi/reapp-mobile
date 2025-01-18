import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Alert, Pressable, SafeAreaView } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useAuth } from 'src/hooks/useAuth';
import { addComment, getPostComments } from 'src/services/post';
import { timeAgo } from 'src/utils/time-ago';

const Page = () => {
  const { token } = useAuth();

  const { id } = useLocalSearchParams<{ id: string }>();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState('');

  const fetchPostComments = async () => {
    setLoading(true);
    try {
      const comments = await getPostComments(+id, token, page);
      setComments([...comments]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao buscar os comentários da postagem', error.message);
    } finally {
      setLoading(false);
      setPage(page);
    }
  };

  const sendComment = async () => {
    if (!comment) {
      return;
    }
    try {
      await addComment(+id, token, comment);
      setComment('');
      fetchPostComments();
    } catch (error) {
      Alert.alert('Erro ao adicionar um comentário', error.message);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white pt-6">
      <View
        className="mb-2 flex h-12  flex-row items-center px-3"
        style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}
      >
        <Pressable onPress={() => router.dismiss()}>
          <MaterialIcons name="chevron-left" size={28} color="#646464" />
        </Pressable>

        <Text className="mt-1 flex-1 text-center font-reapp_medium text-lg text-slate-700">
          Comentários
        </Text>
      </View>
      <View className="mt-2 flex-1">
        {comments.length === 0 ? (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="font-reapp_medium text-base">
              Nenhum comentário encontrado.
            </Text>
          </View>
        ) : (
          <FlatList
            data={comments}
            onEndReached={fetchPostComments}
            renderItem={({ item }) => (
              <View className="my-3 flex-row items-start space-x-2 px-2">
                <Image
                  className="h-8 w-8 rounded-full"
                  source={{ uri: item.account.media?.remoteUrl }}
                />
                <View className="flex-1">
                  <View className="flex-row space-x-2 ">
                    <Text className="text-xs font-bold">
                      {item.account.name}
                    </Text>
                  </View>
                  <Text className="text-sm">{item.body}</Text>
                  <Text className="text-xs text-gray-400">
                    {timeAgo(item.createdAt)}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={fetchPostComments}
            refreshing={loading}
          />
        )}
        <View className="flex-row items-center border-t  border-gray-400 px-2 pb-2">
          <Octicons name="paper-airplane" size={22} color="#646464" />
          <TextInput
            placeholder="Adicionar um novo comentário"
            onChangeText={setComment}
            value={comment}
            className="ml-2 flex-1"
          />
          <Pressable onPress={() => sendComment()}>
            <Text className="text-md font-bold text-green-700"> Comentar </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;
