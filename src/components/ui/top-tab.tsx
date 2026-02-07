import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { ScreenProps, withLayoutContext } from 'expo-router';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { THEME } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Text } from './text';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const renderLabel = ({
  children,
  focused,
}: {
  focused: boolean;
  children: string;
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    if (focused) {
      scale.value = withSequence(
        withTiming(1.05, { duration: 150 }),
        withSpring(1, {
          stiffness: 300,
          damping: 25,
          mass: 0.5,
        })
      );
    } else {
      scale.value = withTiming(1, { duration: 100 });
    }
  }, [focused]);

  return (
    <Animated.View style={animatedStyle}>
      <Text
        className={cn(
          'font-medium text-lg text-muted-foreground',
          focused && 'font-bold text-primary'
        )}
      >
        {children}
      </Text>
    </Animated.View>
  );
};

type TopTabsProps = {
  children: React.ReactNode;
};

export const TopTabs = ({ children }: TopTabsProps) => {
  return (
    <MaterialTopTabs
      id={undefined}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarBounces: true,
        tabBarPressColor: 'transparent',
        tabBarItemStyle: {
          width: 'auto',
          height: 'auto',
        },
        tabBarLabel: renderLabel,
        swipeEnabled: true,
        tabBarIndicatorStyle: {
          width: 0.9,
        },
        tabBarIndicatorContainerStyle: {
          marginBottom: -1.5,
        },
        tabBarStyle: {
          shadowColor: 'transparent',
          backgroundColor: THEME['light'].background,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: THEME['light'].border,
        },
        lazy: true,
      }}
    >
      {children}
    </MaterialTopTabs>
  );
};

export const TabScreen = (
  props: ScreenProps<
    MaterialTopTabNavigationOptions,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >
) => {
  return <MaterialTopTabs.Screen {...props} />;
};
