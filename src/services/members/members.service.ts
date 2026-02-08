import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  createMember,
  deleteMember,
  getMemberById,
  getMembersByInstitutionId,
  updateMember,
} from './members.requests';
import {
  CreateMemberData,
  IMember,
  MemberType,
  UpdateMemberData,
} from './members.types';

export const useMembersByInstitutionId = (
  institutionId: number,
  type: MemberType,
  options?: Omit<UseQueryOptions<IMember[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['members', type, institutionId],
    queryFn: () => getMembersByInstitutionId(institutionId, type),
    enabled: !!institutionId,
    ...options,
  });
};

export const useMemberById = (
  memberId: number,
  options?: Omit<UseQueryOptions<IMember, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getMemberById(memberId),
    enabled: !!memberId,
    ...options,
  });
};

export const useCreateMember = (
  options?: UseMutationOptions<IMember, Error, CreateMemberData>
) => {
  return useMutation({
    mutationFn: createMember,
    ...options,
  });
};

export const useUpdateMember = (
  options?: UseMutationOptions<
    IMember,
    Error,
    { memberId: number; data: UpdateMemberData }
  >
) => {
  return useMutation({
    mutationFn: ({ memberId, data }) => updateMember(memberId, data),
    ...options,
  });
};

export const useDeleteMember = (
  options?: UseMutationOptions<{ message: string }, Error, number>
) => {
  return useMutation({
    mutationFn: deleteMember,
    ...options,
  });
};
