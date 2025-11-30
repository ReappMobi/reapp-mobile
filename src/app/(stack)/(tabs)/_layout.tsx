import { Octicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { debounce } from 'es-toolkit/function';
import { Image } from 'expo-image';
import { Redirect, Tabs, useNavigation, useRouter } from 'expo-router';
import { CopyPlus, Globe, Star, UserRound } from 'lucide-react-native';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import colors from 'src/constants/colors';
import { PostProvider } from 'src/contexts/posts';
import { SearchProvider } from 'src/contexts/search';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

const TabIcon = ({
  focused,
  icon: IconComponent,
  color,
  size,
  lib = 'lucide',
  fill = true,
}) => {
  const iconContent =
    lib === 'lucide' ? (
      <Icon
        as={IconComponent}
        size={size}
        color={color}
        className={focused && fill ? 'fill-primary' : ''}
      />
    ) : (
      <IconComponent name={(props) => props.name} size={size} color={color} />
    );

  if (!focused) {
    return iconContent;
  }

  return (
    <View
      style={{
        width: 3 * size,
        height: size + 8,
      }}
      className="items-center justify-center bg-green-700/20 rounded-full"
    >
      {iconContent}
    </View>
  );
};

const HeaderAvatar = ({ user }) => {
  const navigation = useNavigation();
  const onPress = useCallback(
    debounce(() => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }, 120),
    []
  );
  return (
    <Pressable onPress={onPress}>
      <Image
        source={{ uri: user?.media?.remoteUrl }}
        placeholder={{ blurhash: user?.media?.blurhash }}
        className="h-9 w-9 rounded-full"
      />
    </Pressable>
  );
};

const HeaderCreateButton = () => {
  const router = useRouter();

  const onPress = useCallback(
    debounce(() => {
      router.push('/create-post');
    }, 170),
    [router]
  );
  return (
    <Button onPress={onPress} variant="ghost" className="p-2 rounded-full">
      <Icon as={CopyPlus} size={24} className="stroke-text-neutral" />
    </Button>
  );
};

const TabLayout = () => {
  const { isDonor, token, user } = useAuth();

  if (!user || !token) {
    return <Redirect href="welcome" />;
  }

  return (
    <PostProvider token={token}>
      <SearchProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: 'rgb(46 56 77 / 0.8)',
            tabBarStyle: { borderTopWidth: 1, paddingTop: 4 },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerTitle: () => (
                <Text className="text-2xl font-bold text-primary">REAPP</Text>
              ),
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeft: () => <HeaderAvatar user={user} />,
              headerRight: () => (!isDonor ? <HeaderCreateButton /> : null),
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <View
                    style={{ width: 3 * size, height: size + 8 }}
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
              tabBarIcon: ({ size, color, focused }) => (
                <TabIcon
                  focused={focused}
                  size={size}
                  color={color}
                  icon={Globe}
                  fill={false}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="favorites"
            options={{
              href: !isDonor && null,
              headerShown: isDonor,
              tabBarIcon: ({ size, color, focused }) => (
                <TabIcon
                  focused={focused}
                  size={size}
                  color={color}
                  icon={Star}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              href: isDonor && null,
              headerShown: false,
              tabBarIcon: ({ size, color, focused }) => (
                <TabIcon
                  focused={focused}
                  size={size}
                  color={color}
                  icon={UserRound}
                />
              ),
            }}
          />
        </Tabs>
      </SearchProvider>
    </PostProvider>
  );
};

export default TabLayout;
