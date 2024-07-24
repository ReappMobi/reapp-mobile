import { useRoute } from '@react-navigation/native';
import { parseISO } from 'date-fns';
import { useCallback, useEffect, useState, memo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { CardPost, LoadingBox } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { getInstituitionPosts } from 'src/services/app-core';
import { IPost } from 'src/types';

const HomeView = () => {
  const route = useRoute();
  const { getToken } = useAuth();
  const { id } = route.params as { id: number };
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
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
      />
    </View>
  );
};

export default memo(HomeView);
