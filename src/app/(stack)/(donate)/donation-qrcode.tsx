import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'src/components';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  if (!permission) {
    return <View />;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    setScanned(true);
    setModalVisible(true);
  };

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text style={{ textAlign: 'center' }}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <Button
          onPress={requestPermission}
          customStyles="mb-2 justify-center bg-color_third"
        >
          Conceder permissão
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center">
      <Camera
        key={scanned ? 'scanned' : 'not-scanned'}
        style={{ flex: 1 }}
        type={CameraType.back}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
                textColor="text-white"
                customStyles="mb-2 justify-center bg-color_third"
                onPress={() => {
                  setScanned(false);
                  setModalVisible(false);
                }}
              >
                Escanear novamente
              </Button>
              <Button
                customStyles="mb-2 justify-center"
                onPress={() => router.back()}
              >
                Finalizar
              </Button>
            </View>
          </View>
        </Modal>
      </Camera>
    </View>
  );
}
