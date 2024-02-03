import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import {
  ScreenContainer,
  Header,
  CardInstitutionProject,
} from '../../components';
import Colors from '../../constants/Colors';
import { getFavoritesInstitutions } from '../../services/user';

function FavoritePage() {
  const [favoritesInstitutions, setFavoritesInstitutions] = useState([]);

  useEffect(() => {
    getFavoritesInstitutions().then((response) => {
      setFavoritesInstitutions(response);
    });
  });

  return (
    <ScreenContainer>
      <View className="flex-1 gap-y-4 pt-4">
        <Header
          leftComponent={
            <Ionicons name="chevron-back" size={24} color={Colors.text_dark} />
          }
          centerComponent={
            <View className="flex-row items-center gap-x-2">
              <Text className="font-_bold text-base">Favoritas</Text>
              <Ionicons name="heart-outline" size={27} color="black" />
            </View>
          }
        />

        <FlatList
          data={favoritesInstitutions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardInstitutionProject
              imagePath={item.imageUrl}
              title={item.nameInstitution}
              textButton="Ver"
              isFavoriteCard
            />
          )}
          ItemSeparatorComponent={() => <View className="mb-2.5" />}
        />
      </View>
    </ScreenContainer>
  );
}

export default FavoritePage;
