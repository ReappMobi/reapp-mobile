import { router } from 'expo-router';
import React, { Fragment, memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  View,
} from 'react-native';
import { CardSearch, ExploreScreenCard, LoadingBox } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { useSearch } from 'src/hooks/useSearch';
import {
  useGetProjects,
  useToggleFavoriteProject,
} from 'src/services/projects/service';
import { IBanner, IProject } from 'src/types';

/**
 * --------------------------------------------------------------
 * 1. CUSTOM HOOK: useProjects
 *    - Centraliza o fetching de dados (projects, banners), loading, erro.
 * --------------------------------------------------------------
 */
function useProjects() {
  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetProjects();

  const categories = useMemo(() => {
    return Array.from(
      new Map(
        projects.map((proj: IProject) => [
          proj.category.id,
          { id: proj.category.id, name: proj.category.name },
        ])
      ).values()
    ) as Record<string, any>[];
  }, [projects]);

  const banners: IBanner[] = [];

  return {
    projects,
    categories,
    banners,
    loading: isLoading,
    error: error as Error,
    refreshing: isRefetching,
    onRefresh: refetch,
  };
}

/**
 * --------------------------------------------------------------
 * 2. PLACEHOLDER (Skeleton) enquanto carrega
 * --------------------------------------------------------------
 */
const ProjectCardPlaceholder = memo(() => (
  <View className="pt-30 flex-1 justify-center px-4">
    <View className="items-center">
      <LoadingBox customStyle="w-10/12 h-52 rounded-md bg-slate-400 last:mb-0" />
    </View>
    {Array.from({ length: 3 }).map((_, index) => (
      <Fragment key={index}>
        <LoadingBox customStyle="h-4 w-32 mb-2 mt-2 rounded-md bg-slate-400 last:mb-0" />
        <ScrollView horizontal>
          {Array.from({ length: 7 }).map((__, index2) => (
            <LoadingBox
              key={index2}
              customStyle="h-48 w-32 mr-2 rounded-md bg-slate-400 last:mb-0"
            />
          ))}
        </ScrollView>
      </Fragment>
    ))}
  </View>
));

/**
 * --------------------------------------------------------------
 * 3. LISTA DE BUSCA (FlatList)
 *    - Filtrando projetos por `searchPhrase` e mostrando `CardSearch`
 * --------------------------------------------------------------
 */
type RenderCardSearchProps = {
  item: IProject;
  searchPhrase: string;
  onPressCard: (item: IProject) => void;
};

const RenderCardSearch = memo<RenderCardSearchProps>(
  ({ item, searchPhrase, onPressCard }) => {
    const matchSearch = useMemo(() => {
      if (!searchPhrase) {
        return true;
      }
      const normalized = (str: string) =>
        str.toUpperCase().trim().replace(/\s/g, '');
      return normalized(item.name).includes(normalized(searchPhrase));
    }, [item.name, searchPhrase]);

    if (!matchSearch) {
      return null;
    }

    return (
      <CardSearch
        imageUrl={item.media?.remoteUrl}
        title={item.name}
        onPress={() => onPressCard(item)}
      />
    );
  }
);

/**
 * --------------------------------------------------------------
 * 4. LISTA PRINCIPAL DE CARDS (para SectionList)
 * --------------------------------------------------------------
 */
type RenderItemProps = {
  item: IProject;
  onPressCard: (item: IProject) => void;
  onPressFavorite: (item: IProject) => void;
  isDonor: boolean;
};

const RenderItem = memo<RenderItemProps>(
  ({ item, onPressCard, onPressFavorite, isDonor }) => {
    return (
      <ExploreScreenCard
        title={item.name}
        imageUrl={item.media?.remoteUrl}
        onPressCard={() => onPressCard(item)}
        onPressFavorite={isDonor ? () => onPressFavorite(item) : undefined}
        isFavoritedInitial={isDonor ? item.isFavorite : undefined}
      />
    );
  }
);

/**
 * --------------------------------------------------------------
 * 6. LISTA PRINCIPAL (SectionList) - Montagem e renderização
 * --------------------------------------------------------------
 */
type ProjectsSectionListProps = {
  banners: IBanner[];
  categories: Record<string, any>[];
  projects: IProject[];
  isDonor: boolean;
  onPressCard: (item: IProject) => void;
  onPressFavorite: (item: IProject) => void;
  refreshing: boolean;
  onRefresh: () => void;
};

const ProjectsSectionList = memo<ProjectsSectionListProps>(
  ({
    projects,
    isDonor,
    onPressCard,
    onPressFavorite,
    refreshing,
    onRefresh,
    categories,
  }) => {
    const data = useMemo(() => {
      return categories.map((category) => ({
        category,
        data: [projects.filter((p) => p.category.id === category.id)],
      }));
    }, [categories, projects]);

    return (
      <View className="px-4">
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ff0000']} // Android
              tintColor="#0000ff" // iOS
              title="Recarregando..." // iOS
            />
          }
          sections={data}
          renderSectionHeader={({ section: { category, data } }) => (
            <Text className="mb-2 font-medium text-base">
              {category.name} ({data[0].length})
            </Text>
          )}
          renderItem={({ item }) => (
            <FlatList
              data={item}
              horizontal
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={3}
              getItemLayout={(_, index) => ({
                length: 128,
                offset: 140 * index,
                index,
              })}
              renderItem={({ item: project }) => (
                <RenderItem
                  item={project}
                  onPressCard={onPressCard}
                  onPressFavorite={onPressFavorite}
                  isDonor={isDonor}
                />
              )}
              keyExtractor={(p) => p.id.toString()}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-3" />}
              className="mb-2.5"
            />
          )}
        />
      </View>
    );
  }
);

/**
 * --------------------------------------------------------------
 * 7. LISTA DE BUSCA (FlatList) - Montagem e renderização
 *    Caso a busca esteja ativa
 * --------------------------------------------------------------
 */
type ProjectsSearchListProps = {
  projects: IProject[];
  searchQuery: string;
  onPressCard: (item: IProject) => void;
};

const ProjectsSearchList = memo<ProjectsSearchListProps>(
  ({ projects, searchQuery, onPressCard }) => {
    const filteredProjects = useMemo(() => {
      if (!searchQuery) {
        return projects;
      }
      const norm = (str: string) => str.toUpperCase().trim().replace(/\s/g, '');
      return projects.filter((project) =>
        norm(project.name).includes(norm(searchQuery))
      );
    }, [projects, searchQuery]);

    if (filteredProjects.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-medium">Nenhum resultado encontrado.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RenderCardSearch
            item={item}
            searchPhrase={searchQuery}
            onPressCard={onPressCard}
          />
        )}
      />
    );
  }
);

/**
 * --------------------------------------------------------------
 * 8. COMPONENTE PRINCIPAL: ProjectsPage
 *    - Gerencia estado de busca, exibe placeholders, erros, etc.
 * --------------------------------------------------------------
 */
const ProjectsPage = () => {
  const {
    projects,
    categories,
    banners,
    loading,
    error,
    refreshing,
    onRefresh,
  } = useProjects();
  const auth = useAuth();
  const { isSearchActive, searchQuery } = useSearch();
  const { mutateAsync: toggleFavorite } = useToggleFavoriteProject();

  const handleCardClick = useCallback((item: IProject) => {
    router.push({ pathname: '/project', params: { projectId: item.id } });
  }, []);

  const handleFavoriteClick = useCallback(
    async (item: IProject) => {
      try {
        await toggleFavorite({ projectId: item.id });
      } catch (error) {
        console.error('Error toggling favorite project:', error);
      }
    },
    [toggleFavorite]
  );

  if (loading && !error) {
    return <ProjectCardPlaceholder />;
  }

  if (!loading && error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!loading && projects.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 font-medium text-base">
          Nenhum projeto encontrado.
        </Text>
      </View>
    );
  }

  return !isSearchActive ? (
    <ProjectsSectionList
      banners={banners}
      categories={categories}
      projects={projects}
      isDonor={auth.isDonor}
      onPressCard={handleCardClick}
      onPressFavorite={handleFavoriteClick}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  ) : (
    <ProjectsSearchList
      projects={projects}
      searchQuery={searchQuery}
      onPressCard={handleCardClick}
    />
  );
};

export default memo(ProjectsPage);
