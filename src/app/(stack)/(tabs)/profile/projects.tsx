import Entypo from '@expo/vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { memo, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'src/components';
import CardInstitutionProject from 'src/components/CardInstitutionProject';
import colors from 'src/constants/colors';
import { useProjectsByInstitution } from 'src/hooks/useProjectsByInstitution';
import { deleteProject } from 'src/services/app-core';
import { IProject } from 'src/types';

type ProjectListProps = {
  item: IProject;
  token: string;
  onDelete: (projectId: number) => void;
};

const renderHeader = () => (
  <View className="mb-3 items-center justify-center">
    <Button
      startIcon={<Entypo name="plus" size={23} color={colors.text_neutral} />}
      customStyles="w-full justify-center space-x-1"
      onPress={() => {
        router.push('project/create');
      }}
    >
      Adicionar Projeto
    </Button>
  </View>
);

const ProjectItem = memo<ProjectListProps>(({ item, token, onDelete }) => {
  const handleCardClick = useCallback((projectId: number) => {
    router.navigate({ pathname: 'project', params: { projectId } });
  }, []);

  const handleDelete = useCallback(() => {
    if (token) {
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir esta postagem?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              deleteProject({ id: item.id, token })
                .then(() => onDelete(item.id))
                .catch((error) => {
                  Alert.alert('Erro', 'Não foi possível excluir a postagem');
                  console.error(error);
                });
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  }, [item.id, token, onDelete]);
  return (
    <CardInstitutionProject
      imagePath={item.media?.remoteUrl}
      title={item.name}
      subtitle={item.subtitle}
      textButton="Ver mais detalhes"
      onPress={() => handleCardClick(item.id)}
      onPressDelete={handleDelete}
    />
  );
});

function ProjectList({ institutionId }) {
  const {
    projects,
    setProjects,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  } = useProjectsByInstitution(institutionId);

  const handleDeleteProject = useCallback((projectId: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  }, []);

  if (loading && !token) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const renderItem: ListRenderItem<IProject> = ({ item }) =>
    projects.length > 0 ? (
      <ProjectItem item={item} onDelete={handleDeleteProject} token={token} />
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
      ListHeaderComponent={renderHeader}
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
