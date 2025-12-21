import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { CardInstitutionProject } from 'src/components';
import colors from 'src/constants/colors';
import {
  useGetFavoriteProjects,
  useToggleFavoriteProject,
} from 'src/services/projects/service';
import { IProject } from 'src/types';

const Page = () => {
  const navigation = useNavigation();
  const {
    data: favoritesProjects = [],
    isLoading,
    refetch,
    isRefetching,
  } = useGetFavoriteProjects();
  const { mutateAsync: toggleFavorite } = useToggleFavoriteProject();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favoritos',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'reapp_bold',
        color: colors.primary,
      },
    });
  }, [navigation]);

  const handleFavoriteClick = async (item: IProject) => {
    try {
      await toggleFavorite({ projectId: item.id });
      // The invalidation in mutation onSuccess will trigger refetch
      // but to update UI optimistically we might want to manually filter,
      // however standard react-query way is to wait for refetch.
      // Given the list is favorites, removing one will make it disappear.
    } catch (error) {
      console.error('Erro ao alternar favorito do projeto:', error);
    }
  };

  const EmptyListMessage = () => (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-center text-lg text-gray-500">
        Você ainda não tem nenhum projeto favoritado.
      </Text>
    </View>
  );

  return (
    <FlatList
      className="flex-1 gap-y-4"
      data={favoritesProjects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CardInstitutionProject
          imagePath={item.media?.remoteUrl}
          title={item.name}
          textButton="Ver"
          isFavoriteCard
          onPress={() =>
            router.navigate({
              pathname: '/project',
              params: { projectId: item.id },
            })
          }
          onPressLike={() => {
            handleFavoriteClick(item);
          }}
        />
      )}
      ItemSeparatorComponent={() => <View className="mb-2.5" />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      ListEmptyComponent={!isLoading ? EmptyListMessage : null}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default Page;
