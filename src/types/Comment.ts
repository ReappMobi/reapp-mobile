import { Account } from './Account';

export type Comment = {
  id: number;
  body: string;
  postId: number;
  accountId: number;
  createdAt: Date;
  account: Account;
};
