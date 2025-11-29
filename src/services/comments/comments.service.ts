import { useMutation, useQuery } from '@tanstack/react-query';
import { addComment, getPostComments } from './requests';
import { GetPostCommentsParams } from './types';

export const COMMENTS_PREFIX_KEY = 'comments';

export const useGetPostComments = (params: GetPostCommentsParams) => {
  return useQuery({
    queryKey: [COMMENTS_PREFIX_KEY, params.postId, params.page],
    queryFn: () => getPostComments(params),
    enabled: !!params.token,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: addComment,
  });
};
