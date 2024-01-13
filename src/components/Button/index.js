import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/Colors';

function Button({ children }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={styles.button}
        android_ripple={{ color: Colors.color_gray }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{children}</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.text_neutral}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  gridItem: {
    backgroundColor: Colors.color_white,
    width: 250,
    height: 56,
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

  text: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    color: Colors.text_neutral,
  },
});
