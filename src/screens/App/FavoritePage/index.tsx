import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  ScreenContainer,
  Header,
  CardInstitutionProject,
} from 'src/components';
import { getFavoritesProjects } from 'src/services/user';
import { IProject } from 'src/types';

function FavoritePage({ navigation }) {
  const [favoritesProjects, setFavoritesProjects] = useState<IProject[]>([]);

  useEffect(() => {
    getFavoritesProjects().then((response) => {
      setFavoritesProjects(response);
    });
  }, []);

  return (
    <ScreenContainer>
      <View className="flex-1 gap-y-4 py-4 pt-4">
        <Header
          centerComponent={
            <View className="flex-row items-center gap-x-2">
              <Text className="font-_bold text-base">Favoritas</Text>
              <Ionicons name="heart-outline" size={27} color="black" />
            </View>
          }
        />

        <FlatList
          data={favoritesProjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardInstitutionProject
              imagePath={item.image}
              title={item.name}
              textButton="Ver"
              isFavoriteCard
              onPress={() => {
                navigation.dispatch(
                  StackActions.push('ProjectPage', { project: item })
                );
              }}
            />
          )}
          ItemSeparatorComponent={() => <View className="mb-2.5" />}
        />
      </View>
    </ScreenContainer>
  );
}

export default FavoritePage;
