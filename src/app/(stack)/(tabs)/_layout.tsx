import {
  Avatar,
  AvatarFallback,
  ExpoAvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Link, Redirect, Tabs, useNavigation } from 'expo-router';
import { CopyPlus, Globe, Star } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
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
            tabBarInactiveTintColor: 'rgb(46 56 77 / 0.8)',
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
              headerRight: () => {
                if (isDonor) {
                  return null;
                }
                return (
                  <Link href="/create-post" asChild replace>
                    <Button variant="ghost" className="p-2 rounded-full">
                      <Icon as={CopyPlus} size={24} />
                    </Button>
                  </Link>
                );
              },
              headerTitleAlign: 'center',
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeft: () => (
                <Button
                  variant="ghost"
                  onPress={onToggle}
                  className="p-0 active:bg-transparent"
                >
                  <Avatar alt="User Avatar" className="w-9 h-9">
                    {user.media &&
                      (user.media.remoteUrl || user.media.blurhash) && (
                        <ExpoAvatarImage
                          source={{ uri: user.media?.remoteUrl }}
                          placeholder={{ blurhash: user.media?.blurhash }}
                        />
                      )}
                    <AvatarFallback>
                      <Text>{user.name[0]}</Text>
                    </AvatarFallback>
                  </Avatar>
                </Button>
              ),
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <View
                    style={{
                      width: 2.5 * size,
                      height: size + 8,
                    }}
                    className="items-center justify-center bg-green-700/20 rounded-full"
                  >
                    <Octicons name="home-fill" size={size} color={color} />
                  </View>
                ) : (
                  <Octicons name="home" size={size} color={color} />
                ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              headerShown: true,
              tabBarIcon: ({ size, color, focused }) =>
                focused ? (
                  <View
                    style={{
                      width: 2.5 * size,
                      height: size + 8,
                    }}
                    className="items-center justify-center bg-green-700/20 rounded-full"
                  >
                    <Icon as={Globe} size={size} color={color} />
                  </View>
                ) : (
                  <Icon as={Globe} size={size} color={color} />
                ),
            }}
          />

          {isDonor ? (
            <Tabs.Screen
              name="favorites"
              options={{
                headerShown: true,
                tabBarIcon: ({ size, color, focused }) =>
                  focused ? (
                    <View
                      style={{
                        width: 2.5 * size,
                        height: size + 8,
                      }}
                      className="items-center justify-center bg-green-700/20 rounded-full"
                    >
                      <Icon
                        as={Star}
                        size={size}
                        color={color}
                        className="fill-color_primary"
                      />
                    </View>
                  ) : (
                    <Icon as={Star} size={size} color={color} />
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
