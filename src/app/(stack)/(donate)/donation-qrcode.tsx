import { Camera, CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    getPermission();
  }, []);

  const handleBarcodeScanned = () => {
    setScanned(true);
    setModalVisible(true);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center">
        <Text>Solicitando permissão para acessar a câmera</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center">
        <Text style={{ textAlign: 'center' }}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <Button
          variant="secondary"
          className="mb-2"
          onPress={() => getPermission()}
        >
          <Text>Conceder permissão</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417'],
        }}
        style={{ flex: 1 }}
      >
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 items-center justify-center bg-gray-800 bg-opacity-50">
            <View className="w-80 rounded-lg bg-white p-6">
              <Text className="mb-4 text-lg font-bold">
                Nota fiscal escaneada
              </Text>

              <Button
                variant="secondary"
                className="mb-2"
                onPress={() => {
                  setScanned(false);
                  setModalVisible(false);
                }}
              >
                <Text>Escanear novamente</Text>
              </Button>
              <Button className="mb-2" onPress={() => router.back()}>
                <Text>Finalizar</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </CameraView>
    </View>
  );
}
