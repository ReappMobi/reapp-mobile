import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { ScreenContainer, Header, Input, Button } from 'src/components';
import Colors from 'src/constants/colors';

function DonationMethodScreen() {
  const [value, setValue] = useState(0);

  const handleChange = (value) => {
    const newValue = value.replace(/\D/g, '');

    setValue(newValue ? parseInt(newValue, 10) : 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  };

  return (
    <ScreenContainer>
      <View className="py-4">
        <Header
          leftComponent={
            <Ionicons name="chevron-back" size={24} color={Colors.text_dark} />
          }
          rightComponent={
            <Text className="font-_bold text-2xl uppercase text-text_primary">
              reapp
            </Text>
          }
        />

        <View className="items-center">
          <DonationTaxReceiptImage width={228} height={199} />
        </View>
        <View className="mb-4 mt-4 gap-y-3">
          <View>
            <Input
              placeholder="Digite o valor"
              value={formatCurrency(value)}
              onChangeText={handleChange}
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

        <Text className="mb-4 text-center font-_bold text-xl">
          Qual a forma de pagamento?
        </Text>

        <View className="gap-y-3 px-4">
          <View>
            <Button customStyles="justify-center">Crédito</Button>
          </View>
          <View>
            <Button customStyles="justify-center">Pix</Button>
          </View>

          <View>
            <Button customStyles="justify-center">Boleto</Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

export default DonationMethodScreen;
