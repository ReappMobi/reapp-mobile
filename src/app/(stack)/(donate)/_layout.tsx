import { Stack } from 'expo-router';
import { headerDefault } from 'src/constants/header';
import { headerTitleStyleSmall } from 'src/constants/styles';

const Layout = () => (
  <Stack
    screenOptions={{
      title: 'REAPP',
      ...headerDefault,
    }}
  >
    <Stack.Screen
      name="donate"
      options={{
        headerTitle: 'Doar',
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />

    <Stack.Screen
      name="donation-method"
      options={{
        headerTitle: 'Doação pontual',
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
  </Stack>
);

export default Layout;
