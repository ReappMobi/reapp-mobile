import { Camera } from 'expo-camera';
import { MediaType, launchCameraAsync } from 'expo-image-picker';
import { Alert } from 'react-native';

type CallbackFn = (uri: string) => void;

const requestCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Precisamos de permissão para acessar a câmera.');
  }
};

const takePicture = async (mediaTypes: MediaType[], callback: CallbackFn) => {
  await requestCameraPermission();
  const result = await launchCameraAsync({
    mediaTypes,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    callback(result.assets[0].uri);
  }
};

export const useCamera = () => {
  return { takePicture };
};
