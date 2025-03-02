import { memo } from 'react';
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { IInstitution } from 'src/types';

import { TabBarWrapper } from './tab-bar';

type TabViewWrapperProps = {
  institution: IInstitution;
  index: number;
  setIndex: (newIndex: number) => void;
  routes: Route[];
  width: number;
  renderScene: (props: SceneRendererProps & { route: Route }) => JSX.Element;
};

const TabViewWrapper = ({
  index,
  setIndex,
  routes,
  width,
  renderScene,
}: TabViewWrapperProps) => {
  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<Route> }
  ) => {
    return <TabBarWrapper {...props} />;
  };
  return (
    <TabView
      className="mt-2 bg-transparent"
      lazy
      navigationState={{
        index,
        routes,
      }}
      initialLayout={{ width }}
      renderScene={renderScene}
      onIndexChange={(index) => setIndex(index)}
      renderTabBar={renderTabBar}
    />
  );
};

export default memo(TabViewWrapper);
