import { user } from '../mocks/user-data';

export async function SignIn() {
  // TODO: Implement the sign in logic
  return {
    token: 'eyJhbGciOiJIUzI1Ni.eyJzdWIiOiIxMjM0NTY3OD',
    user,
  };
}

export async function SignUpUser(userData) {}

export async function SignUpInstitution(institutionData) {}
