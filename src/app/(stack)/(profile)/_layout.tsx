import { Stack } from 'expo-router';
import { headerDefault } from 'src/constants/header';

const Layout = () => (
  <Stack
    screenOptions={{
      title: 'REAPP',
      ...headerDefault,
    }}
  />
);

export default Layout;
