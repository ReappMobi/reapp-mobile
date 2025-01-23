import { useLocalSearchParams } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { Button, Input } from 'src/components';
import { DonationValueInput } from 'src/components/DonationValueInput';
import { useAuth } from 'src/hooks/useAuth';
import { requestPaymentUrl } from 'src/services/payment';

const DonationMethodPage = () => {
  const { institutionId, projectId } = useLocalSearchParams();

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState('');
  const auth = useAuth();

  const requestPayment = async () => {
    setLoading(true);
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
      openBrowserAsync(response);
    }
    setLoading(false);
  };

  return (
    <View className="px-4">
      <View className="items-center">
        <DonationTaxReceiptImage width={228} height={199} />
      </View>

      <View className="mb-4 mt-4 gap-y-3">
        <DonationValueInput
          value={value}
          onChangeValue={setValue}
          placeholder="Digite o valor"
          style={{ textAlign: 'center', fontSize: 20 }}
        />
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
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          'Continuar'
        )}
      </Button>
    </View>
  );
};

export default DonationMethodPage;
