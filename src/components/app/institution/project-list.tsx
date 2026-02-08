import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { useGetProjectsByInstitutionId } from '@/services/project/project.service';
import { ListHeeader } from './list-header';
import { ProjectCard } from './project-card';

interface ProjectListProps {
  institutionId: number;
  isMe?: boolean;
}

export function ProjectList({ institutionId, isMe }: ProjectListProps) {
  const {
    data: projects,
    isLoading: loading,
    isRefetching: refreshing,
    refetch: onRefresh,
    error,
  } = useGetProjectsByInstitutionId(institutionId);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={THEME.light.primary} />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return (
    <FlatList
      className="w-full bg-white"
      removeClippedSubviews
      maxToRenderPerBatch={10}
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProjectCard
          id={item.id}
          institutionId={institutionId}
          title={item.name}
          description={item.description}
          mediaUrl={item.media?.remoteUrl}
          mediaBlurhash={item.media?.blurhash}
          canDelete={isMe}
          onPress={() =>
            router.push({
              pathname: 'project',
              params: {
                projectId: item.id,
              },
            })
          }
        />
      )}
      ListHeaderComponent={() => (
        <ListHeeader
          isMe={isMe}
          icon={Plus}
          title="Adicionar projeto"
          onPressActionButton={() => router.push('project/create')}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[THEME.light.primary]}
          tintColor={THEME.light.primary}
        />
      }
      ItemSeparatorComponent={Separator}
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
