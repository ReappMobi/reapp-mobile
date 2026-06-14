import { ChevronRight } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type {
  ReportContentData,
  ReportReason,
} from '@/services/report/report.types';
import { REPORT_REASONS, TARGET_NOUN } from './report.constants';

interface ReasonsListProps {
  targetType: ReportContentData['targetType'];
  onPick: (reason: ReportReason, label: string) => void;
}

export function ReasonsList({ targetType, onPick }: ReasonsListProps) {
  return (
    <ScrollView className="flex-1">
      <View className="px-4 pt-6 pb-4">
        <Text className="font-semibold text-lg text-foreground">
          Por que você está denunciando {TARGET_NOUN[targetType]}?
        </Text>
      </View>
      {REPORT_REASONS.map((reason, index) => (
        <Pressable
          key={`${reason.label}-${index}`}
          onPress={() => onPick(reason.value, reason.label)}
          className={cn(
            'flex-row items-center justify-between px-4 py-4 active:bg-gray-50',
            index !== REPORT_REASONS.length - 1 && 'border-b border-gray-100'
          )}
        >
          <Text className="flex-1 pr-3 text-base text-foreground">
            {reason.label}
          </Text>
          <Icon as={ChevronRight} size={18} className="stroke-gray-400" />
        </Pressable>
      ))}
    </ScrollView>
  );
}
