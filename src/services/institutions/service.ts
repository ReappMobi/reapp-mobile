import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  INSTITUTION_MEMBERS_KEY,
  INSTITUTION_POSTS_KEY,
  INSTITUTIONS_PREFIX_KEY,
} from './keys';
import * as requests from './requests';

export const useGetInstitutions = () => {
  return useQuery({
    queryKey: [INSTITUTIONS_PREFIX_KEY],
    queryFn: requests.getInstitutions,
  });
};

export const useGetInstitutionByAccountId = (accountId: number) => {
  return useQuery({
    queryKey: [INSTITUTIONS_PREFIX_KEY, 'account', accountId],
    queryFn: () => requests.getInstitutionByAccountId(accountId),
    enabled: !!accountId,
  });
};

export const usePostInstitutionMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.postInstitutionMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_MEMBERS_KEY] });
    },
  });
};

export const useGetPartnerByInstitutionId = (institutionId: number) => {
  return useQuery({
    queryKey: [INSTITUTION_MEMBERS_KEY, 'partners', institutionId],
    queryFn: () => requests.getPartnerByInstitutionId(institutionId),
    enabled: !!institutionId,
  });
};

export const useGetCollaboratorByInstitutionId = (institutionId: number) => {
  return useQuery({
    queryKey: [INSTITUTION_MEMBERS_KEY, 'collaborators', institutionId],
    queryFn: () => requests.getCollaboratorByInstitutionId(institutionId),
    enabled: !!institutionId,
  });
};

export const useGetVolunteersByInstitutionId = (institutionId: number) => {
  return useQuery({
    queryKey: [INSTITUTION_MEMBERS_KEY, 'volunteers', institutionId],
    queryFn: () => requests.getVolunteersByInstitutionId(institutionId),
    enabled: !!institutionId,
  });
};

export const useGetInstitutionPosts = (institutionId: number) => {
  return useQuery({
    queryKey: [INSTITUTION_POSTS_KEY, institutionId],
    queryFn: () => requests.getInstitutionPosts(institutionId),
    enabled: !!institutionId,
  });
};
