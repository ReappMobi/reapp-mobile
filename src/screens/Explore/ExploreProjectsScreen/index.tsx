import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ScreenContainer,
  SearchInput,
  ExploreScreenCard,
  CardSearch,
} from 'src/components';
import { getProjectCategories, getProjects } from 'src/services/app-core';

function ExploreProjectsScreen({ navigation }) {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  //TODO: put in the array if the project is one of the user's favorites
  useEffect(() => {
    (async () => {
      const projectsData = await getProjects();
      setProjects(projectsData);
      const categoriesData = await getProjectCategories();
      setCategories(categoriesData);
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

  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const RenderItem = ({ nameProject, imageUrl }) => {
    return <ExploreScreenCard title={nameProject} imageUrl={imageUrl} />;
  };

  const RenderCardSearch = ({ item }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameProject}
          onPress={() => {}}
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
          onPress={() => {}}
        />
      );
    }
  };

  return (
    <ScrollView>
      <ScreenContainer>
        <View className="py-4">
          <SearchInput
            clicked={clicked}
            setClicked={setClicked}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />

          {/* TODO: find a better way to do this, with animation */}
          <ScrollView horizontal className="mb-4 mt-4 gap-x-2.5">
            <TouchableOpacity
              onPress={() => navigation.navigate('ExploreInstitutions')}
            >
              <Text className="font-_medium text-base text-text_neutral">
                Instituições
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="border-b border-text_neutral font-_medium text-base text-text_neutral">
                Projetos
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {!clicked &&
            data.map(({ category, data }, index) => (
              <View key={index}>
                <Text className="mb-2 font-_medium text-base">
                  {category.category} ({data.length}){' '}
                </Text>

                <FlatList
                  data={data}
                  horizontal
                  renderItem={({ item }) => (
                    <RenderItem
                      nameProject={item.nameProject}
                      imageUrl={item.imageUrl}
                    />
                  )}
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

export default ExploreProjectsScreen;
