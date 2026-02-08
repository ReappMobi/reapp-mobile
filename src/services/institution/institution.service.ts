import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getInstitutionByAccountId } from './institution.requests';
import { InstitutionResponse } from './institution.types';

export const useGetInstitutionByAccountId = (
  accountId: number,
  options?: Omit<
    UseQueryOptions<InstitutionResponse, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: ['institution', accountId],
    queryFn: () => getInstitutionByAccountId(accountId),
    enabled: !!accountId,
    ...options,
  });
};
