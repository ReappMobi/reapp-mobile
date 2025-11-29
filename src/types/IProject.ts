
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
  category: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  mediaId?: string;
  media?: IMedia;
  isFavorite?: boolean;
}
