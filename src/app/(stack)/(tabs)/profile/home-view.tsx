import Ionicons from '@expo/vector-icons/Ionicons';
import { parseISO } from 'date-fns';
import { router } from 'expo-router';
import { useCallback, useEffect, useState, memo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { CardPost, LoadingBox, Button } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { getInstituitionPosts } from 'src/services/app-core';
import { IPost } from 'src/types';

const HomeView = () => {
  const { user, getToken } = useAuth();
  const id = user.id;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const res = await getInstituitionPosts(id, token);
      setPosts(res);
      setLoadingPosts(false);
    })();
  }, []);

  const renderItem: ListRenderItem<IPost> = useCallback(({ item }) => {
    return (
      <CardPost
        key={item.id}
        userImagePath={item.institution.avatar}
        description={item.caption}
        nameInstitution={item.institution.name}
        imagePath={item.imageUrl}
        timeAgo={timeAgo(item.updatedAt)}
        isSavedInitial={false}
      />
    );
  }, []);

  function timeAgo(dateString: string): string {
    const date = parseISO(dateString);
    const now = new Date();
    const differenceInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / 60000
    );

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

  const renderHeader = () => (
    <View className="mb-3 items-center justify-center">
      <Button
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text_neutral}
          />
        }
        customStyles="justify-center space-x-2"
        onPress={() => {
          router.push({
            pathname: 'post-create',
          });
        }}
      >
        Cadastrar Nova Postagem
      </Button>
    </View>
  );

  if (loadingPosts) {
    return (
      <View className="flex-1 items-center justify-center pt-48 ">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingBox
            key={index}
            customStyle="h-56 w-full mb-2 rounded-md bg-slate-400 last:mb-0"
          />
        ))}
      </View>
    );
  }

  return (
    <View className="w-full flex-1 items-center justify-center">
      <FlatList
        className="w-full"
        removeClippedSubviews
        maxToRenderPerBatch={10}
        data={posts}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View className="mt-4 h-[2px] w-full bg-slate-200" />
        )}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default memo(HomeView);
