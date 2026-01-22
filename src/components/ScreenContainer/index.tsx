import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export default function ScreenContainer({ children, className }: ViewProps) {
  return (
    <View className={cn('flex-1 bg-background px-4', className)}>
      {children}
    </View>
  );
}
