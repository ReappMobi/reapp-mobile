import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import { MaskedInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type ControlledMaskedInputProps = TextInputMaskProps & {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export const ControlledMaskedInput = forwardRef<
  any,
  ControlledMaskedInputProps
>(
  (
    { name, label, placeholder, className, inputClassName, ...inputProps },
    ref
  ) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const error = errors[name];

    return (
      <View className={cn('w-full', className)}>
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
            <MaskedInput
              ref={ref}
              placeholder={placeholder}
              className={cn(
                inputClassName,
                error && 'border-rose-400 focus:border-rose-600'
              )}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...inputProps}
            />
          )}
        />

        {error && (
          <Text className="text-rose-400 mt-1 text-sm">
            {error.message?.toString()}
          </Text>
        )}
      </View>
    );
  }
);

ControlledMaskedInput.displayName = 'ControlledMaskedInput';
