import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {
  ScreenContainer,
  ExploreScreenCard,
  CardSearch,
  LoadingBox,
} from 'src/components';
import { getProjectCategories, getProjects } from 'src/services/app-core';

function ExploreProjectsScreen({ clicked, searchPhrase }) {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
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
        data: projects.filter((project) => project.idCategory === category.id),
      })),
    [categories, projects]
  );

  const RenderItem = ({ item }) => {
    return (
      <ExploreScreenCard
        title={item.nameProject}
        imageUrl={item.imageUrl}
        onPressCard={() => {
          handleCardClick(item);
        }}
      />
    );
  };

  const handleCardClick = (item) => {
    navigation.dispatch(StackActions.push('ProjectPage', { project: item }));
  };

  const RenderCardSearch = ({ item }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameProject}
          onPress={() => {
            handleCardClick(item);
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
            handleCardClick(item);
          }}
        />
      );
    }
  };

  if (loadingProjects) {
    return (
      <View className="pt-30 flex-1 justify-center px-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Mantenha o LoadingBox original se ele deveria estar sozinho e acima dos outros */}
            <LoadingBox customStyle="h-4 w-32 mb-2 mt-2 rounded-md bg-slate-400 last:mb-0" />
            {/* Novo contêiner View para os LoadingBox internos, com estilo flex row */}
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
    <ScrollView>
      <ScreenContainer>
        <View className="pb-4">
          {!clicked &&
            data.map(({ category, data }, index) => (
              <View key={index}>
                <Text className="mb-2 font-_medium text-base">
                  {category.category} ({data.length}){' '}
                </Text>

                <FlatList
                  data={data}
                  horizontal
                  renderItem={({ item }) => <RenderItem item={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  className="mb-2.5"
                />
              </View>
            ))}

          {clicked &&
            projects.map((item) => (
              <RenderCardSearch item={item} key={item.id} />
            ))}
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

export default memo(ExploreProjectsScreen);
