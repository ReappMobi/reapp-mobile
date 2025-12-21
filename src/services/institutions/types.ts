import { IInstitution } from 'src/types/IInstitution';
import { IPartner } from 'src/types/IPartner';
import { ICollaborator } from 'src/types/ICollaborator';
import { IVolunteer } from 'src/types/IVolunteer';
import { IPost } from 'src/types/IPost';

export type GetInstitutionsResponse = IInstitution[];

export type PostInstitutionMemberData = {
  name: string;
  memberType: string;
  media?: { uri: string; name: string; type: string } | null;
};

export type GetPartnersResponse = IPartner[];
export type GetCollaboratorsResponse = ICollaborator[];
export type GetVolunteersResponse = IVolunteer[];
export type GetInstitutionPostsResponse = IPost[];