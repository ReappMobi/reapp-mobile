import type { IMedia } from './IMedia';

export interface IVolunteer {
  id: number;
  institutionId: number;
  memberType: string;
  name: string;
  media: IMedia;
}
