import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { getMe } from '@/services/account/account.requests';
import api from '@/services/api';
import type { Account } from '@/types';

interface AuthState {
  user: Account | null;
  token: string | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: Account) => void;
  initialize: () => Promise<void>;
}

const TOKEN_KEY = '@RNAuth:token';

export const useAuthStore = create<AuthState>((set, get) => {
  // Config interceptor for 401
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await get().signOut();
      }
      return Promise.reject(error);
    }
  );

  return {
    user: null,
    token: null,
    loading: true,

    setUser: (user: Account) => {
      set({ user });
    },

    signIn: async (token: string) => {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      set({ token });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const data = await getMe();
        get().setUser(data);
      } catch (error) {
        console.error('Error fetching user info after sign in:', error);
        await get().signOut();
        throw error;
      }
    },

    signOut: async () => {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      api.defaults.headers.Authorization = '';
      set({ user: null, token: null });
    },

    initialize: async () => {
      set({ loading: true });
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const data = await getMe();
          set({
            token,
            user: data,
          });
        }
      } catch (error) {
        console.error('Error initializing auth store:', error);
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        api.defaults.headers.Authorization = '';
        set({ user: null, token: null });
      } finally {
        set({ loading: false });
      }
    },
  };
});
