import React, { useContext } from 'react';
import AuthContext from 'src/contexts/auth';

import { AppNavigator } from './app.route';
import { AuthNavigator } from './auth.route';

export default function Routes() {
  const { signed } = useContext(AuthContext);
  return signed ? <AppNavigator /> : <AuthNavigator />;
}
