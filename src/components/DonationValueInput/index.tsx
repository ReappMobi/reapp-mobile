import { memo } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

type DonationValueInputProps = Omit<
  TextInputProps,
  'value' | 'onChangeText'
> & {
  value: number;
  onChangeValue: (val: number) => void;
};

export const DonationValueInput = memo(function DonationValueInput({
  value,
  onChangeValue,
  ...rest
}: DonationValueInputProps) {
  const formatCurrency = (valueInCents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueInCents / 100);
  };

  const handleChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, '');
    const newValueInCents = digitsOnly ? Number.parseInt(digitsOnly, 10) : 0;
    onChangeValue(newValueInCents);
  };

  return (
    <TextInput
      {...rest}
      keyboardType="numeric"
      onChangeText={handleChange}
      value={formatCurrency(value)}
    />
  );
});
