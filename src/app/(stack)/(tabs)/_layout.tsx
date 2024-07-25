import { Entypo, Octicons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Redirect, Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import colors from 'src/constants/colors';
import { SearchProvider } from 'src/contexts/search';
import { useAuth } from 'src/hooks/useAuth';

const TabLayout = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { isDonor } = useAuth();

  if (!user) return <Redirect href="welcome" />;

  const onToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SearchProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.color_primary,
          tabBarInactiveTintColor: colors.text_dark,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'REAPP',
            headerTitleStyle: {
              fontFamily: 'reapp_bold',
              color: colors.color_primary,
              fontSize: 24,
            },
            headerRight: () => (
              <Entypo
                name="new-message"
                size={24}
                color={colors.text_neutral}
              />
            ),
            headerTitleAlign: 'center',
            headerLeftContainerStyle: { paddingLeft: 16 },
            headerRightContainerStyle: { paddingRight: 16 },
            headerStyle: {
              shadowColor: '#000',
            },
            headerLeft: () => (
              <Pressable onPress={onToggle}>
                <Image
                  source={{ uri: user.avatar }}
                  className="h-9 w-9 rounded-full"
                />
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

        <Tabs.Screen
          name="favorites"
          options={{
            headerShown: true,
            tabBarIcon: ({ size, color }) => (
              <Octicons name="heart" size={size} color={color} />
            ),
            tabBarButton: (props) =>
              isDonor ? <Pressable {...props} /> : null,
          }}
        />

        <Tabs.Screen
          name="transparency"
          options={{
            headerShown: true,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="receipt-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            tabBarButton: (props) =>
              isDonor ? null : <Pressable {...props} />,
          }}
        />
      </Tabs>
    </SearchProvider>
  );
};

export default TabLayout;
