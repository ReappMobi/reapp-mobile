import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create-post"
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="font-bold text-lg text-black">Nova postagem</Text>
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.dismissAll()}>
              <Ionicons name="close" size={28} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                size={24}
                color="#ccc"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="post-comments/[id]"
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="font-bold text-lg text-black">Comentários</Text>
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.dismissAll()}>
              <Ionicons name="chevron-back" size={28} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
