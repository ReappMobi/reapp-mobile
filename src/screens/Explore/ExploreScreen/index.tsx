import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import {
  ScreenContainer,
  ExploreScreenCard,
  CardSearch,
  LoadingBox,
} from 'src/components';
import Colors from 'src/constants/Colors';
import {
  getInstituitionCategories,
  getInstitutions,
} from 'src/services/app-core';

function ExploreScreen({ clicked, searchPhrase }) {
  const [institutions, setInstitutions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const navigation = useNavigation();

  //TODO: put in the array if the institution is one of the user's favorites
  useEffect(() => {
    (async () => {
      const institutionsData = await getInstitutions();
      setInstitutions(institutionsData);
      const categoriesData = await getInstituitionCategories();
      setCategories(categoriesData);
      setLoadingInstitutions(false);
    })();
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

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const RenderItem = ({ item }) => {
    return (
      <ExploreScreenCard
        title={item.nameInstitution}
        isInstitution
        imageUrl={item.imageUrl}
        onPressInfo={onOpen}
        onPressCard={() => handleCardClick(item)}
      />
    );
  };

  const handleCardClick = (item) => {
    navigation.dispatch(
      StackActions.push('InstitutionProfile', { institution: item })
    );
  };

  const RenderCardSearch = ({ item }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.imageUrl}
          title={item.nameInstitution}
          onPress={() => handleCardClick(item)}
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
          onPress={() => handleCardClick(item)}
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

  if (loadingInstitutions) {
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
              institutions.map((item) => (
                <RenderCardSearch item={item} key={item.id} />
              ))}
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

export default memo(ExploreScreen);
