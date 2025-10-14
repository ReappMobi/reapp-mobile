import {
  type ImagePickerAsset,
  type MediaType,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Alert } from 'react-native';

type CallbackFn = (asset: ImagePickerAsset) => void;

const requestCameraPermission = async () => {
  const { status } = await requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Precisamos de permissão para acessar a câmera.');
    return false;
  }
  return true;
};

const requestGalleryPermission = async () => {
  const { status } = await requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Precisamos de permissão para acessar a galeria.');
    return false;
  }
  return true;
};

const takePicture = async (mediaTypes: MediaType[], callback: CallbackFn) => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) { return; }

  const result = await launchCameraAsync({
    mediaTypes,
    allowsEditing: false,
    quality: 0.8,
  });

  if (!result.canceled) {
    callback(result.assets[0]);
  }
};

const pickMedia = async (mediaTypes: MediaType[], callback: CallbackFn) => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) { return; }

  const result = await launchImageLibraryAsync({
    mediaTypes,
    allowsEditing: false,
    quality: 0.8,
  });

  if (!result.canceled) {
    callback(result.assets[0]);
  }
};

export const useMediaPicker = () => {
  return { takePicture, pickMedia };
};
