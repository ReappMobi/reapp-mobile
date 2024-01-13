import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/Colors';

function ButtonGoogleSignUp() {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: Colors.color_gray }}
        style={styles.button}
      >
        <View style={styles.innerContainer}>
          <Ionicons name="logo-google" size={24} color={Colors.text_neutral} />
        </View>
      </Pressable>
    </View>
  );
}

export default ButtonGoogleSignUp;

const styles = StyleSheet.create({
  gridItem: {
    width: 56,
    height: 56,
    borderRadius: 6,
    elevation: 4,
    backgroundColor: Colors.color_third_light,
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
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
