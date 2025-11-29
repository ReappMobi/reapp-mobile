import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'text-base rounded-md flex-row justify-between items-center active:opacity-70 w-full',
  {
    variants: {
      variant: {
        contained: 'bg-white',
        text: 'bg-transparent active:underline',
        outlined: 'bg-transparent border b-2',
      },
      size: {
        small: 'p-3',
        medium: 'p-4',
        large: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  customStyles?: string;
  textColor?: string;
  textSize?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function Button({
  variant,
  size,
  startIcon,
  endIcon,
  children,
  customStyles,
  textColor,
  textSize,
  onPress,
  disabled = false,
}: ButtonProps) {
  const { width } = useWindowDimensions();

  const dynamicTextSize = width < 350 ? 'text-xs' : textSize || 'text-base';

  return (
    <Pressable
      style={[disabled && { opacity: 0.5 }]}
      className={cn(
        buttonVariants({ variant, size, className: customStyles }),
        'flex-row items-center justify-center'
      )}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      {startIcon && (
        <View className="mr-2">
          {React.cloneElement(startIcon as React.ReactElement)}
        </View>
      )}
      <Text
        className={`font-reapp_medium ${dynamicTextSize} ${textColor} flex-shrink`}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {children}
      </Text>
      {endIcon && <View className="ml-2">{endIcon}</View>}
    </Pressable>
  );
}
