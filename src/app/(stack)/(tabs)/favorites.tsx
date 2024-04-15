import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { CardInstitutionProject } from 'src/components';
import colors from 'src/constants/colors';
import { getFavoritesProjects } from 'src/services/user';
import { IProject } from 'src/types';

const Page = () => {
  const navigation = useNavigation();

  const [favoritesProjects, setFavoritesProjects] = useState<IProject[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favoritos',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'reapp_bold',
        color: colors.color_primary,
      },
    });
    getFavoritesProjects().then((response) => {
      setFavoritesProjects(response);
    });
  }, []);

  return (
    <View className="gap-y-4">
      <FlatList
        data={favoritesProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardInstitutionProject
            imagePath={item.image}
            title={item.name}
            textButton="Ver"
            isFavoriteCard
            onPress={() =>
              router.navigate({
                pathname: 'project',
                params: { projectId: item.id },
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
      />
    </View>
  );
};

export default Page;
