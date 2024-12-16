import { SignInData, SignUpData } from 'src/types';

import api from './api';

export async function SignIn(data: SignInData) {
  try {
    const response = await api.post('/auth/login', data);

    if (response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  } catch (error) {
    throw error;
  }
}

export async function SignInGoogle(data) {
  try {
    const response = await api.post('/auth/google-auth', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus() {
        return true;
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function SignUp(userData: SignUpData) {
  try {
    const response = await api.post('/account', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus() {
        return true;
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
  }
}

export async function SignUpDonnorGoogle(userData) {
  try {
    const response = await api.post('/donnor/auth-google', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário doador:', error.message);
  }
}
