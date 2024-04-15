import React from 'react';
import { TextInput, InputModeOptions } from 'react-native';

import colors from '../../constants/colors';

type InputProps = {
  placeholder?: string;
  maxLength?: number;
  inputMode?: InputModeOptions;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  customStyle?: string;
};

function Input({
  placeholder,
  maxLength,
  inputMode,
  value,
  onChangeText,
  secureTextEntry,
  customStyle,
}: InputProps) {
  return (
    <TextInput
      className={`boder-1 min-h-14 w-full rounded border border-text_secondary 
                    bg-input_background px-2 py-4 font-reapp_regular 
                    text-base text-text_gray ${customStyle}`}
      placeholder={placeholder}
      placeholderTextColor={colors.text_gray}
      maxLength={maxLength}
      inputMode={inputMode}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

export default Input;
