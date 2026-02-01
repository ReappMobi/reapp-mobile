import { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient';
import colors from './colors';
import { headerTitleStyle } from './styles';

export const headerDefault: ExtendedStackNavigationOptions = {
  headerBackVisible: true,
  headerTintColor: colors.primary,
  headerShadowVisible: false,
  headerTitleStyle,
};
