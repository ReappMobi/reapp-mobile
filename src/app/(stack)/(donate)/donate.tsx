import { router, useLocalSearchParams } from 'expo-router';
import { Banknote, Package } from 'lucide-react-native';
import { Alert, Linking, View } from 'react-native';
import DonationScreenImage from 'src/assets/images/DonationScreenImage.svg';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

const DonationPage = () => {
  const { institutionId, projectId, phone } = useLocalSearchParams();

  const handleInsumosDonation = () => {
    const phoneNumber = phone ? phone : '98986071896';

    const message =
      'Olá, estou vindo pelo Reapp e gostaria de realizar uma doação de insumos!';

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'Atenção',
        'Não foi possível abrir o WhatsApp. Verifique se ele está instalado no dispositivo.'
      );
    });
  };

  return (
    <View className="px-4 bg-white flex-1">
      <View className="items-center">
        <DonationScreenImage width={256} height={274.96} />
        <Text className="mb-4 text-center font-bold text-lg">
          Quer nos ajudar? Sinta-se livre com uma das opções abaixo
        </Text>
      </View>

      <View className="items-center gap-y-3">
        <View className="flex-row gap-x-1.5">
          <View className="w-2/4">
            <Button
              variant="outline"
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
              <Text className="text-text-neutral">Doação pontual</Text>

              <Icon as={Banknote} size={18} className="stroke-text-neutral" />
            </Button>
          </View>
        </View>

        <View className="flex-row gap-x-1.5">
          <View className="w-2/4">
            <Button
              variant="outline"
              className="gap-x-4"
              onPress={handleInsumosDonation}
            >
              <Text className="text-text-neutral">Insumos</Text>
              <Icon as={Package} size={18} className="stroke-text-neutral" />
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DonationPage;
