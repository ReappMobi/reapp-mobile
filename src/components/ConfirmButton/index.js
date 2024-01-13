import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import Colors from '../../constants/Colors';

function ConfirmButton() {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={styles.button}
        android_ripple={{ color: Colors.color_secundary }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.textButton}>Continuar</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ConfirmButton;

const styles = StyleSheet.create({
  gridItem: {
    backgroundColor: Colors.color_primary,
    height: 56,
    borderRadius: 6,
    elevation: 4,
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButton: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.text_white,
  },
});
