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
      name="edit-donor-profile"
      options={{
        headerTitle: 'Editar perfil',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
    <Stack.Screen
      name="edit-institution-profile"
      options={{
        headerTitle: 'Editar perfil',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
    <Stack.Screen
      name="my-donations"
      options={{
        headerTitle: 'Minhas doações',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
    <Stack.Screen
      name="my-donations-institution"
      options={{
        headerTitle: 'Doações para instituição',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
    <Stack.Screen
      name="my-donations-institution-general"
      options={{
        headerTitle: 'Doações Gerais',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
    <Stack.Screen
      name="my-donations-institution-project"
      options={{
        headerTitle: 'Doações para Projetos',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
    <Stack.Screen
      name="saved"
      options={{
        headerTitle: 'Publicações salvas',
        ...headerDefault,
        headerTitleStyle: headerTitleStyleSmall,
      }}
    />
  </Stack>
);

export default Layout;
