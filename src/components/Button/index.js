import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

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
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        handlePress({ pressed, variant, backgroundColor, size, style })
      }
      android_ripple={{ color: backgroundColor || 'rgba(0,0,0,0.2)' }}
    >
      {startIcon}
      <Text style={styles.content}> {children} </Text>
      {endIcon}
    </Pressable>
  );
}

const styles = (backgroundColor) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 6,
      backgroundColor,
    },

    content: {
      fontFamily: 'poppins-medium',
    },

    text: {
      backgroundColor: 'transparent',
    },

    contained: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      pressed: {
        opacity: 0.7,
      },
    },

    outlined: {
      borderWidth: 1,
      borderColor: backgroundColor,
      borderRadius: 6,
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease-in-out',
      pressed: {
        opactiy: 0.5,
      },
    },

    sizes: {
      small: {
        padding: 8,
      },
      medium: {
        padding: 16,
      },
      large: {
        padding: 24,
      },
    },
  });
