import { useGetInstitutionPosts } from 'src/services/institutions/service';

export const usePostsByInstitution = (institutionId: number) => {
  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetInstitutionPosts(institutionId);

  return {
    posts,
    token: null,
    error,
    loading: isLoading,
    refreshing: isRefetching,
    onRefresh: refetch,
  };
};
