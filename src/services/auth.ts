import api from './api';


export async function SignIn() {
  // TODO: Implement the sign in logic

  setTimeout(() => {
    console.log('Authenticating...');
  }, 2000);

  return {
    token: 'eyJhbGciOiJIUzI1Ni.eyJzdWIiOiIxMjM0NTY3OD',
    //user,
  };
}

export async function SignInInstitution(institutionData) {
  try {
    const response = await api.post('/institution/signin', institutionData, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus() {
        return true;
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao logar a instituição', error.message);
  }
}

export async function SignUpDonnor(userData) {
  try {
    const response = await api.post('/donnor', userData, {
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

export async function SignUpInstitution(institutionData) {
  try {
    console.log(institutionData);
    const response = await api.post('/institution/signup', institutionData, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar instituição:', error.message);
  }
}
