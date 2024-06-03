import { router } from 'expo-router';
import { View } from 'react-native';
import DonationTaxReceiptImage from 'src/assets/images/DonationTaxReceiptImage.svg';
import { Button } from 'src/components';

const DonationQrCode = () => {
  return (
    <View className="px-4">
      <View className="items-center gap-y-4 pt-16">
        <DonationTaxReceiptImage width={228} height={199} />
        <View className="gap-y-2.5">
          <View>
            <Button customStyles="w-52 justify-center" textSize="text-sm">
              Adicionar nota manual
            </Button>
          </View>
          <View>
            <Button
              customStyles="w-52 justify-center"
              textSize="text-sm"
              onPress={() => {
                router.push('/donation-qrcode');
              }}
            >
              Ler QRCode
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DonationQrCode;
