import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Linking, Alert } from 'react-native';
import DonationScreenImage from 'src/assets/images/DonationScreenImage.svg';
import { Button } from 'src/components';

const DonationPage = () => {
  const { institutionId, projectId, phone } = useLocalSearchParams();

  const handleInsumosDonation = () => {
    const phoneNumber = phone ? phone : '98986071896';

    const message =
      'Olá, estou vindo pelo Reapp e gostaria de realizar uma doação de insumos!';

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'Atenção',
        'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.'
      );
    });
  };

  return (
    <View className="px-4">
      <View className="items-center">
        <DonationScreenImage width={256} height={274.96} />
        <Text className="mb-4 text-center font-reapp_bold text-lg">
          Quer nos ajudar? Sinta-se livre com uma das opções abaixo
        </Text>
      </View>

      <View className="items-center gap-y-3">
        <View className="flex-row gap-x-1.5">
          <View className="w-2/4">
            <Button
              customStyles="justify-center"
              onPress={() => {
                router.push({
                  pathname: '/donation-method',
                  params: {
                    institutionId,
                    projectId,
                  },
                });
              }}
            >
              Doação pontual
            </Button>
          </View>
        </View>

        <View className="flex-row gap-x-1.5">
          {/* 
          <View className="w-2/4">
            <Button
              customStyles="justify-center"
              onPress={() => {
                router.push('/donation-invoice');
              }}
            >
              Nota Fiscal
            </Button>
          </View>

          */}

          <View className="w-2/4">
            <Button
              customStyles="justify-center"
              onPress={handleInsumosDonation}
            >
              Insumos
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DonationPage;
