import Ionicons from '@expo/vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import {
  ScreenContainer,
  Button,
  LoadingBox,
  TabViewWrapper,
} from 'src/components';
import { getCategoryById } from 'src/services/app-core';
import { IInstitution } from 'src/types';

import CollaboratorsView from './collaborators-view';
import ContactsView from './contacts-view';
import HomeView from './home-view';
import PartnerView from './partners-view';
import ProjectsView from './projects-view';
import TransparencyView from './transparency-view';
import VolunteersView from './volunteers-view';

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// TODO: Fix type in ExploreScreen
export default function InstitutionProfile({ route, navigation }) {
  const { institution } = route.params as { institution: IInstitution };
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState<number>(0);

  const [routes] = useState([
    { key: 'tab1', title: 'Início' },
    { key: 'tab2', title: 'Projetos' },
    { key: 'tab3', title: 'Transparência' },
    { key: 'tab4', title: 'Contato' },
    { key: 'tab5', title: 'Parceiros' },
    { key: 'tab6', title: 'Colaboradores' },
    { key: 'tab7', title: 'Voluntários' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tab1':
        return <HomeView institution={institution} />;
      case 'tab2':
        return <ProjectsView institution={institution} />;
      case 'tab3':
        return <TransparencyView institution={institution} />;
      case 'tab4':
        return <ContactsView institution={institution} />;
      case 'tab5':
        return <PartnerView institution={institution} />;
      case 'tab6':
        return <CollaboratorsView institution={institution} />;
      case 'tab7':
        return <VolunteersView institution={institution} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getCategoryById(institution.categoryId).then((fetchedCategory) => {
      setCategory(fetchedCategory.category);
      setLoading(false);
    });
  }, []);

  const { width } = useWindowDimensions();

  return (
    <ScreenContainer>
      <View className="flex-row items-center space-x-2">
        <Image
          className="h-16 w-16 rounded-full"
          source={institution.image}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <View className="w-full flex-1 space-y-0 pt-4">
          <Text className="font-_bold text-lg">{institution.name}</Text>
          {loading ? (
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
          ) : (
            <Text className="text-md my-2">{category}</Text>
          )}
          <View className="space-y-2">
            <Button
              textColor="text-white"
              size="small"
              customStyles="justify-center bg-color_primary"
            >
              Seguir
            </Button>
            <View className="flex-row">
              <Button
                textColor="text-white"
                size="small"
                customStyles="justify-center bg-color_primary w-20 mr-2"
                onPress={() => {
                  navigation.dispatch(StackActions.push('DonationScreen'));
                }}
              >
                Doar
              </Button>
              <Button
                startIcon={
                  <Ionicons name="chevron-forward" size={20} color="#000" />
                }
                customStyles="flex-1 justify-start items-center space-x-1"
                size="small"
                textSize="text-sm"
              >
                Quero ser voluntário
              </Button>
            </View>
          </View>
        </View>
      </View>

      {loading ? (
        <View>
          <LoadingBox customStyle="h-7 w-full mt-5 mb-3 rounded-md bg-slate-400" />
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingBox
              key={index}
              customStyle="h-56 w-full mb-2 rounded-md bg-slate-400 last:mb-0"
            />
          ))}
        </View>
      ) : (
        <TabViewWrapper
          institution={institution}
          index={index}
          setIndex={setIndex}
          routes={routes}
          width={width}
          renderScene={renderScene}
        />
      )}
    </ScreenContainer>
  );
}
