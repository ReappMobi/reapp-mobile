import { router } from 'expo-router';
import { View } from 'react-native';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const DonationQrCode = () => {
  return (
    <View className="px-4">
      <View className="items-center gap-y-4 pt-16">
        <DonationTaxReceiptImage width={228} height={199} />
        <View className="gap-y-2.5">
          <View>
            <Button size="sm" className="w-52">
              <Text>Adicionar nota manual</Text>
            </Button>
          </View>
          <View>
            <Button
              size="sm"
              className="w-52"
              onPress={() => {
                router.push('/donation-qrcode');
              }}
            >
              <Text>Ler QRCode</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DonationQrCode;
