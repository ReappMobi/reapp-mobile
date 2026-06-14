import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CircleX, X } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { DetailsForm } from '@/components/app/report/details-form';
import { ReasonsList } from '@/components/app/report/reasons-list';
import type { ReportStep } from '@/components/app/report/report.constants';
import { SuccessView } from '@/components/app/report/success-view';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { showToast } from '@/lib/toast-config';
import { useReportContent } from '@/services/report/report.service';
import type {
  ReportContentData,
  ReportReason,
} from '@/services/report/report.types';

export default function ReportScreen() {
  const params = useLocalSearchParams<{
    targetType: ReportContentData['targetType'];
    targetId: string;
    title?: string;
  }>();
  const targetType = params.targetType;
  const targetId = Number(params.targetId);
  const title = params.title ?? 'Denunciar';

  const [step, setStep] = useState<ReportStep>('reasons');
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null
  );
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [details, setDetails] = useState('');

  const { mutate } = useReportContent({
    onSuccess: () => {
      setStep('success');
    },
    onError: () => {
      setStep('reasons');
      showToast({
        type: 'error',
        header: 'Erro',
        description: 'Não foi possível enviar a denúncia.',
        icon: CircleX,
      });
    },
  });

  const handlePickReason = (reason: ReportReason, label: string) => {
    setSelectedReason(reason);
    setSelectedLabel(label);
    if (reason === 'OTHER') {
      setDetails('');
      setStep('details');
      return;
    }
    setStep('submitting');
    mutate({ targetType, targetId, reason, details: label });
  };

  const handleSubmitDetails = () => {
    if (!selectedReason) {
      return;
    }
    const trimmed = details.trim();
    setStep('submitting');
    mutate({
      targetType,
      targetId,
      reason: selectedReason,
      details: trimmed || selectedLabel,
    });
  };

  const handleClose = () => {
    router.back();
  };

  const handleBack = () => {
    if (step === 'details' || step === 'success') {
      setStep('reasons');
      return;
    }
    router.back();
  };

  const showInternalBack = step === 'details' || step === 'success';

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerTitle: title,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={handleBack} hitSlop={8}>
              <Icon
                as={showInternalBack ? ArrowLeft : X}
                size={24}
                className="stroke-foreground"
              />
            </Pressable>
          ),
          headerRight: showInternalBack
            ? () => (
                <Pressable onPress={handleClose} hitSlop={8}>
                  <Icon as={X} size={24} className="stroke-foreground" />
                </Pressable>
              )
            : undefined,
        }}
      />

      {step === 'reasons' && (
        <ReasonsList targetType={targetType} onPick={handlePickReason} />
      )}

      {step === 'details' && (
        <DetailsForm
          value={details}
          onChangeText={setDetails}
          onSubmit={handleSubmitDetails}
          placeholder={selectedLabel}
        />
      )}

      {step === 'submitting' && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" />
          <Text className="mt-3 text-sm text-gray-500">
            Enviando denúncia...
          </Text>
        </View>
      )}

      {step === 'success' && (
        <SuccessView targetType={targetType} onDone={handleClose} />
      )}
    </View>
  );
}
