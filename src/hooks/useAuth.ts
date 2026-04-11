import { useAuthStore } from '@/stores/auth.store';

export const useAuth = () => {
  const store = useAuthStore();

  const user = store.user;
  const accountType = user?.accountType;

  return {
    ...store,
    signed: !!user,
    // Admin behaves like a Donor in the app
    isDonor: accountType === 'DONOR' || accountType === 'ADMIN',
    isInstitution: accountType === 'INSTITUTION',
    isAdmin: accountType === 'ADMIN',

    accountType,

    saveUserAndToken: async (user: any, token: string) => {
      await store.signIn(token);
    },
  };
};
