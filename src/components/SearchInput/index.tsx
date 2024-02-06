import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput, Pressable, Keyboard, Text } from 'react-native';

type SearchInputProps = {
  clicked?: boolean;
  searchPhrase?: string;
  setSearchPhrase?: (value: string) => void;
  setClicked?: (value: boolean) => void;
};

function SearchInput({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: SearchInputProps) {
  return (
    <View className="mt-12 flex-row items-center justify-center">
      <View
        className={`min-h-14 flex-row items-center justify-between rounded border border-text_secondary bg-input_background px-2 py-4 ${
          clicked ? 'w-9/12' : 'w-full'
        }`}
      >
        <View className="flex-1">
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
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
      </View>

      {clicked && (
        <View className="ml-3">
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          >
            <Text className="text-base text-color_redsh">Cancelar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default SearchInput;
