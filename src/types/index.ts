import { IInstitution } from './IInstitution';

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
};

export type SignInData = {
  email: string;
  password: string;
};

export type { IInstitution };
export type { IPost } from './IPost';
export type { IProject } from './IProject';
export type { IBanner } from './IBanner';
