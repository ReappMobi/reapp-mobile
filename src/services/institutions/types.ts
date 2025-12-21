import { ICollaborator } from 'src/types/ICollaborator';
import { IInstitution } from 'src/types/IInstitution';
import { IPartner } from 'src/types/IPartner';
import { IPost } from 'src/types/IPost';
import { IVolunteer } from 'src/types/IVolunteer';

export type GetInstitutionsResponse = IInstitution[];

export type PostInstitutionMemberData = {
  name: string;
  memberType: string;
  media?: string;
};

export type GetPartnersResponse = IPartner[];
export type GetCollaboratorsResponse = ICollaborator[];
export type GetVolunteersResponse = IVolunteer[];
export type GetInstitutionPostsResponse = IPost[];
