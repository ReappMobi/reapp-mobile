import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import ButtonFacebookSignUp from '../components/ButtonFacebookSignUp';
import ButtonGoogleSignUp from '../components/ButtonGoogleSignUp';
import ConfirmButton from '../components/ConfirmButton';
import Input from '../components/Input';
import Colors from '../constants/Colors';

function SignUpPageScreen() {
  return (
    <ScrollView>
      <View style={styles.SignUpPage}>
        <View style={styles.header}>
          <Text style={styles.title}>REAPP</Text>
        </View>

        <View style={styles.main}>
          <View style={styles.signUpForm}>
            <View style={styles.signUpGoogleFacebook}>
              <ButtonFacebookSignUp />
              <ButtonGoogleSignUp />
            </View>

            <Text style={styles.signUpEmailText}>
              Ou cadastre-se com seu email
            </Text>

            <View style={styles.inputEmail}>
              <Text style={styles.label}>Email</Text>
              <Input placeholder="exemplo@dominio.com" inputMode="email" />
            </View>

            <View style={styles.inputName}>
              <Text style={styles.label}>Nome de usuário</Text>
              <Input placeholder="Nome" inputMode="text" />
            </View>

            <View style={styles.inputPhone}>
              <Text style={styles.label}>Telefone</Text>
              <Input placeholder="(00) 0000-0000" inputMode="tel" />
            </View>

            <View style={styles.inputPassword}>
              <Text style={styles.label}>Senha</Text>
              <Input
                placeholder="Senha (mínimo 8 caracteres)"
                secureTextEntry
              />
            </View>

            <View style={styles.inputPasswordConfirm}>
              <Text style={styles.label}>Confirmar senha</Text>
              <Input
                placeholder="Senha (mínimo 8 caracteres)"
                secureTextEntry
              />
            </View>

            <View style={styles.buttonConfirm}>
              <ConfirmButton />
            </View>

            <Text style={styles.loginText}>
              Já possui uma conta?{' '}
              <Text style={styles.loginTextSpan}>Entrar</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUpPageScreen;

const styles = StyleSheet.create({
  SignUpPage: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.color_white,
    flexDirection: 'column',
    marginTop: 30,
  },

  header: {
    justifyContent: 'flex-start',
  },

  title: {
    color: Colors.text_primary,
    fontFamily: 'poppins-bold',
    fontSize: 24,
  },

  main: {
    padding: 8,
  },

  signUpForm: {
    gap: 12,
  },

  signUpGoogleFacebook: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },

  signUpEmailText: {
    fontFamily: 'poppins-medium',
    fontSize: 12,
    textAlign: 'center',
  },

  loginText: {
    textAlign: 'center',
    fontFamily: 'poppins-regular',
    fontSize: 15,
    color: Colors.text_dark,
  },

  loginTextSpan: {
    color: Colors.text_primary,
    textDecorationLine: 'underline',
  },

  label: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
  },
});
