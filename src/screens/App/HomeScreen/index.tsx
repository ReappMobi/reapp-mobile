import { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import {
  CardPost,
  Carousel,
  HeaderStatisticsProfile,
  ScreenContainer,
} from 'src/components';
import AuthContext from 'src/contexts/auth';
import { IPost } from 'src/mocks/app-posts-data';
import { getPosts, getSharedCampaigns } from 'src/services/app-core';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [banners, setBanners] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const banners = await getSharedCampaigns();
      setBanners(banners);
      const posts = await getPosts();
      setPosts(posts);
    })();
  });

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
    <View className="flex-1 bg-white">
      <ScreenContainer>
        <HeaderStatisticsProfile
          image={user.profileImage}
          name={user.name}
          donationsQty={user.donations}
          followingQty={user.following}
        />
        <View className="my-2" />
        <FlatList
          ListHeaderComponent={<Carousel banners={banners} />}
          data={posts}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </ScreenContainer>
    </View>
  );
}
