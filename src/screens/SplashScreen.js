import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SplashScreenImage from '../assets/images/SplashScreenImage.svg';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';

function SplashScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>REAPP</Text>
      </View>

      <View style={styles.main}>
        <SplashScreenImage
          style={styles.illustration}
          width={256}
          height={183}
        />
        <Text style={styles.introduction}>
          Somos uma organização que busca facilitar o encontro de doadores e
          parceiros com instituições beneficentes. Vamos começar?
        </Text>

        <Button>Continuar</Button>
      </View>
    </ScreenContainer>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  title: {
    color: Colors.text_primary,
    fontFamily: 'poppins-bold',
    fontSize: 24,
  },

  main: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 32,
  },

  illustration: {},

  introduction: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    justifyContent: 'flex-start',
  },
});
