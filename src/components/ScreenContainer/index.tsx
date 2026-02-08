import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

function ScreenContainer({
  children,
  className,
  ...props
}: ScreenContainerProps) {
  return (
    <View className={cn('flex-1 bg-background px-4', className)} {...props}>
      {children}
    </View>
  );
}

export { ScreenContainer };
