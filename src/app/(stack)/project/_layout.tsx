import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from 'expo-router';
import { X } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { ProjectProvider } from 'src/contexts/project';
import { Icon } from '@/components/ui/icon';
import { THEME } from '@/lib/theme';

const Layout = () => {
  return (
    <ProjectProvider>
      <Stack
        screenOptions={{
          title: 'Projeto',
          headerBackVisible: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'reapp_medium',
          },
        }}
      >
        <Stack.Screen
          name="create"
          options={{
            title: 'Novo projeto',
            headerTitleAlign: 'center',
            headerTintColor: THEME['light'].primary,
            headerBackVisible: false,
            headerLeft: () => (
              <Pressable onPress={() => router.dismiss()}>
                <Icon
                  as={X}
                  color={THEME['light'].primary}
                  className="w-6 h-6"
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="categories"
          options={{
            title: 'Selecionar categoria',
            headerTintColor: THEME['light'].primary,
            headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerTintColor: THEME['light'].primary,
            headerBackVisible: true,
            headerTitle: () => null,
          }}
        />
      </Stack>
    </ProjectProvider>
  );
};

export default Layout;
