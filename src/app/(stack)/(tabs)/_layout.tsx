import {
  Avatar,
  AvatarFallback,
  ExpoAvatarImage,
} from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Redirect, Tabs, router, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import colors from 'src/constants/colors';
import { PostProvider } from 'src/contexts/posts';
import { SearchProvider } from 'src/contexts/search';
import { useAuth } from 'src/hooks/useAuth';

const TabLayout = () => {
  const navigation = useNavigation();
  const { isDonor, token, user } = useAuth();

  if (!user || !token) {
    return <Redirect href="welcome" />;
  }

  const onToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <PostProvider token={token}>
      <SearchProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.color_primary,
            tabBarInactiveTintColor: colors.text_dark,
            tabBarStyle: {
              borderTopWidth: 1,
              paddingTop: 4,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'REAPP',
              headerTitleStyle: {
                fontFamily: 'reapp_bold',
                color: colors.color_primary,
                fontSize: 20,
              },
              headerRight: () =>
                !isDonor ? (
                  <Ionicons
                    name="duplicate-outline"
                    size={28}
                    color={colors.text_neutral}
                    onPress={() => {
                      router.push({ pathname: 'post-create' });
                    }}
                  />
                ) : null,
              headerTitleAlign: 'center',
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerRightContainerStyle: { paddingRight: 16 },
              headerStyle: {
                shadowColor: '#000',
              },
              headerLeft: () => (
                <Pressable onPress={onToggle} className="pl-1">
                  <Avatar alt="User Avatar" className="w-9 h-9">
                    <ExpoAvatarImage
                      source={{ uri: user.media?.remoteUrl }}
                      placeholder={{ blurhash: user.media?.blurhash }}
                    />
                    <AvatarFallback>
                      <Text>{user.name[0]}</Text>
                    </AvatarFallback>
                  </Avatar>
                </Pressable>
              ),
              tabBarIcon: ({ color, size }) => (
                <Octicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              headerShown: true,
              tabBarIcon: ({ size, color }) => (
                <Octicons name="search" size={size} color={color} />
              ),
            }}
          />

          {isDonor ? (
            <Tabs.Screen
              name="favorites"
              options={{
                headerShown: true,
                tabBarIcon: ({ size, color }) => (
                  <Octicons name="heart" size={size} color={color} />
                ),
              }}
            />
          ) : (
            <Tabs.Screen
              name="favorites"
              options={{
                headerShown: false,
                href: null,
                tabBarIcon: ({ size, color }) => (
                  <Octicons name="heart" size={size} color={color} />
                ),
              }}
            />
          )}

          {isDonor ? (
            <Tabs.Screen
              name="profile"
              options={{
                href: null,
                headerShown: false,
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="person-outline" size={size} color={color} />
                ),
              }}
            />
          ) : (
            <Tabs.Screen
              name="profile"
              options={{
                headerShown: false,
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="person-outline" size={size} color={color} />
                ),
              }}
            />
          )}
        </Tabs>
      </SearchProvider>
    </PostProvider>
  );
};

export default TabLayout;
