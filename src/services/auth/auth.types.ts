import { AccountType, SignUpData } from '@/types';
import { RequestMedia } from '../account';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AccountType;
}

export interface SignUpRequest extends SignUpData {
  media?: RequestMedia | null;
}
