import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import type { AccountType } from 'src/types';
import { THEME } from '@/lib/theme';

interface AuthContextData {
  signed: boolean;
  user: AccountType | null;
  isDonor: boolean | null;
  token: string | null;
  signOut(): Promise<void>;
  saveUserAndToken(user: AccountType, token: string): Promise<void>;
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
        const [storagedUser, storagedIsDonor, storagedToken] =
          await Promise.all([
            AsyncStorage.getItem('@RNAuth:user'),
            AsyncStorage.getItem('@RNAuth:isDonor'),
            AsyncStorage.getItem('@RNAuth:token'),
          ]);

        if (storagedUser && storagedToken) {
          const decodedToken = jwtDecode(storagedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error('Token expired');
          }

          setUser(JSON.parse(storagedUser));

          setIsDonor(storagedIsDonor ? JSON.parse(storagedIsDonor) : null);

          setToken(storagedToken);
        }
      } catch {
        await AsyncStorage.multiRemove([
          '@RNAuth:user',
          '@RNAuth:isDonor',
          '@RNAuth:token',
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function saveUserAndToken(user: AccountType, token: string) {
    const isDonorValue = user.accountType === 'DONOR';

    await Promise.all([
      AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user)),
      AsyncStorage.setItem('@RNAuth:token', token),
      AsyncStorage.setItem('@RNAuth:isDonor', JSON.stringify(isDonorValue)),
    ]);

    setUser(user);
    setIsDonor(isDonorValue);
    setToken(token);
  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      '@RNAuth:user',
      '@RNAuth:isDonor',
      '@RNAuth:token',
    ]);

    setUser(null);
    setIsDonor(null);
    setToken(null);
  }

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color={THEME.light.primary} />
      </ScreenContainer>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        isDonor,
        token,
        signOut,
        saveUserAndToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
