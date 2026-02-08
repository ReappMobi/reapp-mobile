import { IMedia } from '@/types/IMedia';

export type MemberType = 'COLLABORATOR' | 'VOLUNTEER' | 'PARTNER';

export interface IMember {
  id: number;
  institutionId: number;
  name: string;
  memberType: MemberType;
  media: IMedia;
}

export interface CreateMemberData {
  name: string;
  memberType: MemberType;
  file?: any;
}

export interface UpdateMemberData extends Partial<CreateMemberData> {}

export type GetMembersParams = {
  institutionId: number;
  type: MemberType;
};
