import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  ProfileSelectorScreen,
  SignUpPageScreen,
  WelcomeScreen,
  LoginPageScreen,
  ForgetPasswordResetScreen,
  ForgetPasswordScreen,
  IdentityVerificationScreen,
} from '../screens/Auth';

const Stack = createNativeStackNavigator();
export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: null, headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignupSplash" component={ProfileSelectorScreen} />
      <Stack.Screen name="SignUpDonor" component={SignUpPageScreen} />
      <Stack.Screen name="SignUpInstitution" component={SignUpPageScreen} />
      <Stack.Screen name="LoginScreen" component={LoginPageScreen} />
      <Stack.Screen
        name="IdentityVerificationScreen"
        component={IdentityVerificationScreen}
      />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name="ForgetPasswordResetScreen"
        component={ForgetPasswordResetScreen}
      />
    </Stack.Navigator>
  );
}
