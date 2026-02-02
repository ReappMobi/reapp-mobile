import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useGetCategories } from '@/services/category/category.service';

type ControlledCategoryInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

export function ControlledCategoryInput({
  name,
  label,
  placeholder,
  className,
}: ControlledCategoryInputProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const filteredCategories = categories?.filter((cat) =>
    cat.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const error = errors[name];

  return (
    <View className={cn('relative w-full', className)}>
      {label && (
        <Label
          className={cn(
            'text-sm font-bold text-muted-foreground',
            error && 'text-rose-400'
          )}
        >
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              placeholder={placeholder}
              className={cn(error && 'border-rose-400 focus:border-rose-600')}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
                setInputValue(text);
                setShowSuggestions(true);
              }}
              value={value}
            />
            {isLoadingCategories && (
              <ActivityIndicator
                className="absolute right-3 top-8"
                size="small"
              />
            )}
          </>
        )}
      />

      {showSuggestions &&
        inputValue.length > 0 &&
        filteredCategories.length > 0 && (
          <View className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {filteredCategories.slice(0, 5).map((cat) => (
              <Button
                key={cat.id}
                variant="ghost"
                onPress={() => {
                  setValue(name, cat.name);
                  setInputValue(cat.name);
                  setShowSuggestions(false);
                }}
              >
                <Text className="text-sm">{cat.name}</Text>
              </Button>
            ))}
          </View>
        )}

      {error && (
        <Text className="mt-1 text-sm text-rose-400">
          {error.message?.toString()}
        </Text>
      )}
    </View>
  );
}
