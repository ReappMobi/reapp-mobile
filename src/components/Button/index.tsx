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
  textColor?: string;
  textSize?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({
  variant = 'contained',
  size = 'medium',
  startIcon,
  endIcon,
  children,
  customStyles,
  textColor,
  textSize,
  onPress,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        variant === 'contained' && shadowStyle,
        disabled && { opacity: 0.5 }, // Adiciona opacidade quando desabilitado
      ]}
      className={`${variantStyles.default} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${customStyles}`}
      onPress={disabled ? undefined : onPress} // Previne interação quando desativado
      disabled={disabled} // Desabilita o botão nativamente
    >
      {startIcon}
      <Text
        className={`font-reapp_medium ${textSize || 'text-base'} ${textColor}`}
      >
        {children}
      </Text>
      {endIcon}
    </Pressable>
  );
}
