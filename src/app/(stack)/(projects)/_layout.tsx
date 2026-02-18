import { Stack } from 'expo-router';
import colors from 'src/constants/colors';

const Layout = () => (
  <Stack
    screenOptions={{
      title: 'REAPP',
      headerBackVisible: true,
      headerTintColor: colors.primary,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 24,
        fontFamily: 'reapp_bold',
      },
    }}
  />
);

export default Layout;
