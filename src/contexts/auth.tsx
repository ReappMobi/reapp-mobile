import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { AccountType, SignInData } from 'src/types';

import * as auth from '../services/auth';
import 'core-js/stable/atob';

interface AuthContextData {
  signed: boolean;
  user: AccountType;
  isDonor: boolean | null;
  signIn(data: any): Promise<any>;
  signInGoogle(data: any): Promise<any>;
  signOut(): void;
  donnorSignUp(data: any): Promise<any>;
  donnorSignUpGoogle(data: any): Promise<any>;
  institutionSignUp(data: any): Promise<any>;
  getToken(): Promise<string | null>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDonor, setIsDonor] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
        const storagedIsDonor = await AsyncStorage.getItem('@RNAuth:isDonor');
        const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

        if (storagedUser && storagedToken) {
          const decodedToken = jwtDecode(storagedToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            setUser(JSON.parse(storagedUser));
            setIsDonor(JSON.parse(storagedIsDonor));
          } else {
            await AsyncStorage.clear();
            setUser(null);
            setIsDonor(null);
          }
        } else {
          await AsyncStorage.clear();
          setUser(null);
          setIsDonor(null);
        }
      } catch (e) {
        console.error('Erro ao carregar dados do armazenamento', e);
        await AsyncStorage.clear();
        setUser(null);
        setIsDonor(null);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(data: SignInData) {
    console.log(' SignInData: ', data);
    const response = await auth.SignIn(data);

    if (response.user !== undefined) {
      setUser(response.user);
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@RNAuth:token', response.token);
      await AsyncStorage.setItem(
        '@RNAuth:isDonor',
        JSON.stringify(data.user.accountType === 'DONOR')
      );
    }

    return response;
  }

  // TODO: type data
  async function signInGoogle(data) {
    const response = await auth.SignInGoogle(data);
    if (response.user !== undefined) {
      setUser(response.user);
      setIsDonor(true);
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@RNAuth:token', response.token);
      await AsyncStorage.setItem('@RNAuth:isDonor', JSON.stringify(true));
    }

    return response;
  }

  async function donnorSignUp(data: any) {
    const response = await auth.SignUpDonnor(data);
    return response;
  }

  async function donnorSignUpGoogle(data: any) {
    const response = await auth.SignUpDonnorGoogle(data);
    return response;
  }

  async function institutionSignUp(data: any) {
    const response = await auth.SignUpInstitution(data);
    return response;
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function getToken() {
    const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
    return storagedToken;
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        isDonor,
        signIn,
        signInGoogle,
        signOut,
        donnorSignUp,
        donnorSignUpGoogle,
        institutionSignUp,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
