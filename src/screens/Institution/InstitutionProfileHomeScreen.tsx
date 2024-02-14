import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, useWindowDimensions, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view';
import { ScreenContainer, Button, CardPost } from 'src/components';
import { getCategoryById, getPostsById } from 'src/services/app-core';
import { IInstitution, IPost } from 'src/types';

const TestRoute = () => (
  <View className="flex-1 items-center justify-center">
    <Text className="text-xl">Reapp</Text>
  </View>
);

const renderScene = SceneMap({
  tab1: TestRoute,
    tab2: () => <View />,
    tab3: () => <View />,
    tab4: () => <View />,
    tab5: () => <View />,
    tab6: () => <View />,
    tab7: () => <View />,
  });

const PlaceholderLoader = () => {
  return (
    <View className="animate-pulse">
      <View className="my-2 h-2.5 w-24 rounded-full bg-gray-300" />
    </View>
  );
};

type TabBarProps = {
  institution: IInstitution;
  activeIndexRef: React.MutableRefObject<number>;
  routes: Route[];
  width: number;
};

const TabBarComponent = memo(
  ({ institution, activeIndexRef, routes, width }: TabBarProps) => (
    <TabView
      className="mt-2"
      lazy
      navigationState={{
        index: activeIndexRef.current,
        routes,
      }}
      renderScene={renderScene(institution)}
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
          renderLabel={({ route, focused }) => (
            <Text
              className={`font-_regular text-lg text-text_neutral ${
                focused && 'text-text_primary'
              }`}
            >
              {route.title}
            </Text>
          )}
        />
      )}
    />
  )
);

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
    getCategoryById(institution.category).then((fetchedCategory) => {
      setCategory(fetchedCategory.category);
      setLoading(false);
    });
  }, [institution]);

  const { width } = useWindowDimensions();

  return (
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
            <Text className="text-md mb-2">{category}</Text>
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
      <TabBarComponent
        institution={institution}
        activeIndexRef={activeIndexRef}
        routes={routes}
        width={width}
      />
    </ScreenContainer>
  );
}
