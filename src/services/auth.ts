import { user } from '../mocks/user-data';

export async function SignIn() {
  // TODO: Implement the sign in logic

  setTimeout(() => {
    console.log('Authenticating...');
  }, 2000);

  return {
    token: 'eyJhbGciOiJIUzI1Ni.eyJzdWIiOiIxMjM0NTY3OD',
    user,
  };
}

export async function SignUpUser(userData) {}

export async function SignUpInstitution(institutionData) {}
