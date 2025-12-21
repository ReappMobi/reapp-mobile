import { useGetSavedPosts } from 'src/services/posts/post.service';

export const useSavedPosts = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useGetSavedPosts();

  const posts = data?.pages.flatMap((page) => page) || [];

  return {
    posts,
    token: null,
    error,
    loading: isLoading,
    refreshing: isRefetching,
    onRefresh: refetch,
    fetchNextPage,
    hasNextPage,
  };
};
