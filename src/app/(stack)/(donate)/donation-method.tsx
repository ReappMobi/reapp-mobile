import { useLocalSearchParams } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { memo, useState } from 'react';
import { View, Alert } from 'react-native';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { Button, Input } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { requestPaymentUrl } from 'src/services/payment';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
};

const DonationValueInput = memo(function DonationValueInput({
  value,
  onChangeValue,
}: {
  value: number;
  onChangeValue: (val: number) => void;
}) {
  const handleChange = (text: string) => {
    const onlyNumbers = text.replace(/\D/g, '');
    onChangeValue(onlyNumbers ? parseInt(onlyNumbers, 10) : 0);
  };

  return (
    <Input
      placeholder="Digite o valor"
      value={formatCurrency(value)}
      onChangeText={handleChange}
      inputMode="decimal"
      customStyle="text-center text-text_neutral text-xl"
    />
  );
});

const DonationMethodPage = () => {
  const { institutionId, projectId } = useLocalSearchParams();
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const auth = useAuth();

  const requestPayment = async () => {
    const token = await auth.getToken();
    const data = {
      amount: value / 100,
      institutionId: Number(institutionId),
      description,
      projectId: Number(projectId),
    };

    const response = await requestPaymentUrl(data, token);
    if (response.error || response.statusCode === 500) {
      Alert.alert('Erro interno, tente novamente mais tarde.');
    } else {
      openBrowserAsync(response.result);
    }
  };

  return (
    <View className="px-4">
      <View className="items-center">
        <DonationTaxReceiptImage width={228} height={199} />
      </View>
      <View className="mb-4 mt-4 gap-y-3">
        <DonationValueInput value={value} onChangeValue={setValue} />
        <Input
          placeholder="Adicionar Descrição"
          customStyle="text-center text-xl"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Button
        customStyles="justify-center bg-color_primary"
        onPress={requestPayment}
        textColor="text-text_light"
      >
        Continuar
      </Button>
    </View>
  );
};
export default DonationMethodPage;
