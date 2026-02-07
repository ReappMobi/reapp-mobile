import { ScreenContainer } from 'src/components';
import { MaterialTopTabs, TopTabs } from '@/components/ui/top-tab';

const ExploreLayout = () => {
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
