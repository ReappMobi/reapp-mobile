import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text } from 'react-native';

import SignUpSplashScreenImage from '../assets/images/SignUpSplashScreenImage.svg';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import { styles } from '../styles';

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
