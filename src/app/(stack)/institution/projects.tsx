import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { memo, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import CardInstitutionProject from 'src/components/CardInstitutionProject';
import { useProjectsByInstitution } from 'src/hooks/useProjectsByInstitution';
import { IProject } from 'src/types';

type ProjectListProps = {
  item: IProject;
};

const ProjectItem = memo<ProjectListProps>(({ item }) => {
  const handleCardClick = useCallback((projectId: number) => {
    router.navigate({ pathname: 'project', params: { projectId } });
  }, []);
  return (
    <CardInstitutionProject
      imagePath={item.media?.remoteUrl}
      title={item.name}
      subtitle={item.subtitle}
      textButton="Ver mais detalhes"
      onPress={() => handleCardClick(item.id)}
    />
  );
});

function ProjectList({ institutionId }) {
  const { projects, token, error, loading, refreshing, onRefresh } =
    useProjectsByInstitution(institutionId);

  if (loading && !token) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const renderItem: ListRenderItem<IProject> = ({ item }) =>
    projects.length > 0 ? (
      <ProjectItem item={item} />
    ) : (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-reapp_medium text-base">
          Nenhum projeto encontrado.
        </Text>
      </View>
    );

  if (!loading && error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>

        {/* Botão para tentar novamente */}
        <TouchableOpacity onPress={onRefresh}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full"
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      ItemSeparatorComponent={() => <View className="mb-2.5" />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']} // Android
          tintColor="#0000ff" // iOS
          title="Recarregando..." // iOS
        />
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-reapp_medium text-base">
            Nenhum projeto encontrado.
          </Text>
        </View>
      }
    />
  );
}

const ProjectsView = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="flex-1 items-center justify-center">
      <ProjectList institutionId={id} />
    </View>
  );
};

export default memo(ProjectsView);
