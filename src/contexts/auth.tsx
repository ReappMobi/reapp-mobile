import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { AccountType, SignInData, SignUpData } from 'src/types';
import { RequestMedia } from 'src/types/RequestMedia';

import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: AccountType;
  isDonor: boolean | null;
  token: string | null;
  signIn(data: SignInData): Promise<any>;
  signInGoogle(data: any): Promise<any>;
  signOut(): Promise<void>;
  signUp(data: SignUpData, media: RequestMedia | null): Promise<any>;
  donnorSignUpGoogle(data: any): Promise<any>;
  getToken(): Promise<string | null>;
  saveUserAndToken(user: any, token: string): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDonor, setIsDonor] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
        const storagedIsDonor = await AsyncStorage.getItem('@RNAuth:isDonor');
        const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

        if (!storagedUser || !storagedToken) {
          throw new Error('No user data');
        }

        const decodedToken = jwtDecode(storagedToken);
        const currentTime = Date.now() / 1000;

        if (!decodedToken || decodedToken.exp < currentTime) {
          throw new Error('Token expired');
        }

        console.log(storagedUser);

        setUser(JSON.parse(storagedUser));
        setIsDonor(JSON.parse(storagedIsDonor));
        setToken(storagedToken);
      } catch (e) {
        console.log(e);
        await AsyncStorage.clear();
        setUser(null);
        setIsDonor(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  // TODO: type user
  async function saveUserAndToken(user: AccountType, token: string) {
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user));
    await AsyncStorage.setItem('@RNAuth:token', token);
    await AsyncStorage.setItem(
      '@RNAuth:isDonor',
      JSON.stringify(user.accountType === 'DONOR')
    );

    console.debug(user, token);
    setUser(user);
    setIsDonor(user.accountType === 'DONOR');
    setToken(token);
  }

  async function signIn(data: SignInData) {
    const response = await auth.SignIn(data);
    if (response.user) {
      await saveUserAndToken(response.user, response.token);
    }
  }

  // TODO: type data
  async function signInGoogle(data) {
    const response = await auth.SignInGoogle(data);
    if (response.user) {
      await saveUserAndToken(response.user, response.token);
    }

    return response;
  }

  async function signUp(data: SignUpData, media: RequestMedia) {
    const response = await auth.SignUp(data, media);
    return response;
  }

  async function donnorSignUpGoogle(data: any) {
    const response = await auth.SignUpDonnorGoogle(data);
    return response;
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
    setIsDonor(null);
    setToken(null);
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
        token,
        signIn,
        signInGoogle,
        signOut,
        signUp,
        donnorSignUpGoogle,
        getToken,
        saveUserAndToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
