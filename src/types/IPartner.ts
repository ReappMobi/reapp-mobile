import type { IMedia } from './IMedia';

export interface IPartner {
  id: number;
  institutionId: number;
  name: string;
  memberType: string;
  media: IMedia;
}
