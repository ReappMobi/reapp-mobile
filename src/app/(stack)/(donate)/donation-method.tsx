import { useLocalSearchParams } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { Input } from 'src/components';
import { useRequestPaymentUrl } from 'src/services/payment/service';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const DonationMethodPage = () => {
  const { institutionId, projectId } = useLocalSearchParams();
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const { mutateAsync: requestUrl, isPending: loading } =
    useRequestPaymentUrl();

  const requestPayment = async () => {
    if (value < 10 || description.length > 25) {
      Alert.alert('Por favor, preencha os campos corretamente.');
      return;
    }

    try {
      const data = {
        amount: value / 100,
        institutionId: Number(institutionId),
        description,
        projectId: Number(projectId),
      };

      const response = await requestUrl(data);

      if (response.error || response.statusCode === 500) {
        Alert.alert('Erro interno, tente novamente mais tarde.');
      } else {
        await openBrowserAsync(response);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ocorreu um erro ao processar sua doação.');
    }
  };

  return (
    <View className="px-4">
      <View className="items-center">
        <DonationTaxReceiptImage width={228} height={199} />
      </View>

      <View className="mb-4 mt-4 gap-y-3">
        <View className="rounded-lg border border-gray-300">
          <CurrencyInput
            value={value / 100}
            onChangeValue={(val) => setValue(val ? Math.round(val * 100) : 0)}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            maxValue={1000000}
            placeholder="R$ 0,00"
            style={{
              textAlign: 'center',
              fontSize: 20,
              padding: 16,
            }}
            placeholderTextColor="#6B7280"
          />
        </View>

        <View>
          <Input
            placeholder="Adicionar Descrição"
            customStyle="text-center text-xl"
            value={description}
            onChangeText={setDescription}
            maxLength={25}
          />
          <View className="mt-1 flex-row justify-between px-2">
            <Text className="text-sm text-gray-500">
              {description.length}/25 caracteres
            </Text>
            {description.length > 25 && (
              <Text className="text-sm text-red-500">
                Máximo de caracteres atingido
              </Text>
            )}
          </View>
        </View>
      </View>

      <Button
        className="w-full"
        onPress={requestPayment}
        disabled={loading || value < 10 || description.length > 25}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text>Continuar</Text>
        )}
      </Button>
    </View>
  );
};

export default DonationMethodPage;