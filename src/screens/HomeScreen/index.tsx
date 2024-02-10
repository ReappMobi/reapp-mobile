import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  BannersContainer,
  Button,
  CardPost,
  HeaderStatisticsProfile,
  ScreenContainer,
} from 'src/components';
import AuthContext from 'src/contexts/auth';
import { getPosts, getSharedCampaigns } from 'src/services/app-core';

export default function HomeScreen() {
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

  const { user } = useContext(AuthContext);
  return (
    <View className="h-full bg-white">
      <ScreenContainer>
        <View className="py-4">
          <HeaderStatisticsProfile
            image={user.profileImage}
            name={user.name}
            donationsQty={user.donations}
            followingQty={user.following}
          />
          {/*FIXME: Banners don't scroll with the screen */}
          <Button customStyles="bg-color_third py-2 px-4 my-4 justify-center w-full">
            <Text className="self-center text-center font-_medium text-lg text-white">
              Doar para instituições sociais
            </Text>
          </Button>
          <View className="gap-y-2">
            {/* TODO: Post should be loaded partially */}
            <BannersContainer banners={banners} />
            {posts.length === 0 ? (
              <Text>Carregando...</Text>
            ) : (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <CardPost
                    imagePath={item.postImageUrl}
                    userImagePath={item.userImageUrl}
                    nameInstitution={item.nameInstitution}
                    description={item.description}
                    timeAgo={item.timeAgo}
                    isSavedInitial={false}
                  />
                )}
                ItemSeparatorComponent={() => <View className="mb-2.5" />}
              />
            )}
          </View>
        </View>
      </ScreenContainer>
    </View>
  );
}
