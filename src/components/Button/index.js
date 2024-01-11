import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function Button({ children }) {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{children}</Text>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.color_white,
    width: 250,
    height: 56,
    elevation: 4,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.color_white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  text: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
  },
});
