import {
  launchImageLibraryAsync,
  MediaType,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Alert } from 'react-native';

const requestGalleryPermission = async () => {
  const { status } = await requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Precisamos de permissão para acessar a galeria.');
  }
};

type CallbackFn = (uri: string) => void;
const pickMedia = async (mediaTypes: MediaType[], callback: CallbackFn) => {
  await requestGalleryPermission();
  const result = await launchImageLibraryAsync({
    mediaTypes,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    callback(result.assets[0].uri);
  }
};

export const useGallery = () => {
  return { pickMedia };
};
