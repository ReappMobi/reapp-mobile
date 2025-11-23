import React from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

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
  const { width } = useWindowDimensions();

  const dynamicTextSize = width < 350 ? 'text-xs' : textSize || 'text-base';
  const dynamicIconSize = width < 350 ? 16 : 20;

  return (
    <Pressable
      style={[
        variant === 'contained' && shadowStyle,
        disabled && { opacity: 0.5 },
      ]}
      className={`${variantStyles.default} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
        ${customStyles} 
        flex-row items-center justify-center`}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      {startIcon && (
        <View className="mr-2">
          {React.cloneElement(startIcon as React.ReactElement, {
            size: dynamicIconSize,
          })}
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
