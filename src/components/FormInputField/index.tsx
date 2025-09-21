import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Text } from '../ui/text';

type FormInputFieldProps = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error: any;
};

export const FormInput: React.FC<FormInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
}) => {
  return (
    <View className="my-1 w-full">
      <Label className="w-content text-xs font-bold text-foreground">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            className="active:border-color_primary focus:border-color_primary border-color_primary/50 h-11 rounded-sm"
          />
        )}
      />
      {error[name] && (
        <Text className="text-red-400 text-sm font-bold">
          {error[name].message}
        </Text>
      )}
    </View>
  );
};
