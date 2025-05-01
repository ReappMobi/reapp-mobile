import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Keyboard, Pressable, TextInput, View } from 'react-native';

type SearchInputProps = {
  isFocused?: boolean;
  value?: string;
  onFocus?: () => void;
  onChangeText?: (text: string) => void;
  onDimiss?: () => void;
};

const SearchInput = ({
  value,
  onFocus,
  onChangeText,
  onDimiss,
}: SearchInputProps) => {
  const textInputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="flex-1 flex-row">
      <View className="w-full flex-row items-center justify-between rounded border border-text_secondary bg-input_background px-2 py-2">
        <TextInput
          ref={textInputRef}
          className="font-regular flex-1 text-base text-text_gray"
          placeholder="O que você está procurando?"
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocused(true);
            onFocus && onFocus();
          }}
          value={value}
        />

        {isFocused ? (
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setIsFocused(false);
              onChangeText('');
              textInputRef.current?.clear();
              onDimiss && onDimiss();
            }}
            className="h-8 w-8 items-center justify-center"
          >
            <Ionicons name="close" size={20} color="black" />
          </Pressable>
        ) : (
          <View className="h-8 w-8 items-center justify-center">
            <Ionicons name="search-outline" size={20} color="black" />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
