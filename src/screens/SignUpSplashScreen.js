import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SignUpSplashScreenImage from '../assets/images/SignUpSplashScreenImage.svg';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';

export default function SignUpSplashScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>REAPP</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.illustration}>
          <SignUpSplashScreenImage width={256} height={274.96} />
        </View>

        <View style={styles.AccountTypeForm}>
          <Text style={styles.introduceText}>
            Obrigado por escolher ser juntar a nós
          </Text>

          <View style={styles.buttons}>
            <Button
              endIcon={
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.text_neutral}
                />
              }
            >
              <Text style={styles.buttonText}>Sou doador</Text>
            </Button>
            <Button
              endIcon={
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.text_neutral}
                />
              }
            >
              <Text style={styles.buttonText}>Sou Instituição</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  SignUpSplash: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    padding: 16,
    backgroundColor: Colors.color_white,
  },

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
    gap: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },

  AccountTypeForm: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  introduceText: {
    fontFamily: 'poppins-bold',
    fontSize: 16,
    color: Colors.text_dark,
  },

  buttons: {
    gap: 16,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    color: Colors.text_neutral,
  },
});
