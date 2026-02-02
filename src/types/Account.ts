export enum AccountType {
  ADMIN = 'ADMIN',
  DONOR = 'DONOR',
  INSTITUTION = 'INSTITUTION',
}

export interface AccountField {
  name: string;
  value: string;
}

export enum AccountStatus {
  ACTIVE,
  INACTIVE,
  SUSPENDED,
  BANNED,
  PENDING,
}

export type Account = {
  id: number;
  name: string;
  email: string;
  note: string | null;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  avatarId: string | null;
  accountType: AccountType;
  followingCount: number;
  followersCount: number;
  status: AccountStatus;
};
