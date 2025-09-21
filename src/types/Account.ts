export enum AccountType {
  ADMIN = 0,
  DONOR = 1,
  INSTITUTION = 2,
}
export enum AccountStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  SUSPENDED = 2,
  BANNED = 3,
  PENDING = 4,
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
