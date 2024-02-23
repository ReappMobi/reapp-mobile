import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import {
  ScreenContainer,
  ExploreScreenCard,
  CardSearch,
  LoadingBox,
} from 'src/components';
import Colors from 'src/constants/colors';
import { ICategory } from 'src/mocks/app-InstitutionCategory-data';
import {
  getInstituitionCategories,
  getInstitutions,
} from 'src/services/app-core';
import { IInstitution } from 'src/types';

type RenderItemProps = {
  item: IInstitution;
  onOpen: () => void;
  onPressCard: (item: any) => void;
};

type RenderCardSearchProps = {
  item: IInstitution;
  searchPhrase: string;
  onPressCard: (item: any) => void;
};

type ExploreScreenProps = {
  clicked: boolean;
  searchPhrase: string;
};

const Modal = ({ onPressInfo }) => {
  return (
    <View className="gap-y-7 p-4">
      <TouchableOpacity onPress={onPressInfo}>
        <View className="flex-row gap-x-2">
          <Ionicons name="information-circle-outline" size={24} color="white" />
          <Text className="font-_medium text-base text-text_light">
            Informações
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View className="flex-row gap-x-2">
          <Ionicons name="add" size={24} color="white" />
          <Text className="font-_medium text-base text-text_light">Seguir</Text>
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

const RenderItem = React.memo<RenderItemProps>(
  ({ item, onOpen, onPressCard }) => {
    return (
      <ExploreScreenCard
        title={item.name}
        isInstitution
        imageUrl={item.image}
        onPressInfo={onOpen}
        onPressCard={() => onPressCard(item)}
      />
    );
  }
);

const RenderCardSearch = React.memo<RenderCardSearchProps>(
  ({ item, searchPhrase, onPressCard }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.image}
          title={item.name}
          onPress={() => onPressCard(item)}
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
          onPress={() => onPressCard(item)}
        />
      );
    }
  }
);

function ExploreScreen({ clicked, searchPhrase }: ExploreScreenProps) {
  const [institutions, setInstitutions] = useState<IInstitution[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [institutionPicked, setInstitutionPicked] =
    useState<IInstitution>(null);
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

  const sections = useMemo(() => {
    return categories.map((category) => {
      return {
        title: category.category,
        data: [
          institutions.filter(
            (institution) => institution.categoryId === category.id
          ),
        ],
      };
    });
  }, [categories, institutions]);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = useCallback(
    (item) => {
      setInstitutionPicked(item);
      modalizeRef.current?.open();
    },
    [modalizeRef]
  );

  const handleCardClick = useCallback(
    (item) => {
      navigation.dispatch(
        StackActions.push('InstitutionProfile', { institution: item })
      );
    },
    [navigation]
  );

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
      {!clicked && (
        <ScreenContainer>
          <SectionList
            sections={sections}
            renderSectionHeader={({ section: { title, data } }) => (
              <Text className="mb-2 font-_medium text-base">
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
                getItemLayout={(data, index) => ({
                  length: 128,
                  offset: 140 * index,
                  index,
                })}
                renderItem={({ item }) => (
                  <RenderItem
                    item={item}
                    onOpen={() => onOpen(item)}
                    onPressCard={handleCardClick}
                  />
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
          data={institutions}
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

      <Modalize
        ref={modalizeRef}
        modalHeight={442}
        modalStyle={{ backgroundColor: Colors.color_primary }}
      >
        <Modal onPressInfo={() => handleCardClick(institutionPicked)} />
      </Modalize>
    </>
  );
}

export default memo(ExploreScreen);
