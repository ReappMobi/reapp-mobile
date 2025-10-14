const IS_DEV = process.env.APP_VARIANT === 'development';

console.log(IS_DEV);
export default {
  expo: {
    newArchEnabled: true,
    name: IS_DEV ? 'Reapp Dev' : 'Reapp',
    slug: 'reapp',
    scheme: 'reapp',
    version: '1.3.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV
        ? 'com.coperativadigital.reapp-dev'
        : 'com.coperativadigital.reapp',
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
      ],
      package: IS_DEV
        ? 'com.coperativadigital.reappdev'
        : 'com.coperativadigital.reapp',
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: 'com.googleusercontent.apps.reaap',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Permitir que Reapp acesse a câmera',
          microphonePermission: 'Permitir que Reapp acesse o microfone',
          recordAudioAndroid: true,
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'Permitir que Reapp acesse suas fotos',
        },
      ],
      'expo-font',
    ],
    extra: {
      router: {
        origin: false,
      },
    },
  },
};
