import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { Button, Input } from 'src/components';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
};

const DonationMethodPage = () => {
  const [value, setValue] = useState(0);

  const handleNavigate = () => {
    router.replace({
      pathname: '/donation-confirm',
      params: { value: formatCurrency(value) },
    });
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
          />
        </View>
      </View>

      <Text className="mb-4 text-center font-reapp_bold text-xl">
        Qual a forma de pagamento?
      </Text>

      <View className="gap-y-3 px-4">
        <View>
          <Button customStyles="justify-center" onPress={handleNavigate}>
            Crédito
          </Button>
        </View>
        <View>
          <Button customStyles="justify-center" onPress={handleNavigate}>
            Pix
          </Button>
        </View>
        <View>
          <Button customStyles="justify-center" onPress={handleNavigate}>
            Boleto
          </Button>
        </View>
      </View>
    </View>
  );
};
export default DonationMethodPage;
