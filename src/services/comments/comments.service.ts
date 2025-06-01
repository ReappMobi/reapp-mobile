import { useMutation, useQuery } from '@tanstack/react-query';
import { getPostComments, addComment } from './requests';
import { GetPostCommentsParams } from './types';

export const COMMENTS_PREFIX_KEY = 'comments';

export const useGetPostComments = (params: GetPostCommentsParams) => {
  return useQuery({
    queryKey: [COMMENTS_PREFIX_KEY, params.postId, params.page],
    queryFn: () => getPostComments(params),
    enabled: !!params.token,
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: addComment,
  });
};
