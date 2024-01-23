import React from 'react';
import { Text, Pressable } from 'react-native';

import { styles } from './styles';
import Colors from '../../constants/Colors';

const handlePress = ({ pressed, variant, backgroundColor, size, style }) => {
  const _styles = styles(backgroundColor);
  return [
    _styles.button,
    _styles[variant],
    pressed && _styles[variant].pressed,
    _styles.sizes[size],
    style,
  ];
};

export default function Button({
  variant = 'contained',
  backgroundColor = Colors.color_white,
  children,
  startIcon,
  endIcon,
  size = 'medium',
  style = {},
  styleText = {},
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        handlePress({ pressed, variant, backgroundColor, size, style })
      }
      android_ripple={{ color: backgroundColor || 'rgba(0,0,0,0.2)' }}
    >
      {startIcon}
      <Text style={[styles().content, styleText]}> {children} </Text>
      {endIcon}
    </Pressable>
  );
}
