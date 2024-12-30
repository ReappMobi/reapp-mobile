import { ICategory } from 'src/mocks/app-InstitutionCategory-data';

import { IMedia } from './IMedia';

export interface IProject {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
  mediaId?: string;
  media?: IMedia;
  isFavorite?: boolean;
}
