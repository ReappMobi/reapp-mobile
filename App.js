import { useFonts } from 'expo-font';

import { fonts } from './src/constants/Fonts';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return <SplashScreen />;
}
