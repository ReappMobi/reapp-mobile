import { ICategory } from 'src/mocks/app-InstitutionCategory-data';

import { IMedia } from './IMedia';

export interface IProject {
  id: number;
  name: string;
  institution: {
    id: number;
    phone: string;
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
  subtitle: string;
  description: string;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
  mediaId?: string;
  media?: IMedia;
  isFavorite?: boolean;
}
