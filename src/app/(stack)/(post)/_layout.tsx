import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Link, Stack } from 'expo-router';
import { X } from 'lucide-react-native';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: true,
        headerTitle: 'Nova postagem',
        animation: 'slide_from_right',
        headerLeft: () => (
          <Link href="/" asChild>
            <Button variant="ghost" className="px-2 rounded-full">
              <Icon as={X} size={24} />
            </Button>
          </Link>
        ),
      }}
    />
  );
}
