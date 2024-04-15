import { Stack } from 'expo-router';
import colors from 'src/constants/colors';

const Layout = () => (
  <Stack
    screenOptions={{
      title: 'REAPP',
      headerBackTitleVisible: false,
      headerBackVisible: false,
      headerTintColor: colors.color_primary,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 24,
        fontFamily: 'reapp_bold',
      },
    }}
  />
);

export default Layout;
