import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Button, CardPost, Carousel } from 'src/components';
import { IPost } from 'src/mocks/app-posts-data';
import { getPosts, getSharedCampaigns } from 'src/services/app-core';

export default function Page() {
  const [banners, setBanners] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const banners = await getSharedCampaigns();
      setBanners(banners);
      const posts = await getPosts();
      setPosts(posts);
    })();
  }, []);

  const renderItem: ListRenderItem<IPost> = useCallback(
    ({ item }) => (
      <CardPost
        imagePath={item.postImageUrl}
        userImagePath={item.userImageUrl}
        nameInstitution={item.nameInstitution}
        description={item.description}
        timeAgo={item.timeAgo}
        isSavedInitial={false}
      />
    ),
    []
  );

  return (
    <View className="flex-1 bg-white px-2 pt-1">
      <Button
        size="small"
        textColor="text-white"
        customStyles="mb-2 justify-center bg-color_third"
        onPress={() => router.push('/donate')}
      >
        Doar para instituições sociais
      </Button>
      <FlatList
        ListHeaderComponent={<Carousel banners={banners} />}
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="mt-4 h-[2px] w-full bg-slate-200" />
        )}
      />
    </View>
  );
}
