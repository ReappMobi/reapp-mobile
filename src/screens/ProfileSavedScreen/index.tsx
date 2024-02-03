import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  CardPost,
  HeaderStatisticsProfile,
  ScreenContainer,
} from 'src/components';
import AuthContext from 'src/contexts/auth';
import { getSavedPosts } from 'src/services/user';

function ProfileSavedScreen() {
  const { user } = useContext(AuthContext);
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    getSavedPosts().then((response) => {
      setSavedPosts(response);
    });
  });
  return (
    <ScreenContainer>
      <View className="flex-1 gap-y-4 pt-4">
        <View>
          <HeaderStatisticsProfile
            image={user.profileImage}
            name={user.name}
            donationsQty={user.donations}
            followingQty={user.following}
          />
        </View>

        <View>
          <Text className="text-center font-_medium text-xl text-color_primary">
            Salvos
          </Text>
        </View>
        {savedPosts.length === 0 ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={savedPosts}
            renderItem={({ item }) => (
              <CardPost
                imagePath={item.imagePath}
                userImagePath={item.userImagePath}
                nameInstitution={item.nameInstitution}
                description={item.description}
                timeAgo={item.timeAgo}
                isSavedInitial
              />
            )}
            ItemSeparatorComponent={() => <View className="mb-2.5" />}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

export default ProfileSavedScreen;
