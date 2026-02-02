import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import DefaultAvatar from '@/assets/images/avatar.png';
import { cn } from '@/lib/utils';
import { RequestMedia } from '@/services/account';

export type RequestMediaExtended = RequestMedia & {
  uri: string;
  width?: number;
  height?: number;
};

interface AvatarPickerProps {
  onImageSelected: (image: RequestMediaExtended | null) => void;
  className?: string;
}

export function AvatarPicker({
  onImageSelected,
  className,
}: AvatarPickerProps) {
  const [media, setMedia] = useState<RequestMediaExtended | null>(null);

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // TODO: Handle permission denied if needed, maybe a toast or alert
    }
  };

  const pickImage = async () => {
    await requestGalleryPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, fileName, mimeType, fileSize, width, height } =
        result.assets[0];
      const newMedia = {
        uri,
        name: fileName || 'upload.jpg',
        type: mimeType || 'image/jpeg',
        size: fileSize || 0,
        width,
        height,
      };
      setMedia(newMedia);
      onImageSelected(newMedia);
    }
  };

  return (
    <Pressable
      className={cn('relative h-20 w-20 rounded-full bg-secondary', className)}
      onPress={pickImage}
    >
      <Image
        source={media?.uri ? { uri: media.uri } : DefaultAvatar}
        className="h-full w-full rounded-full border-2 border-border"
        resizeMode="cover"
      />

      <View className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary border border-white">
        <Ionicons name="camera" size={16} color="white" />
      </View>
    </Pressable>
  );
}
