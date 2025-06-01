import { router, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
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
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      const token = await auth.getToken();
      const res = await getFavoritesProjects(auth.user.id, token);
      setFavoritesProjects(res);
    } catch (error) {
      console.error('Erro ao atualizar projetos favoritos:', error);
    } finally {
      setRefreshing(false);
    }
  }, [auth]);

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
      try {
        const token = await auth.getToken();
        const res = await getFavoritesProjects(auth.user.id, token);
        setFavoritesProjects(res);
      } catch (error) {
        console.error('Erro ao buscar projetos favoritos:', error);
      }
    })();
  }, [navigation, auth]);

  const handleFavoriteClick = useCallback(
    async (item: IProject) => {
      try {
        const token = await auth.getToken();
        await toggleFavoriteProject({
          projectId: item.id,
          token,
        });

        setFavoritesProjects((prevFavoriteProjects) => {
          return prevFavoriteProjects.filter(
            (project) => project.id !== item.id
          );
        });
      } catch (error) {
        console.error('Erro ao alternar favorito do projeto:', error);
      }
    },
    [auth]
  );

  // Componente para exibir quando a lista estiver vazia
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
          imagePath={item.media.remoteUrl}
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={EmptyListMessage}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default Page;
