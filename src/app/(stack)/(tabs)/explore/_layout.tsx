import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SearchInput } from 'src/components';
import { useSearch } from 'src/hooks/useSearch';

import InstitutionsPage from './institutions';
import ProjectsPage from './projects';

const Tab = createMaterialTopTabNavigator();

// Simple debounce function
const debounce = (func, delay) => {
  let timeoutId: any;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ExploreLayout = () => {
  const { updateSearchQuery, updateSearchActive } = useSearch();
  const navigation = useNavigation();

  const renderLabel = useMemo(() => {
    return ({ children, focused }: { focused: boolean; children: string }) => (
      <Text
        className={`font-medium text-base text-text_neutral ${
          focused && 'text-text_primary underline'
        }`}
      >
        {children}
      </Text>
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchInput
          onChangeText={debounce(handleSearchChange, 500)}
          onFocus={() => updateSearchActive(true)}
          onDimiss={() => {
            updateSearchActive(false);
            updateSearchQuery('');
          }}
        />
      ),
    });
  }, []);

  const handleSearchChange = (text: string) => {
    updateSearchQuery(text);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <Tab.Navigator
        screenOptions={{
          tabBarBounces: true,
          tabBarPressColor: 'transparent',
          tabBarItemStyle: {
            width: 'auto',
            height: 'auto',
            paddingHorizontal: 0,
            marginRight: 8,
          },
          tabBarLabel: renderLabel,
          swipeEnabled: true,
          tabBarIndicator: () => null,
          tabBarStyle: {
            marginLeft: 16,
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
          },
          lazy: true,
        }}
        id={undefined}
      >
        <Tab.Screen name="Instituições" component={InstitutionsPage} />
        <Tab.Screen name="Projetos" component={ProjectsPage} />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default ExploreLayout;
