import { Search, X } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { useRef, useState } from 'react';
import { Keyboard, TextInput, type TextInputProps, View } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Icon } from './icon';

function Input({
  className,
  placeholderClassName,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'border-input bg-background text-foreground flex h-12 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9',
        props.editable === false && 'opacity-50',
        'placeholder:text-muted-foreground/50',
        className
      )}
      {...props}
    />
  );
}

cssInterop(TextInputMask, { className: 'style' });
function MaskedInput({
  className,
  placeholderClassName,
  ...props
}: TextInputMaskProps & React.RefAttributes<TextInputMask>) {
  return (
    <TextInputMask
      className={cn(
        'border-input bg-background text-foreground flex h-12 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9',
        props.editable === false && 'opacity-50',
        'placeholder:text-muted-foreground/50',
        className
      )}
      {...props}
    />
  );
}

type SearchInputProps = TextInputProps &
  React.RefAttributes<TextInput> & {
    isFocused?: boolean;
    onDimiss?: () => void;
  };

const SearchInput = ({
  value,
  editable,
  onFocus,
  onChangeText,
  onDimiss,
}: SearchInputProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const handleClosePress = () => {
    Keyboard.dismiss();
    setFocused(false);
    onChangeText('');
    textInputRef.current?.clear();
    onDimiss && onDimiss();
  };

  return (
    <View className="flex-row">
      <View
        className={cn(
          'border-input bg-background text-foreground flex h-12 w-full min-w-0 flex-row items-center rounded-md border text-base leading-5 shadow-sm shadow-black/5 sm:h-9',
          editable === false && 'opacity-50',
          'placeholder:text-muted-foreground/50',
          focused && 'border-primary',
          'border-primary/60 focus:border-primary rounded-sm'
        )}
      >
        <Input
          ref={textInputRef}
          className="font-regular flex-1 text-base text-foreground bg-transparent shadow-transparent border-0"
          placeholder="O que você está procurando?"
          onChangeText={onChangeText}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setFocused(true);
          }}
          value={value}
        />
        {focused ? (
          <Button
            onPress={handleClosePress}
            className="h-10 w-10 items-center justify-center p-0"
            variant="ghost"
          >
            <Icon as={X} className="w-5 h-5 text-foreground" />
          </Button>
        ) : (
          <View className="h-10 w-10 items-center justify-center">
            <Icon as={Search} className="w-5 h-5 text-foreground" />
          </View>
        )}
      </View>
    </View>
  );
};

export { Input, MaskedInput, SearchInput };
