import { Controller } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';

type FormInputFieldProps = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error: any;
  Icon: React.FC;
};

export const FormInputField: React.FC<FormInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  Icon,
}) => {
  return (
    <View className="my-2 w-full">
      <Text className="w-content mb-2 text-sm">{label}</Text>
      <View className="h-16 w-full flex-row items-center gap-x-1 rounded-md border border-2 border-text_primary px-2">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              className="flex-1"
            />
          )}
        />
        <Icon />
      </View>
      {error[name] && (
        <Text className="text-red-401 text-sm font-bold">
          {error[name].message}
        </Text>
      )}
    </View>
  );
};
