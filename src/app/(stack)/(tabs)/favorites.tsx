import { router, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { CardInstitutionProject } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { toggleFavoriteProject } from 'src/services/app-core';
import { getFavoritesProjects } from 'src/services/user';
import { IProject } from 'src/types';

const Page = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const [favoritesProjects, setFavoritesProjects] = useState<IProject[]>([]);

  useEffect(() => {
    (async () => {
      navigation.setOptions({
        headerTitle: 'Favoritos',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'reapp_bold',
          color: colors.color_primary,
        },
      });
      const token = await auth.getToken();
      const res = await getFavoritesProjects(auth.user.id, token);
      setFavoritesProjects(res);
    })();
  }, []);

  const handleFavoriteClick = useCallback(async (item: IProject) => {
    try {
      const token = await auth.getToken();
      await toggleFavoriteProject({
        projectId: item.id,
        token,
        donorId: auth.user.id,
      });

      setFavoritesProjects((prevFavoriteProjects) => {
        return prevFavoriteProjects.filter((project) => project.id !== item.id);
      });
    } catch (error) {
      console.error('Error toggling favorite project:', error);
    }
  }, []);

  return (
    <View className="gap-y-4">
      <FlatList
        data={favoritesProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardInstitutionProject
            imagePath={item.cover}
            title={item.name}
            textButton="Ver"
            isFavoriteCard
            onPress={() =>
              router.navigate({
                pathname: 'project',
                params: { projectId: item.id },
              })
            }
            onPressLike={() => {
              handleFavoriteClick(item);
            }}
          />
        )}
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
      />
    </View>
  );
};

export default Page;
