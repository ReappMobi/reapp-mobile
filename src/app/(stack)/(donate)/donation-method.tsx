import { openBrowserAsync } from 'expo-web-browser';
import { useState } from 'react';
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

const DonationMethodPage = () => {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const { user } = useAuth();

  const requestPayment = async () => {
    //TODO: call apropriate endpoint, if is a donation for a institution, project or general
    const data = {
      price: value / 100,
      userId: user.id,
      institutionId: 1,
      description,
    };

    const response = await requestPaymentUrl(data);

    if (response.error) {
      Alert.alert('Erro interno, tente novamente mais tarde.');
    } else {
      openBrowserAsync(response.result);
    }
  };

  const handleChange = (value: string) => {
    const newValue = value.replace(/\D/g, '');
    setValue(newValue ? parseInt(newValue, 10) : 0);
  };

  return (
    <View className="px-4">
      <View className="items-center">
        <DonationTaxReceiptImage width={228} height={199} />
      </View>
      <View className="mb-4 mt-4 gap-y-3">
        <View>
          <Input
            placeholder="Digite o valor"
            value={formatCurrency(value)}
            onChangeText={handleChange}
            inputMode="decimal"
            customStyle="text-center text-text_neutral text-xl"
          />
        </View>
        <View>
          <Input
            placeholder="Adicionar Descrição"
            customStyle="text-center text-xl"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      <View>
        <Button
          customStyles="justify-center bg-color_primary"
          onPress={requestPayment}
          textColor="text-text_light"
        >
          Continuar
        </Button>
      </View>
    </View>
  );
};
export default DonationMethodPage;
