import { IInstitution } from './IInstitution';
import { IMedia } from './IMedia';

export type AccountType = {
  accountType: 'DONOR' | 'INSTITUTION';
  avatar?: string;
  createdAt: Date;
  email: string;
  followersCount: number;
  followingCount: number;
  id: number;
  name: string;
  updatedAt: Date;
  note?: string;
  media?: IMedia;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  accountType: 'DONOR' | 'INSTITUTION';
  email: string;
  name: string;
  phone?: string;
  password: string;
  cnpj?: string;
  category?: string;
};

export type { IInstitution };
export type { IPost } from './IPost';
export type { IProject } from './IProject';
export type { IBanner } from './IBanner';
