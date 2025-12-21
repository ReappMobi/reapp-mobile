import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { COMMENTS_PREFIX_KEY } from './keys';
import { addComment, getPostComments } from './requests';
import { GetPostCommentsParams } from './types';

export const useGetPostComments = (params: GetPostCommentsParams) => {
  return useInfiniteQuery({
    queryKey: [COMMENTS_PREFIX_KEY, params.postId],
    queryFn: ({ pageParam }) => getPostComments({ ...params, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    enabled: !!params.postId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [COMMENTS_PREFIX_KEY, variables.postId],
      });
    },
  });
};
