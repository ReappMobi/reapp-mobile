import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface LoadingBoxProps {
  customStyle?: string;
}

export function LoadingBox({ customStyle }: LoadingBoxProps) {
  return (
    <View className={cn('h-20 w-full animate-pulse rounded-lg bg-slate-200', customStyle)} />
  );
}
