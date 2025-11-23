import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from 'src/constants/colors';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Política de Privacidade',
      headerBackVisible: true,
      headerTintColor: colors.primary,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 18,
        fontFamily: 'reapp_medium',
      },
    });
  }, [navigation]);

  const pdfUrl =
    'https://drive.google.com/uc?export=download&id=1JFzrN3mGUSaeRGfyJ7aiay79EEFLJT0h';
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: googleDocsUrl }}
        style={styles.webview}
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1, width: Dimensions.get('window').width },
});

export default PrivacyPolicyScreen;
