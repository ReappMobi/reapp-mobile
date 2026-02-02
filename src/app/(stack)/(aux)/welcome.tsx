import { router } from 'expo-router';
import ChevronRight from 'lucide-react-native/dist/esm/icons/chevron-right';
import { View } from 'react-native';
import WelcomePageImage from 'src/assets/images/WelcomePageImage.svg';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export default function Welcome() {
  return (
    <View className="flex-1 items-center gap-y-8 bg-white p-4">
      <WelcomePageImage width={256} height={183} />
      <Text className="font-medium text-base">
        Somos uma organização que busca facilitar o encontro de doadores e
        parceiros com instituições beneficentes. Vamos começar?
      </Text>
      <Button
        onPress={() => router.replace('/sign-in')}
        size="lg"
        className="w-full gap-1"
      >
        <Text> Continuar </Text>
        <Icon as={ChevronRight} color={'white'} size={16} />
      </Button>
    </View>
  );
}
