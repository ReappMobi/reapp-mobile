import type { SignInData, SignUpData } from 'src/types';

import type { RequestMedia } from './account';
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

export async function SignUp(userData: SignUpData, media: RequestMedia | null) {
  try {
    const formData = new FormData();

    for (const key in userData) {
      if (userData[key]) {
        formData.append(key, userData[key]);
      }
    }

    if (media) {
      formData.append('media', media as any);
    }

    const response = await api.post('/account', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.message || 'Erro ao cadastrar usuário');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    throw error;
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
