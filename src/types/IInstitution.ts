import { IMedia } from './IMedia';

export interface IInstitution {
  id: number;
  cnpj: string;
  phone: string;
  category: Record<string, any>;
  fields: [];
  account: {
    id: number;
    name: string;
    email: string;
    avatarId?: number;
    media?: IMedia;
    followersCount: number;
  };
  isFollowing: boolean;
}
