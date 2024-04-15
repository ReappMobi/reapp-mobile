import { router } from 'expo-router';
import { View, Text } from 'react-native';
import DonationScreenImage from 'src/assets/images/DonationScreenImage.svg';
import { Button } from 'src/components';

const DonationPage = () => {
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
                router.push('/donation-method');
              }}
            >
              Doação fixa
            </Button>
          </View>

          <View className="w-2/4">
            <Button
              customStyles="justify-center"
              onPress={() => {
                router.push('/donation-method');
              }}
            >
              Doação pontual
            </Button>
          </View>
        </View>

        <View className="flex-row gap-x-1.5">
          <View className="w-2/4">
            <Button
              customStyles="justify-center"
              onPress={() => {
                router.push('/donation-qrcode');
              }}
            >
              Nota Fiscal
            </Button>
          </View>

          <View className="w-2/4">
            <Button customStyles="justify-center"> Insumos </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DonationPage;
