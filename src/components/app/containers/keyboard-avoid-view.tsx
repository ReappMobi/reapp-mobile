import { useHeaderHeight } from '@react-navigation/elements';
import { useRef } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

const isIos = Platform.OS === 'ios';

export const SafeKeyboardAvoidView = ({
  children,
  ...props
}: KeyboardAvoidingViewProps) => {
  const headerHeight = useHeaderHeight();
  const androidHeaderHeight = useRef(headerHeight);

  const keyboardVerticalOffset = isIos
    ? headerHeight
    : androidHeaderHeight.current;

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
