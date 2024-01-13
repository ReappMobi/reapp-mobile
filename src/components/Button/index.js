import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/Colors';

function Button({ variant = 'medium', children, backgroundColor }) {
  return (
    <View
      style={[styles.gridItem, variantStyles[variant], { backgroundColor }]}
    >
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }
        android_ripple={{ color: Colors.color_gray }}
      >
        <View style={styles.innerContainer}>{children}</View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  gridItem: {
    elevation: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },

  button: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create({
  small: {
    width: 56,
    height: 56,
  },
  medium: {
    width: 250,
    height: 56,
  },
  large: {
    width: '100%',
    height: 56,
  },
});
