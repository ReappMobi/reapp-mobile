import { Stack } from 'expo-router';
import colors from 'src/constants/colors';

const Layout = () => (
  <Stack
    screenOptions={{
      title: 'REAPP',
      headerBackVisible: true,
      headerTintColor: colors.color_primary,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    }}
  />
);

export default Layout;
