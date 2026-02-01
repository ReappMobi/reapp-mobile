import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import {
  OTPInput,
  type OTPInputProps,
  type OTPInputRef,
} from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';

type ControlledOTPInputProps = Omit<OTPInputProps, 'value' | 'onChange'> & {
  name: string;
  className?: string;
};

export const ControlledOTPInput = forwardRef<
  OTPInputRef,
  ControlledOTPInputProps
>(({ name, className, ...otpProps }, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <View className={cn('w-full', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <OTPInput
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error ? (error.message?.toString() || true) : false}
            {...otpProps}
          />
        )}
      />
    </View>
  );
});

ControlledOTPInput.displayName = 'ControlledOTPInput';
