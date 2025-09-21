import { Text } from 'react-native';
import { type Route, TabBar, type TabBarProps } from 'react-native-tab-view';

export const TabBarWrapper = ({ ...props }: TabBarProps<Route>) => {
  const renderLabel = ({
    route,
    focused,
  }: {
    route: Route;
    focused: boolean;
  }) => (
    <Text
      className={`font-reapp_regular text-lg text-text_neutral ${
        focused && 'text-text_primary'
      }`}
    >
      {route.title}
    </Text>
  );
  return (
    <TabBar
      {...props}
      scrollEnabled
      pressColor="transparent"
      indicatorStyle={{ backgroundColor: 'transparent' }}
      bounces
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
      }}
      tabStyle={{
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 8,
        margin: 0,
      }}
      renderLabel={renderLabel}
    />
  );
};
