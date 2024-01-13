import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

Splash.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
