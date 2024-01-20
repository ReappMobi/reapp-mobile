import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function Input({
  placeholder,
  maxLength,
  inputMode,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.text_gray}
      maxLength={maxLength}
      inputMode={inputMode}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.input_background,
    width: '100%',
    height: 56,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.text_secondary,
    paddingHorizontal: 8,
    paddingVertical: 16,
    color: Colors.text_gray,
    fontSize: 16,
    fontFamily: 'regular',
  },
});
