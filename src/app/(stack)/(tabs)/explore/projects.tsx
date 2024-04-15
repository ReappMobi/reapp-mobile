import { router } from 'expo-router';
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View, Text, FlatList, ScrollView, SectionList } from 'react-native';
import { ExploreScreenCard, CardSearch, LoadingBox } from 'src/components';
import { useSearch } from 'src/hooks/useSearch';
import { ICategory } from 'src/mocks/app-InstitutionCategory-data';
import { getProjectCategories, getProjects } from 'src/services/app-core';
import { IProject } from 'src/types';

type RenderCardSearchProps = {
  item: IProject;
  searchPhrase: string;
  onPressCard: (item: any) => void;
};

type RenderItemProps = {
  item: IProject;
  onPressCard: (item: any) => void;
};

const RenderCardSearch = memo<RenderCardSearchProps>(
  ({ item, searchPhrase, onPressCard }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.image}
          title={item.name}
          onPress={() => {
            onPressCard(item);
          }}
        />
      );
    }

    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <CardSearch
          imageUrl={item.image}
          title={item.name}
          onPress={() => {
            onPressCard(item);
          }}
        />
      );
    }
  }
);

const ProjectCardPlaceholder = memo(() => (
  <View className="pt-30 flex-1 justify-center px-4">
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

const RenderItem = memo<RenderItemProps>(({ item, onPressCard }) => {
  return (
    <ExploreScreenCard
      title={item.name}
      imageUrl={item.image}
      onPressCard={() => {
        onPressCard(item);
      }}
    />
  );
});

const ProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const { isSearchActive, searchQuery } = useSearch();

  useEffect(() => {
    (async () => {
      const projectsData = await getProjects();
      setProjects(projectsData);
      const categoriesData = await getProjectCategories();
      setCategories(categoriesData);
      setLoadingProjects(false);
    })();
  }, []);

  const data = useMemo(
    () =>
      categories.map((category) => ({
        category,
        data: [
          projects.filter((project) => project.categoryId === category.id),
        ],
      })),
    [categories, projects]
  );

  const handleCardClick = useCallback((item: IProject) => {
    router.navigate({ pathname: 'project', params: { projectId: item.id } });
  }, []);

  if (loadingProjects) {
    return <ProjectCardPlaceholder />;
  }

  return !isSearchActive ? (
    <View className="px-4">
      <SectionList
        sections={data}
        renderSectionHeader={({ section: { category, data } }) => (
          <Text className="mb-2 font-reapp_medium text-base">
            {category.category} ({data[0].length})
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
            renderItem={({ item }) => (
              <RenderItem item={item} onPressCard={handleCardClick} />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-3" />}
            className="mb-2.5"
          />
        )}
      />
    </View>
  ) : (
    <FlatList
      data={projects}
      renderItem={({ item }) => (
        <RenderCardSearch
          item={item}
          key={item.id}
          searchPhrase={searchQuery}
          onPressCard={handleCardClick}
        />
      )}
    />
  );
};

export default memo(ProjectsPage);
