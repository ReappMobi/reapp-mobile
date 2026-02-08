import { LucideIcon, Plus } from 'lucide-react-native';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';

function ListHeeader({
  isMe,
  icon,
  title,
  onPressActionButton,
}: {
  isMe: boolean;
  icon: LucideIcon;
  title: string;
  onPressActionButton: VoidFunction;
}) {
  if (isMe) {
    return (
      <View className="mb-3 items-center justify-center">
        <Button
          variant="outline"
          className="w-full"
          onPress={onPressActionButton}
        >
          <Text>{title}</Text>
          <Icon as={icon} className="w-5 h-5" color={THEME.light.foreground} />
        </Button>
      </View>
    );
  }
  return null;
}

export { ListHeeader };
