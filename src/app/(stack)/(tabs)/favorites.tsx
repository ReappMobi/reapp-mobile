import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { FlatList, RefreshControl, View } from 'react-native';
import { ProjectCard } from '@/components/app/institution/project-card';
import { Text } from '@/components/ui/text';
import {
  GET_FAVORITE_PROJECTS_KEY,
  useGetFavoriteProjects,
  useToggleFavoriteProject,
} from '@/services/project/project.service';
import { IProject } from '@/types';

export default function Page() {
  const queryClient = useQueryClient();

  const {
    data: favoritesProjects,
    isLoading,
    isRefetching,
    refetch,
  } = useGetFavoriteProjects();

  const { mutate: toggleFavorite } = useToggleFavoriteProject({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_FAVORITE_PROJECTS_KEY] });
    },
  });

  const handleFavoriteClick = (item: IProject) => {
    toggleFavorite(item.id);
  };

  const EmptyListMessage = () => (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-center text-lg text-gray-500">
        {!isLoading && 'Você ainda não tem nenhum projeto favoritado.'}
      </Text>
    </View>
  );

  return (
    <FlatList
      className="flex-1 gap-y-4 bg-white"
      data={favoritesProjects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProjectCard
          id={item.id}
          mediaUrl={item.media?.remoteUrl}
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
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      ListEmptyComponent={EmptyListMessage}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
}
