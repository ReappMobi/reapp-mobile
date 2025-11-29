import { Stack } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from 'src/constants/colors';

const PrivacyPolicyScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const pdfUrl =
    'https://drive.google.com/uc?export=download&id=1QKwgcPY1RZY5Trt_ZeE9VhOT8-l_Xp0L';

  const uri = Platform.select({
    ios: pdfUrl,
    android: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`,
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: 'Política de Privacidade',
          headerBackVisible: true,
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'reapp_medium',
          },
        }}
      />

      <View className="flex-1 relative">
        <WebView
          source={{ uri: uri }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          originWhitelist={['*']}
          showsVerticalScrollIndicator={false}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 10,
  },
});

export default PrivacyPolicyScreen;
