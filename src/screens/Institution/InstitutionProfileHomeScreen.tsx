import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, useWindowDimensions, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view';
import { ScreenContainer, Button, CardPost, LoadingBox } from 'src/components';
import { getCategoryById, getPostsById } from 'src/services/app-core';
import { IInstitution, IPost } from 'src/types';

const Home = ({ institution }: { institution: IInstitution }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    getPostsById(institution.id).then((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoadingPosts(false);
      loaded.current = true;
    });
  }, []);

  // Use useMemo to memoize the mapped posts for better performance
  const memoizedPosts = useMemo(() => {
    return posts.map((item) => (
      <CardPost
        key={item.id}
        userImagePath={institution.imageUrl}
        description={item.content}
        imagePath={item.media}
        timeAgo={item.createdAt}
        isSavedInitial={false}
      />
    ));
  }, [posts]);

  if (loadingPosts) {
    return (
      <View className="flex-1 items-center justify-center pt-48 ">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingBox
            key={index}
            customStyle="h-56 w-full mb-2 rounded-md bg-slate-400 last:mb-0"
          />
        ))}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={memoizedPosts}
        renderItem={({ item }) => item}
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const renderScene = (institution: IInstitution) =>
  SceneMap({
    tab1: () => <Home institution={institution} />,
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
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
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
