import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface TimelineRowProps {
  active: boolean;
  title: string;
  description: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export function TimelineRow({
  active,
  title,
  description,
  isFirst,
  isLast,
}: TimelineRowProps) {
  return (
    <View className="flex-row gap-3">
      <View className="items-center">
        <View
          className={cn(
            'h-3 w-3 rounded-full',
            active ? 'bg-primary' : 'bg-gray-300'
          )}
        />
        {!isLast && <View className="w-px flex-1 bg-gray-200" />}
      </View>
      <View
        className={cn('flex-1', isFirst ? 'pb-6' : '', isLast ? 'pb-2' : '')}
      >
        <Text className="font-semibold text-base text-foreground">{title}</Text>
        <Text className="mt-1 text-sm text-gray-500">{description}</Text>
      </View>
    </View>
  );
}
