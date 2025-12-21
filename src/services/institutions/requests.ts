import { IInstitution } from 'src/types/IInstitution';
import api from '../api';
import {
  GetCollaboratorsResponse,
  GetInstitutionPostsResponse,
  GetInstitutionsResponse,
  GetPartnersResponse,
  GetVolunteersResponse,
  PostInstitutionMemberData,
} from './types';

export const getInstitutions = async () => {
  const { data } = await api.get<GetInstitutionsResponse>(
    '/account/institution'
  );
  return data;
};

export const getInstitutionByAccountId = async (accountId: number) => {
  const { data } = await api.get<IInstitution>(
    `/account/institution/${accountId}`
  );
  return data;
};

export const postInstitutionMember = async (
  memberData: PostInstitutionMemberData
) => {
  const formData = new FormData();
  formData.append('name', memberData.name);
  formData.append('memberType', memberData.memberType);
  if (memberData.media) {
    formData.append('file', {
      uri: memberData.media.uri,
      name: memberData.media.name,
      type: memberData.media.type,
    } as any);
  }
  const { data } = await api.post('/institution-members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getPartnerByInstitutionId = async (institutionId: number) => {
  const { data } = await api.get<GetPartnersResponse>(
    `/institution-members/partners/${institutionId}`
  );
  return data;
};

export const getCollaboratorByInstitutionId = async (institutionId: number) => {
  const { data } = await api.get<GetCollaboratorsResponse>(
    `/institution-members/collaborators/${institutionId}`
  );
  return data;
};

export const getVolunteersByInstitutionId = async (institutionId: number) => {
  const { data } = await api.get<GetVolunteersResponse>(
    `/institution-members/volunteers/${institutionId}`
  );
  return data;
};

export const getInstitutionPosts = async (institutionId: number) => {
  const { data } = await api.get<GetInstitutionPostsResponse>(
    `/post/institution/${institutionId}`
  );
  return data;
};
