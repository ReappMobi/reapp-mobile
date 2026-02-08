import { Image } from 'expo-image';
import { Building2, Sprout } from 'lucide-react-native';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

type ExploreSearchItemProps = {
  image: string;
  title: string;
  blurhash: string;
  type: 'project' | 'institution';

  onPress: () => void;
};

const ExploreSearchItem = ({
  image,
  blurhash,
  title,
  type,
  onPress,
}: ExploreSearchItemProps) => (
  <Button
    variant="ghost"
    onPress={onPress}
    className="justify-start flex-row items-center gap-x-2 py-4 px-2 h-14"
  >
    <View className="h-9 w-9 bg-muted rounded-full items-center justify-center relative">
      <Image
        className="w-full h-full rounded-full z-10"
        source={image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <Icon
        as={type === 'institution' ? Building2 : Sprout}
        className="text-muted-foreground w-4 h-4 absolute"
      />
    </View>
    <Text className="font-medium">{title}</Text>
  </Button>
);

export { ExploreSearchItem };
