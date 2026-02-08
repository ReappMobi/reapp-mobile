import Entypo from '@expo/vector-icons/Entypo';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import colors from '@/constants/colors';
import {
  GET_PROJECTS_BY_INSTITUTION_ID_KEY,
  useDeleteProject,
  useGetProjectsByInstitutionId,
} from '@/services/project/project.service';
import { IProject } from '@/types';
import { ProjectCard } from './project-card';

interface ProjectListProps {
  institutionId: number;
  isMe?: boolean;
}

interface ProjectItemProps {
  item: IProject;
  onDelete?: (projectId: number) => void;
  isMe?: boolean;
}

function ProjectItem({ item, onDelete, isMe }: ProjectItemProps) {
  const handleDelete = useCallback(() => {
    if (onDelete) {
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
            onPress: () => onDelete(item.id),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  }, [item.id, onDelete]);

  return (
    <ProjectCard
      key={item.id}
      id={item.id}
      title={item.name}
      description={item.description}
      mediaUrl={item.media?.remoteUrl}
      mediaBlurhash={item.media?.blurhash}
      onPressDelete={isMe ? handleDelete : undefined}
    />
  );
}

export function ProjectList({ institutionId, isMe }: ProjectListProps) {
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading: loading,
    isRefetching: refreshing,
    refetch: onRefresh,
    error,
  } = useGetProjectsByInstitutionId(institutionId);

  const { mutate: deleteProjectMutation } = useDeleteProject({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_PROJECTS_BY_INSTITUTION_ID_KEY, institutionId],
      });
    },
    onError: (error) => {
      Alert.alert('Erro', 'Não foi possível excluir o projeto');
      console.error(error);
    },
  });

  const handleDeleteProject = useCallback(
    (projectId: number) => {
      deleteProjectMutation(projectId);
    },
    [deleteProjectMutation]
  );

  const renderHeader = () => {
    if (!isMe) {
      return null;
    }
    return (
      <View className="mb-3 items-center justify-center">
        <Button
          variant="outline"
          className="w-full"
          onPress={() => {
            router.push('project/create');
          }}
        >
          <Entypo name="plus" size={23} color={colors.text_neutral} />
          <Text>Adicionar Projeto</Text>
        </Button>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem: ListRenderItem<IProject> = ({ item }) => (
    <ProjectItem item={item} onDelete={handleDeleteProject} isMe={isMe} />
  );

  return (
    <FlatList
      className="w-full bg-white"
      removeClippedSubviews
      maxToRenderPerBatch={10}
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      ItemSeparatorComponent={() => <Separator />}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-medium text-base text-slate-500">
            Nenhum projeto encontrado.
          </Text>
        </View>
      }
    />
  );
}
