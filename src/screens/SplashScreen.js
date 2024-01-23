import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SplashScreenImage from '../assets/images/SplashScreenImage.svg';
import Button from '../components/Button';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';

function SplashScreen() {
  return (
    <ScreenContainer>
      <Header
        color={Colors.text_neutral}
        leftComponent={
          <Text className="text-2xl font-bold uppercase text-color_secundary">
            reapp
          </Text>
        }
      />

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

        <Button
          backgroundColor="white"
          customStyles="justify-center gap-x-1"
          endIcon={
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_primary}
            />
          }
        >
          Continuar
        </Button>
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
    fontFamily: 'bold',
    fontSize: 24,
  },

  main: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 32,
  },

  introduction: {
    fontFamily: 'medium',
    fontSize: 16,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 16,
    fontFamily: 'regular',
    color: Colors.text_neutral,
  },
});
