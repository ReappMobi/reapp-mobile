import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import {
  ScreenContainer,
  SearchInput,
  ExploreScreenCard,
  CardSearch,
} from 'src/components';
import Colors from 'src/constants/Colors';
import { getCategories } from 'src/services/category';
import { getInstitutions } from 'src/services/institution';

function ExploreScreen({ navigation }) {
  const [institutions, setInstitutions] = useState([]);
  const [categories, setCategories] = useState([]);

  //TODO: put in the array if the institution is one of the user's favorites
  useEffect(() => {
    getInstitutions().then((response) => {
      setInstitutions(response);
    });
  }, []);

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  const data = useMemo(
    () =>
      categories.map((category) => ({
        category,
        data: institutions.filter(
          (institution) => institution.category === category.id
        ),
      })),
    [categories, institutions]
  );

  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const RenderItem = ({ nameInstitution, imageUrl }) => {
    return (
      <ExploreScreenCard
        nameInstitution={nameInstitution}
        isInstitution
        imageUrl={imageUrl}
        onPressInfo={onOpen}
      />
    );
  };

  const RenderCardSearch = ({ item }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameInstitution}
          onPress={() => {}}
        />
      );
    }

    if (
      item.nameInstitution
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameInstitution}
          onPress={() => {}}
        />
      );
    }
  };

  const Modal = () => {
    return (
      <View className="gap-y-7 p-4">
        <TouchableOpacity>
          <View className="flex-row gap-x-2">
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="white"
            />
            <Text className="font-_medium text-base text-text_light">
              Informações
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="flex-row gap-x-2">
            <Ionicons name="add" size={24} color="white" />
            <Text className="font-_medium text-base text-text_light">
              Seguir
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="flex-row gap-x-2">
            <Ionicons name="heart-outline" size={24} color="white" />
            <Text className="font-_medium text-base text-text_light">
              Favoritar
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="flex-row gap-x-2">
            <Ionicons name="close" size={24} color="white" />
            <Text className="font-_medium text-base text-text_light">
              Remover dos seguidos
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
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
              <TouchableOpacity>
                <Text className="border-b border-text_neutral font-_medium text-base text-text_neutral">
                  Instituições
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Text className="font-_medium text-base text-text_neutral">
                  Projetos
                </Text>
              </TouchableOpacity>
            </ScrollView>

            {!clicked && (
              <SectionList
                sections={data}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => null}
                renderSectionHeader={({ section: { category, data } }) => (
                  <>
                    <Text className="mb-2 font-_medium text-base">
                      {category.category} ({data.length}){' '}
                    </Text>
                    <FlatList
                      data={data}
                      horizontal
                      renderItem={({ item }) => (
                        <RenderItem
                          nameInstitution={item.nameInstitution}
                          imageUrl={item.imageUrl}
                        />
                      )}
                      keyExtractor={(item) => item.id.toString()}
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => <View className="w-3" />}
                      className="mb-2.5"
                    />
                  </>
                )}
              />
            )}

            {clicked && (
              <FlatList
                data={institutions}
                renderItem={RenderCardSearch}
                keyExtractor={(item) => item.id.toString()}
                className="mt-4"
              />
            )}
          </View>
        </ScreenContainer>
      </ScrollView>

      <Modalize
        ref={modalizeRef}
        modalHeight={442}
        modalStyle={{ backgroundColor: Colors.color_primary }}
      >
        <Modal />
      </Modalize>
    </>
  );
}

export default ExploreScreen;
