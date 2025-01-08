import { IMedia } from './IMedia';

export interface ICollaborator {
  id: number;
  institutionId: number;
  name: string;
  memberType: string;
  media: IMedia;
}
