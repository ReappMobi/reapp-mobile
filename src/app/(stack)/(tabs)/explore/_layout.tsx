import { debounce } from 'es-toolkit/function';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { ScreenContainer } from 'src/components';
import { useSearch } from 'src/hooks/useSearch';
import { SearchInput } from '@/components/ui/input';
import { MaterialTopTabs, TopTabs } from '@/components/ui/top-tab';

const ExploreLayout = () => {
  const { updateSearchQuery, updateSearchActive } = useSearch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchInput
          onChangeText={debounce(
            (text: string) => updateSearchQuery(text),
            300
          )}
          onFocus={() => updateSearchActive(true)}
          onDimiss={() => {
            updateSearchActive(false);
            updateSearchQuery('');
          }}
        />
      ),
    });
  }, []);

  return (
    <ScreenContainer className="p-0">
      <TopTabs>
        <MaterialTopTabs.Screen
          name="institutions"
          options={{ title: 'Instituições' }}
        />
        <MaterialTopTabs.Screen
          name="projects"
          options={{ title: 'Projetos' }}
        />
      </TopTabs>
    </ScreenContainer>
  );
};

export default ExploreLayout;
