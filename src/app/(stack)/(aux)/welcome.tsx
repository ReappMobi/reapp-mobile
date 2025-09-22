import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import WelcomePageImage from 'src/assets/images/WelcomePageImage.svg';
import colors from 'src/constants/colors';

export default function Welcome() {
  return (
    <View className="flex-1 items-center gap-y-4 bg-white p-4">
      <WelcomePageImage width={256} height={183} />
      <Text variant="large" className="text-text_neutral">
        Somos uma organização que busca facilitar o encontro de doadores e
        parceiros com instituições beneficentes.
      </Text>
      <Text variant="large" className="self-start text-text_neutral">
        Vamos começar?
      </Text>
      <Button
        className="mt-8 w-full max-w-sm justify-center gap-x-0.5 h-12 bg-color_primary active:bg-color_secundary/90"
        onPress={() => router.replace('/sign-in')}
      >
        <Text className="text-white font-bold">Começar</Text>
        <Icon as={ChevronRight} size={18} color={colors.text_white} />
      </Button>
    </View>
  );
}
