import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, type TextInputProps, View } from 'react-native';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type ControlledInputProps = TextInputProps & {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export const ControlledInput = ({
  name,
  label,
  placeholder,
  className,
  inputClassName,
  ...inputProps
}: ControlledInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <View className={cn('w-full', className)}>
      {label && (
        <Label className="text-xs font-bold text-foreground">{label}</Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={placeholder}
            className={cn(
              'border-color_primary/60 border-2 focus:border-color_primary rounded-sm h-12',
              inputClassName
            )}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...inputProps}
          />
        )}
      />

      {error && (
        <Text className="text-rose-500 mt-1 text-sm">
          {error.message?.toString()}
        </Text>
      )}
    </View>
  );
};
