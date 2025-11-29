import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { ProjectProvider } from 'src/contexts/project';

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
            title: null,
            headerBackVisible: false,
            headerLeft: () => (
              <Pressable onPress={() => router.dismiss()}>
                <AntDesign name="close" size={26} color="black" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="categories"
          options={{
            title: 'Selecionar categoria',
            headerBackVisible: true,
          }}
        />
      </Stack>
    </ProjectProvider>
  );
};

export default Layout;
