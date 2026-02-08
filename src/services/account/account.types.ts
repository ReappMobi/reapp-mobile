import { IInstitution } from '@/types';
import { AccountField, AccountType } from '@/types/Account';
import { Donation } from '@/types/IDonation';
import { MediaAttachment } from '@/types/MediaAttatchment';

export interface RequestMedia {
  uri: string;
  name: string;
  type: string;
  size: number;
  width?: number;
  height?: number;
}

export interface DeleteAccountData {
  accountId: number;
}

export interface DeleteAccountResponse {
  message: string;
}

export interface SendRecoveryEmailData {
  email: string;
}
export interface SendRecoveryEmailResponse {
  message: string;
  token: string;
}

export interface RecoveryPasswordData {
  token: string;
  code: string;
}
export interface RecoveryPasswordResponse {
  message: string;
  token: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirmation: string;
}
export interface ResetPasswordResponse {
  message: string;
}

export interface CreateAccountData {
  accountType: Omit<AccountType, 'ADMIN'>;
  email: string;
  password: string;
  name: string;
  phone?: string;
  cnpj?: string;
  category?: string;
  fields?: AccountField[];
  note?: string;
  media?: unknown;
}

export interface UpdateAccountData {
  name?: string;
  email?: string;
  note?: string;
  category?: string;
  fields?: AccountField[];
  password?: string;
  passwordConfirmation?: string;
  media?: unknown;
}

export interface CreateAccountResponse {
  id: string;
  email: string;
  name: string;
  avatarId: string | null;
  media: MediaAttachment;
  accountType: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;

  donor?: {
    id: string;
    donations: Donation[];
  };

  institution?: {
    cnpj: string;
    phone: string;
    category: {
      name: string;
    };
  };
}

export type UpdateAccountResponse = CreateAccountResponse;

export interface FollowAccountResponse {
  message: string;
}

export type GetInstitutionsResponse = IInstitution[];
