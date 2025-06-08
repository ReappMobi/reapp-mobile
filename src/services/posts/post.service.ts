import { useQuery } from '@tanstack/react-query';
import { getPosts } from './post.requests';

export const POSTS_PREFIX_KEY = 'posts';
export const useGetPosts = (token: string, page: number) => {
  return useQuery({
    queryKey: [POSTS_PREFIX_KEY, page],
    queryFn: async () => getPosts(token, page),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 1000,
  });
};
