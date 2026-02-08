import { router, Stack } from 'expo-router';
import { ChevronLeft, CircleEllipsis, X } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="create-post"
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="font-bold text-lg text-primary">
              Nova postagem
            </Text>
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.dismissAll()}>
              <Icon as={X} size={28} className="text-primary" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Icon as={CircleEllipsis} size={24} className="text-gray-300" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="post-comments/[id]"
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="font-bold text-lg text-primary">Comentários</Text>
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.dismissAll()}>
              <Icon as={ChevronLeft} size={28} className="text-primary" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
