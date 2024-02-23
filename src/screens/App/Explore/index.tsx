import React, { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { TabView, Route, TabBar } from 'react-native-tab-view';
import { SearchInput } from 'src/components';

import ExploreProjectsScreen from './ExploreProjectsScreen';
import ExploreScreen from './ExploreScreen';

function Explore() {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Instituições' },
    { key: 'second', title: 'Projetos' },
  ]);

  const { width } = useWindowDimensions();

  const renderLabel = ({
    route,
    focused,
  }: {
    route: Route;
    focused: boolean;
  }) => (
    <Text
      className={`font-_medium text-base text-text_neutral ${
        focused && 'text-text_primary underline'
      }`}
    >
      {route.title}
    </Text>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      pressColor="transparent"
      indicatorStyle={{ backgroundColor: 'transparent' }}
      bounces
      style={{
        marginLeft: 16,
        padding: 0,
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
      }}
      tabStyle={{
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 0,
        marginRight: 8,
      }}
      renderLabel={renderLabel}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ExploreScreen clicked={clicked} searchPhrase={searchPhrase} />;
      case 'second':
        return (
          <ExploreProjectsScreen
            clicked={clicked}
            searchPhrase={searchPhrase}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View className="px-4 pt-4">
        <SearchInput
          clicked={clicked}
          setClicked={setClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={renderTabBar}
        lazy
      />
    </>
  );
}

export default Explore;
