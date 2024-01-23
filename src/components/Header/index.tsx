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
      className={`p-4 w-full min-h-[56] flex-row justify-between items-center bg-[${color}]`}
    >
      {leftComponent || <View />}
      {centerComponent || <View />}
      {rightComponent || <View />}
    </View>
  );
}
