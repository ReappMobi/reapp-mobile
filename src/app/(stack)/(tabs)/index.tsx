import { parseISO } from 'date-fns';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import { Button, CardPost, Carousel } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  getPosts,
  getSharedCampaigns,
  likePost,
  unlikePost,
} from 'src/services/app-core';
import { IPost } from 'src/types';

export default function Page() {
  const [banners, setBanners] = useState([]);
  const [posts, setPosts] = useState([]);
  const { isDonor, user } = useAuth();
  const auth = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const fetchedToken = await auth.getToken();
      setToken(fetchedToken);

      const banners = await getSharedCampaigns();
      setBanners(banners);
      const posts = await getPosts({ token: fetchedToken });
      setPosts(posts);
    })();
  }, []);

  const renderItem: ListRenderItem<IPost> = useCallback(
    ({ item }) => {
      const isLiked = item.likes.some(
        (like) => like.donor.accountId === user?.id
      );
      return (
        <CardPost
          imagePath={item.media?.url || ''}
          userImagePath={item.institution?.account?.media?.url || ''}
          nameInstitution={item.institution?.account?.name || ''}
          description={item.body || ''}
          timeAgo={timeAgo(item.updatedAt)}
          isSavedInitial={false}
          isLikedInitial={isLiked}
          onPressLike={() => likePost({ id: item.id, token })}
          onPressUnlike={() => unlikePost({ id: item.id, token })}
        />
      );
    },
    [user, token]
  );
  function timeAgo(dateString: string): string {
    const date = parseISO(dateString);
    const now = new Date();
    const differenceInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / 60000
    );
    if (differenceInMinutes <= 1) {
      return `${differenceInMinutes} minuto atrás`;
    }

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

  return (
    <View className="flex-1 bg-white px-2 pt-1">
      {!token ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          {isDonor && (
            <Button
              size="small"
              textColor="text-white"
              customStyles="mb-2 justify-center bg-color_third"
              onPress={() => router.push('/donate')}
            >
              Doar para instituições sociais
            </Button>
          )}

          <FlatList
            ListHeaderComponent={<Carousel banners={banners} />}
            data={posts}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View className="mt-4 h-[2px] w-full bg-slate-200" />
            )}
          />
        </>
      )}
    </View>
  );
}
