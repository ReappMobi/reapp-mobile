import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  BannersContainer,
  Button,
  HeaderStatisticsProfile,
  ScreenContainer,
} from 'src/components';
import AuthContext from 'src/contexts/auth';
import { getSharedCampaigns } from 'src/services/app-core';

export default function HomeScreen() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async () => {
      const banners = await getSharedCampaigns();
      setBanners(banners);
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
          <Button customStyles="bg-color_third py-2 px-4 my-4 justify-center w-full">
            <Text className="self-center text-center font-_medium text-lg text-white">
              Doar para instituições sociais
            </Text>
          </Button>
          <View className="gap-y-2">
            <BannersContainer banners={banners} />
            <Text>List Posts</Text>
          </View>
        </View>
      </ScreenContainer>
    </View>
  );
}
