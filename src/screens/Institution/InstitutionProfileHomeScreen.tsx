import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ScreenContainer, Button } from 'src/components';
import { ICategory } from 'src/mocks/app-InstitutionCategory-data';
import { getCategoryById } from 'src/services/app-core';
import { IInstitution } from 'src/types';

const TestRoute = () => (
  <View className="flex-1 items-center justify-center">
    <Text className="text-xl">Reapp</Text>
  </View>
);

const renderScene = SceneMap({
  tab1: TestRoute,
  tab2: TestRoute,
  tab3: TestRoute,
  tab4: TestRoute,
  tab5: TestRoute,
  tab6: TestRoute,
  tab7: TestRoute,
});

const PlaceholderLoader = () => {
  return (
    <View className="animate-pulse">
      <View className="my-2 h-2.5 w-24 rounded-full bg-gray-300" />
    </View>
  );
};

// TODO: Fix type in ExploreScreen
export default function InstitutionProfileHomeScreen({ route }) {
  const { institution } = route.params as { institution: IInstitution };
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const activeIndexRef = useRef(0);

  const [routes] = useState([
    { key: 'tab1', title: 'Início' },
    { key: 'tab2', title: 'Projetos' },
    { key: 'tab3', title: 'Transparência' },
    { key: 'tab4', title: 'Contato' },
    { key: 'tab5', title: 'Parceiros' },
    { key: 'tab6', title: 'Colaboradores' },
    { key: 'tab7', title: 'Voluntários' },
  ]);

  useEffect(() => {
    if (!institution) return;
    if (!loading) return;
    // TODO: Fix type in getCategoryById
    getCategoryById(institution.category).then((category: ICategory) => {
      setCategory(category.category);
      setLoading(false);
    });
  });

  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-white">
      <ScreenContainer>
        <View className="flex-row items-center space-x-2">
          <Image
            className="h-16 w-16 rounded-full"
            source={{ uri: institution.imageUrl }}
          />
          <View className="w-full flex-1 space-y-0 pt-4">
            <Text className="font-_bold text-lg">
              {institution.nameInstitution}
            </Text>
            {loading ? (
              <PlaceholderLoader />
            ) : (
              <Text className="text-md mb-1">{category}</Text>
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
        <TabView
          className="mt-2"
          lazy
          navigationState={{ index: activeIndexRef.current, routes }}
          renderScene={renderScene}
          onIndexChange={(index) => (activeIndexRef.current = index)}
          initialLayout={{ height: 0, width }}
          style={{ backgroundColor: 'transparent' }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              scrollEnabled
              pressColor="transparent"
              labelStyle={{ padding: 0, margin: 0, width: 0 }}
              indicatorStyle={{ backgroundColor: 'transparent', width: 0 }}
              style={{
                shadowColor: 'transparent',
                margin: 0,
                padding: 0,
                backgroundColor: 'transparent',
              }}
              bounces
              tabStyle={{
                height: 'auto',
                width: 'auto',
                margin: 0,
                paddingLeft: 8,
                paddingRight: 8,
              }}
              renderLabel={({ route, focused }) => {
                return (
                  <Text
                    className={`font-_regular text-lg text-text_neutral ${
                      focused && 'text-text_primary'
                    }`}
                  >
                    {route.title}
                  </Text>
                );
              }}
            />
          )}
        />
      </ScreenContainer>
    </View>
  );
}
