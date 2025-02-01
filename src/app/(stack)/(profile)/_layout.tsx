import { Stack } from 'expo-router';
import { headerDefault } from 'src/constants/header';

const Layout = () => (
  <Stack
    screenOptions={{
      title: 'REAPP',
      ...headerDefault,
    }}
  >
    <Stack.Screen
      name="edit-donor-profile"
      options={{
        headerTitle: 'Editar perfil',
        ...headerDefault,
        headerTitleStyle: { fontSize: 18, fontFamily: 'reapp_medium' },
      }}
    />
    <Stack.Screen
      name="edit-institution-profile"
      options={{
        headerTitle: 'Editar perfil',
        ...headerDefault,
        headerTitleStyle: { fontSize: 18, fontFamily: 'reapp_medium' },
      }}
    />
    <Stack.Screen
      name="my-donations"
      options={{
        headerTitle: 'Minhas doações',
        ...headerDefault,
        headerTitleStyle: { fontSize: 18, fontFamily: 'reapp_medium' },
      }}
    />
    <Stack.Screen
      name="saved"
      options={{
        headerTitle: 'Publicações salvas',
        ...headerDefault,
        headerTitleStyle: { fontSize: 18, fontFamily: 'reapp_medium' },
      }}
    />
  </Stack>
);

export default Layout;
