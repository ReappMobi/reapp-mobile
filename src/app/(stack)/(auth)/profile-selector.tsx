import { router } from 'expo-router';
import HandHeart from 'lucide-react-native/dist/esm/icons/hand-heart';
import University from 'lucide-react-native/dist/esm/icons/university';
import { View } from 'react-native';
import ProfileSelectorPageImage from 'src/assets/images/ProfileSelectorPageImage.svg';
import { Button } from 'src/components/ui/button';
import { Icon } from 'src/components/ui/icon';
import { Text } from 'src/components/ui/text';
import { Separator } from '@/components/ui/separator';

export default function ProfileSelector() {
  const handleButtonClick = (to: 'donor' | 'institution') => {
    router.replace({ pathname: `sign-up-${to}` });
  };

  return (
    <View className="flex-1 items-center gap-y-8 bg-white p-4">
      <ProfileSelectorPageImage width={256} height={274.96} />
      <Text className="text-text-dark text-center font-bold text-base">
        Obrigado por escolher ser juntar a nós
      </Text>
      <View className="gap-y-4">
        <View>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onPress={() => handleButtonClick('donor')}
          >
            <Text> Sou um doador </Text>
            <Icon as={HandHeart} size={20} />
          </Button>
        </View>
        <View className="h-1">
          <Separator />
        </View>
        <View>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onPress={() => handleButtonClick('institution')}
          >
            <Text> Sou uma instituição </Text>
            <Icon as={University} size={18} />
          </Button>
        </View>
      </View>
    </View>
  );
}
