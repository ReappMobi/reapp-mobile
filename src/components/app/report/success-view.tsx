import { Check } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { ReportContentData } from '@/services/report/report.types';
import { TARGET_NOUN_GENITIVE } from './report.constants';
import { TimelineRow } from './timeline-row';

interface SuccessViewProps {
  targetType: ReportContentData['targetType'];
  onDone: () => void;
}

export function SuccessView({ targetType, onDone }: SuccessViewProps) {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="px-4 pt-8 pb-4">
        <View className="items-center mb-6">
          <Animated.View
            entering={ZoomIn.duration(450).springify().damping(50)}
            className="h-20 w-20 items-center justify-center rounded-full bg-emerald-500"
          >
            <Animated.View
              entering={ZoomIn.delay(250).duration(250).damping(5)}
            >
              <Icon as={Check} size={44} className="stroke-white" />
            </Animated.View>
          </Animated.View>
        </View>
        <Text className="font-semibold text-xl text-foreground text-center">
          Denúncia enviada
        </Text>
        <Text className="mt-2 text-sm text-gray-500 text-center">
          Agradecemos a denúncia {TARGET_NOUN_GENITIVE[targetType]}. Você pode
          realizar outras ações enquanto aguarda nossa decisão.
        </Text>

        <View className="mt-6">
          <TimelineRow
            active
            title="Aguardando análise"
            description="Usamos uma combinação de tecnologia e equipes de análise para aplicar medidas contra qualquer coisa que não siga nossas diretrizes o mais rápido possível."
            isFirst
          />
          <TimelineRow
            active={false}
            title="Decisão tomada"
            description="Enviaremos uma notificação para você ver o resultado assim que possível."
            isLast
          />
        </View>
      </ScrollView>

      <View className="border-t border-gray-100 px-4 pt-3 pb-6">
        <Button onPress={onDone}>
          <Text>Concluir</Text>
        </Button>
      </View>
    </View>
  );
}
