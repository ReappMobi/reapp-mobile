import { useGetPartnerByInstitutionId } from 'src/services/institutions/service';

export const usePartnersByInstitution = (institutionId: number) => {
  const {
    data: partners = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetPartnerByInstitutionId(institutionId);

  return {
    partners,
    token: null,
    error,
    loading: isLoading,
    refreshing: isRefetching,
    onRefresh: refetch,
  };
};