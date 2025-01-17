import { ICategory } from 'src/mocks/app-InstitutionCategory-data';

import { IMedia } from './IMedia';

export interface IInstitution {
  id: number;
  cnpj: string;
  phone: string;
  category: ICategory;
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
