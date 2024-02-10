import { useFonts } from 'expo-font';
import { fonts } from 'src/constants/Fonts';
import { AuthProvider } from 'src/contexts/auth';
import Routes from 'src/routes';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
