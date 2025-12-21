import { useGetCollaboratorByInstitutionId } from 'src/services/institutions/service';

export const useCollaboratorsByInstitution = (institutionId: number) => {
  const {
    data: collaborators = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetCollaboratorByInstitutionId(institutionId);

  return {
    collaborators,
    token: null,
    error,
    loading: isLoading,
    refreshing: isRefetching,
    onRefresh: refetch,
  };
};