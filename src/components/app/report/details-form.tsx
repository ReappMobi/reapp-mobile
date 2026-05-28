import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface DetailsFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder: string;
}

export function DetailsForm({
  value,
  onChangeText,
  onSubmit,
  placeholder,
}: DetailsFormProps) {
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerClassName="px-4 py-6"
        keyboardShouldPersistTaps="handled"
        bottomOffset={16}
      >
        <Text className="font-semibold text-lg text-foreground">
          Conte mais sobre o problema
        </Text>
        <Text className="mt-3 text-sm text-gray-500">
          Opcional. Descreva o motivo da denúncia com mais detalhes. Sua
          denúncia continua anônima.
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={250}
          textAlignVertical="top"
          className="mt-6 min-h-32 rounded-md border border-input bg-background px-3 py-3 text-base text-foreground"
        />
        <Text className="mt-2 text-xs text-gray-400 text-right">
          {value.length}/250
        </Text>
      </KeyboardAwareScrollView>

      <View className="border-t border-gray-100 px-4 pt-3 pb-6">
        <Button onPress={onSubmit}>
          <Text>Enviar denúncia</Text>
        </Button>
      </View>
    </View>
  );
}
