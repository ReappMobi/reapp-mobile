import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { IUser } from '../mocks/user-data';
import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  signIn(): Promise<any>;
  signInInstitution(data: any): Promise<any>;
  signOut(): void;
  donnorSignUp(data: any): Promise<any>;
  institutionSignUp(data: any): Promise<any>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.SignIn();
    setUser(response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
    return response;
  }

  async function signInInstitution(data) {
    const response = await auth.SignInInstitution(data);
    if (response.user !== undefined) {
      setUser(response.user);
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@RNAuth:token', response.token);
    }
    return response;
  }

  async function donnorSignUp(data: any) {
    const response = await auth.SignUpDonnor(data);
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
        signIn,
        signInInstitution,
        signOut,
        donnorSignUp,
        institutionSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
