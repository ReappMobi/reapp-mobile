import React, { createContext, useState } from 'react';

import { IUser } from '../mocks/user-data';
import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  signIn(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<IUser | null>(null);

  async function signIn() {
    const response = await auth.SignIn();
    setUser(response.user);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
