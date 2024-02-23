import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, ScrollView, SectionList } from 'react-native';
import {
  ScreenContainer,
  ExploreScreenCard,
  CardSearch,
  LoadingBox,
} from 'src/components';
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

type ExploreProjectsScreenProps = {
  clicked: boolean;
  searchPhrase: string;
};

const RenderCardSearch = React.memo<RenderCardSearchProps>(
  ({ item, searchPhrase, onPressCard }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameProject}
          onPress={() => {
            onPressCard(item);
          }}
        />
      );
    }

    if (
      item.nameProject
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameProject}
          onPress={() => {
            onPressCard(item);
          }}
        />
      );
    }
  }
);

const RenderItem = React.memo<RenderItemProps>(({ item, onPressCard }) => {
  return (
    <ExploreScreenCard
      title={item.nameProject}
      imageUrl={item.imageUrl}
      onPressCard={() => {
        onPressCard(item);
      }}
    />
  );
});

function ExploreProjectsScreen({
  clicked,
  searchPhrase,
}: ExploreProjectsScreenProps) {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const navigation = useNavigation();

  //TODO: put in the array if the project is one of the user's favorites
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
          projects.filter((project) => project.idCategory === category.id),
        ],
      })),
    [categories, projects]
  );

  const handleCardClick = useCallback(
    (item) => {
      navigation.dispatch(StackActions.push('ProjectPage', { project: item }));
    },
    [navigation]
  );

  if (loadingProjects) {
    return (
      <View className="pt-30 flex-1 justify-center px-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <React.Fragment key={index}>
            <LoadingBox customStyle="h-4 w-32 mb-2 mt-2 rounded-md bg-slate-400 last:mb-0" />
            <ScrollView horizontal>
              {Array.from({ length: 7 }).map((__, index2) => (
                <LoadingBox
                  key={index2}
                  customStyle="h-48 w-32 mr-2 rounded-md bg-slate-400 last:mb-0"
                />
              ))}
            </ScrollView>
          </React.Fragment>
        ))}
      </View>
    );
  }

  return (
    <>
      {!clicked && (
        <ScreenContainer>
          <SectionList
            sections={data}
            renderSectionHeader={({ section: { category, data } }) => (
              <Text className="mb-2 font-_medium text-base">
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
                getItemLayout={(data, index) => ({
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
        </ScreenContainer>
      )}

      {clicked && (
        <FlatList
          data={projects}
          renderItem={({ item }) => (
            <RenderCardSearch
              item={item}
              key={item.id}
              searchPhrase={searchPhrase}
              onPressCard={handleCardClick}
            />
          )}
        />
      )}
    </>
  );
}

export default memo(ExploreProjectsScreen);
