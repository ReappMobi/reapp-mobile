import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { IPost } from '@/types';
import { deletePost, getPosts, getPostsByInstitution } from './post.requests';

export const POSTS_PREFIX_KEY = 'posts';

export const useGetPosts = (
  page: number,
  options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [POSTS_PREFIX_KEY, page],
    queryFn: () => getPosts(page),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetPostsByInstitution = (
  institutionId: number,
  options?: Omit<UseQueryOptions<IPost[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [POSTS_PREFIX_KEY, 'institution', institutionId],
    queryFn: () => getPostsByInstitution(institutionId),
    enabled: !!institutionId,
    ...options,
  });
};

export const useDeletePost = (
  options?: UseMutationOptions<{ message: string }, Error, number>
) => {
  return useMutation({
    mutationFn: deletePost,
    ...options,
  });
};
