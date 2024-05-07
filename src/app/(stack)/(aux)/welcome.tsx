import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import WelcomePageImage from 'src/assets/images/WelcomePageImage.svg';
import { Button } from 'src/components';
import colors from 'src/constants/colors';

export default function Welcome() {
  return (
    <View className="flex-1  items-center gap-y-8 bg-white p-4">
      <WelcomePageImage width={256} height={183} />
      <Text className="font-reapp_medium text-base">
        Somos uma organização que busca facilitar o encontro de doadores e
        parceiros com instituições beneficentes. Vamos começar?
      </Text>
      <Button
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.text_primary}
          />
        }
        customStyles="mt-8 w-64 justify-center gap-x-1"
        textColor="text-text_primary"
        textSize="text-lg"
        onPress={() => router.replace('/login-selector')}
      >
        Continuar
      </Button>
    </View>
  );
}
