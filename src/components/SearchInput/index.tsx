import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { View, TextInput, Pressable, Keyboard } from 'react-native';

type SearchInputProps = {
  clicked?: boolean;
  searchPhrase?: string;
  setSearchPhrase?: (value: string) => void;
  setClicked?: (value: boolean) => void;
};

const SearchInput = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: SearchInputProps) => {
  return (
    <View className="flex-row items-center justify-center">
      <View className="min-h-14 w-full flex-row items-center justify-between rounded border border-text_secondary bg-input_background px-2 py-4">
        <View>
          <TextInput
            placeholder="O que você está procurando?"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
            className="font-regular text-base text-text_gray"
          />
        </View>

        <View className="ml-3">
          {!clicked && (
            <Ionicons name="search-outline" size={24} color="black" />
          )}
          {clicked && (
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
                setSearchPhrase('');
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(SearchInput);
