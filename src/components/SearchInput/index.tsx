import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';

type SearchInputProps = {
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  onDismiss?: () => void;
};

const SearchInput = ({
  value,
  onFocus,
  onBlur,
  onChangeText,
  onDismiss,
}: SearchInputProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleClearAndDismiss = () => {
    Keyboard.dismiss();
    onChangeText?.('');
    onDismiss?.();
    textInputRef.current?.blur();
  };

  return (
    <View className="w-full p-1">
      <View
        className={cn(
          'w-full flex-row rounded-full items-center justify-between border bg-color_primary/5 border-color_primary px-2',
          'duration-200',
          isFocused && 'bg-white'
        )}
      >
        <TextInput
          ref={textInputRef}
          className="flex-1 text-base text-text_neutral/90"
          placeholder={isFocused ? 'O que você está procurando?' : 'Buscar'}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
        />

        {isFocused ? (
          <Button
            variant="ghost"
            onPress={handleClearAndDismiss}
            className="h-8 w-8 items-center justify-center"
          >
            <Icon as={X} className="stroke-text_neutral size-6" />
          </Button>
        ) : (
          <View className="h-8 w-8 items-center justify-center">
            <Icon as={Search} className="stroke-text_neutral size-6" />
          </View>
        )}
      </View>
    </View>
  );
};

SearchInput.displayName = 'SearchInput';

export { SearchInput };
