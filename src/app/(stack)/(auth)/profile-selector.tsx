import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { HandCoins, University } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';
import ProfileSelectorPageImage from 'src/assets/images/ProfileSelectorPageImage.svg';

const StyledProfileSelectorPageImage = cssInterop(ProfileSelectorPageImage, {
  className: 'style',
});

export default function ProfileSelector() {
  return (
    <View className="flex-1  items-center gap-y-2 bg-white p-4">
      <View className="gap-y-6 mt-12 mb-8 items-center">
        <StyledProfileSelectorPageImage className="w-64 h-64" />
        <Text
          variant="h3"
          className="text-text_neutral text-center font-reapp_bold"
        >
          Que bom ter você aqui!
        </Text>
      </View>
      <View className="gap-y-4">
        <Link href="/sign-up-donor" asChild replace>
          <Button
            variant="outline"
            className="w-64 justify-center h-12 items-center gap-x-2 border-text_neutral/30 border-2 active:border-text_neutral/60"
          >
            <Icon as={HandCoins} size={20} className="text-text_neutral/80" />
            <Text className="text-text_neutral/90">Sou Doador</Text>
          </Button>
        </Link>

        <Link href="/sign-up-institution" asChild replace>
          <Button
            variant="outline"
            className="w-64 justify-center gap-x-2 h-12 border-text_neutral/30 border-2 active:border-text_neutral/60"
          >
            <Icon as={University} size={20} className="text-text_neutral/80" />
            <Text className="text-text_neutral/90">Sou Instituição</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
