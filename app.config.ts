import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const isProduction = process.env.NODE_ENV === 'production';
  const packageIdentifier = isProduction
    ? 'com.coperativadigital.reapp'
    : 'com.coperativadigital.reapp.development';
  return {
    ...config,
    name: isProduction ? 'Reapp' : 'Reapp (Dev)',
    slug: 'reapp',
    scheme: 'reapp',
    version: '2.3.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: packageIdentifier,
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
      package: packageIdentifier,
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-web-browser',
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
      [
        '@sentry/react-native/expo',
        {
          url: 'http://reapp-glitchtip-57a32f-212-85-0-19.traefik.me/',
          project: 'reapp',
          organization: 'reapp',
        },
      ],

    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'e24449cc-1409-49b2-b658-e0e24666d5a9',
      },
    },
  };
};
