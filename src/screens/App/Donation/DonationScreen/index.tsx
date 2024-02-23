import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { View, Text } from 'react-native';
import DonationScreenImaget from 'src/assets/images/DonationScreenImage.svg';
import { Button, Header, ScreenContainer } from 'src/components';
import Colors from 'src/constants/colors';

export default function DonationScreen({ navigation }) {
  return (
    <ScreenContainer>
      <View className="py-4">
        <Header
          leftComponent={
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.text_dark}
              onPress={() => navigation.goBack()}
            />
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
        <View className="mt-4 items-center gap-y-3">
          <View className="flex-row gap-x-1.5">
            <View className="w-2/4">
              <Button
                customStyles="justify-center"
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('DonationMethodScreen')
                  );
                }}
              >
                {' '}
                Doação fixa{' '}
              </Button>
            </View>

            <View className="w-2/4">
              <Button
                customStyles="justify-center"
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('DonationTaxReceiptScreen')
                  );
                }}
              >
                {' '}
                Doação pontual
              </Button>
            </View>
          </View>

          <View className="flex-row gap-x-1.5">
            <View className="w-2/4">
              <Button
                customStyles="justify-center"
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('DonationMethodScreen')
                  );
                }}
              >
                {' '}
                Nota Fiscal{' '}
              </Button>
            </View>

            <View className="w-2/4">
              <Button customStyles="justify-center"> Insumos </Button>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
