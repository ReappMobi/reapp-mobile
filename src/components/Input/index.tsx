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
  multiline?: boolean;
  numberOfLines?: number;
};

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      placeholder,
      maxLength,
      inputMode,
      value,
      onChangeText,
      secureTextEntry,
      customStyle,
      multiline,
      numberOfLines,
    },
    ref
  ) => {
    return (
      <TextInput
        ref={ref} // Pass the ref to the TextInput component
        className={`border-1 min-h-14 w-full rounded border border-text_secondary 
                  bg-input_background px-2 py-4 font-reapp_regular 
                  text-base text-text_gray ${customStyle}`}
        placeholder={placeholder}
        placeholderTextColor={colors.text_gray}
        maxLength={maxLength}
        keyboardType={
          inputMode === 'email'
            ? 'email-address'
            : inputMode === 'tel'
              ? 'phone-pad'
              : 'default'
        }
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    );
  }
);

export default Input;
