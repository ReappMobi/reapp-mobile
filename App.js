import { useFonts } from 'expo-font';

import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <SplashScreen />;
}
