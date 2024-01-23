import React from 'react';
import { View } from 'react-native';

type Props = {
  leftComponent: JSX.Element;
  rightComponent: JSX.Element;
  centerComponent: JSX.Element;
  color: string;
};

export default function Header({
  leftComponent,
  rightComponent,
  centerComponent,
  color = 'transparent',
}: Props) {
  return (
    <View
      className={`min-h-[56] w-full flex-row items-center justify-between p-4 bg-[${color}]`}
    >
      {leftComponent || <View />}
      {centerComponent || <View />}
      {rightComponent || <View />}
    </View>
  );
}
