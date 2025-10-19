import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ExploreLayout = () => {
  const { updateSearchQuery, updateSearchActive } = useSearch();
  const [_currentPage, _setCurrentPage] = useState<'institutions' | 'projects'>(
    'institutions'
  );
  const navigation = useNavigation();

  const tabBarLabel = useMemo(() => {
    return ({ children, focused }: { focused: boolean; children: string }) => (
      <Badge
        className={cn(
          'p-1 px-4 bg-gray-200 rounded-full',
          focused && 'bg-color_primary'
        )}
      >
        <Text
          className={cn(
            `font-medium text-base text-text_neutral`,
            focused && 'text-white'
          )}
        >
          {children}
        </Text>
      </Badge>
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchInput
          onChangeText={debounce(handleSearchChange, 500)}
          onFocus={() => updateSearchActive(true)}
          onDismiss={() => {
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
            padding: 4,
          },
          tabBarLabel,
          swipeEnabled: false,
          tabBarIndicator: () => null,
          tabBarStyle: {
            marginHorizontal: 10,
            marginVertical: 8,
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
