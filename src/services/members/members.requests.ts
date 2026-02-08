import api from '@/services/api';
import { buildFormData } from '@/utils/form-data';
import {
  CreateMemberData,
  IMember,
  MemberType,
  UpdateMemberData,
} from './members.types';

export const getMembersByInstitutionId = async (
  institutionId: number,
  type: MemberType
) => {
  const endpoint = type.toLowerCase() + 's';
  const response = await api.get<IMember[]>(
    `/institution-members/${endpoint}/${institutionId}`
  );
  return response.data;
};

export const getMemberById = async (memberId: number) => {
  const response = await api.get(`/institution-members/member/${memberId}`);
  return response.data;
};

export const createMember = async (data: CreateMemberData) => {
  const formData = buildFormData(data as unknown as Record<string, unknown>);

  const response = await api.postForm<IMember>(
    '/institution-members',
    formData
  );
  return response.data;
};

export const updateMember = async (
  memberId: number,
  data: UpdateMemberData
) => {
  const formData = buildFormData(data as unknown as Record<string, unknown>);
  const response = await api.putForm<IMember>(
    `/institution-members/${memberId}`,
    formData
  );
  return response.data;
};

export const deleteMember = async (memberId: number) => {
  const response = await api.delete<{ message: string }>(
    `/institution-members/${memberId}`
  );
  return response.data;
};
