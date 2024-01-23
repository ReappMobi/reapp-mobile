import React from 'react';
import { Text, Pressable } from 'react-native';

import { shadowStyle, sizeStyles, variantStyles } from './styles';

type ButtonProps = {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  customStyles?: string;
  onPress?: () => void;
};

export default function Button({
  variant = 'contained',
  size = 'medium',
  startIcon,
  endIcon,
  children,
  customStyles,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={variant === 'contained' && shadowStyle}
      className={`${variantStyles.default} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${customStyles}`}
      onPress={onPress}
    >
      {startIcon}
      <Text className="text-base font-medium">{children}</Text>
      {endIcon}
    </Pressable>
  );
}
