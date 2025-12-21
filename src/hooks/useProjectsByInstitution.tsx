import { useGetProjectsByInstitutionId } from 'src/services/projects/service';

export const useProjectsByInstitution = (institutionId: number) => {
  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetProjectsByInstitutionId(institutionId);

  return {
    projects,
    token: null,
    error,
    loading: isLoading,
    refreshing: isRefetching,
    onRefresh: refetch,
  };
};
