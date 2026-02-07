import { router } from 'expo-router';
import { FlatList, RefreshControl, SectionList, View } from 'react-native';

import { ScreenContainer } from '@/components';
import { ExplorerLoadingPlaceholder } from '@/components/app/explore/explore-loading-placeholder';
import { ExploreProjectCard } from '@/components/app/explore/explore-project-card';
import { ExploreSearchItem } from '@/components/app/explore/explore-search-item';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useSearch } from '@/hooks/use-search';
import { THEME } from '@/lib/theme';
import { useGetProjects } from '@/services/project/project.service';

export default function Page() {
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    refetch,
    isPending,
  } = useGetProjects();
  const { isSearchActive, searchQuery } = useSearch();

  const categories = Array.from(
    new Map(
      projects.map((proj) => [
        proj.category.id,
        { id: proj.category.id, name: proj.category.name },
      ])
    ).values()
  ) as { id: number; name: string }[];

  const sections = categories.map((category) => ({
    title: category.name,
    data: [
      projects.filter((project) => project.category.name === category.name),
    ],
  }));

  const filteredProjects = projects.filter((proj) =>
    proj.name
      .toUpperCase()
      .trim()
      .replace(/\s/g, '')
      .includes(searchQuery.toUpperCase().trim().replace(/\s/g, ''))
  );

  if (isLoadingProjects) {
    return <ExplorerLoadingPlaceholder />;
  }

  if (isSearchActive) {
    return (
      <ScreenContainer>
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExploreSearchItem
              type="project"
              blurhash={item.media?.blurhash}
              image={item.media?.remoteUrl}
              title={item.name}
              onPress={() =>
                router.push({
                  pathname: 'project',
                  params: { projectId: item.id },
                })
              }
            />
          )}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center p-6">
              <Text variant="large">Nenhum resultado encontrado.</Text>
            </View>
          }
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="pt-4">
      <SectionList
        sections={sections}
        renderSectionHeader={({ section: { title, data } }) => (
          <Text className="mb-2">
            {title} ({data[0].length})
          </Text>
        )}
        renderItem={({ item }) => (
          <FlatList
            data={item}
            horizontal
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={3}
            renderItem={({ item }) => (
              <View className="mx-1">
                <ExploreProjectCard
                  title={item.name}
                  image={item.media?.remoteUrl}
                  placeholder={item.media?.blurhash}
                  id={item.id}
                  isFavorite={item.isFavorite}
                  categoryName={item.category.name}
                />
              </View>
            )}
            keyExtractor={(project) => project.id.toString()}
            showsHorizontalScrollIndicator={false}
            className="mb-2.5"
          />
        )}
        keyExtractor={(_item, index) => `section-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={refetch}
            colors={[THEME['light'].primary]}
            tintColor={THEME['light'].primary}
          />
        }
      />
    </ScreenContainer>
  );
}
