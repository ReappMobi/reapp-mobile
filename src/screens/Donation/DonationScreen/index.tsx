import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import DonationScreenImaget from 'src/assets/images/DonationScreenImage.svg';
import { Button, Header, ScreenContainer } from 'src/components';
import Colors from 'src/constants/colors';

export default function DonationScreen() {
  return (
    <ScreenContainer>
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
        <DonationScreenImaget width={256} height={274.96} />
        <Text className="text-center font-_bold text-xl">
          Quer nos ajudar? Sinta-se livre com uma das opções abaixo
        </Text>
      </View>
      <View className="mt-4 flex-row justify-center gap-x-1.5">
        <View className="gap-y-3">
          <View>
            <Button customStyles="w-40 justify-center"> Doação fixa </Button>
          </View>

          <View>
            <Button customStyles="w-40 justify-center"> Nota Fiscal</Button>
          </View>
        </View>

        <View className="gap-y-3">
          <View>
            <Button customStyles="w-40 justify-center"> Doação pontual </Button>
          </View>

          <View>
            <Button customStyles="w-40 justify-center"> Insumos </Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
