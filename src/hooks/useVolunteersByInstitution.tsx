import { useGetVolunteersByInstitutionId } from 'src/services/institutions/service';

export const useVolunteersByInstitution = (institutionId: number) => {
  const {
    data: volunteers = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetVolunteersByInstitutionId(institutionId);

  return {
    volunteers,
    token: null,
    error,
    loading: isLoading,
    refreshing: isRefetching,
    onRefresh: refetch,
  };
};