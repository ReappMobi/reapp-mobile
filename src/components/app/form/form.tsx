import type { ReactNode } from 'react';
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from 'react-hook-form';
import { View, type ViewProps } from 'react-native';

type FormProps<T extends FieldValues> = ViewProps & {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
};

function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...viewProps
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <View className={className} {...viewProps}>
        {children}
      </View>
    </FormProvider>
  );
}

Form.displayName = 'Form';

export { Form };
