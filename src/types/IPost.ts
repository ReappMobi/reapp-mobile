import { IMedia } from './IMedia';

export interface IPost {
  id: number;
  body: string;
  institution: {
    id: number;
    category: {
      name: string;
    };
    account: {
      id: number;
      name: string;
      avatarId: string;
      media: IMedia;
    };
  };
  mediaId: string;
  media: IMedia;
  createdAt: string;
  updatedAt: string;
  comments: any[];
  likes: {
    id: number;
    accountId: number;
  }[];
  saves: {
    id: number;
    accountId: number;
  }[];
}
