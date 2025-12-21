import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { INSTITUTION_POSTS_KEY } from '../institutions/keys';
import { POSTS_PREFIX_KEY } from './post.keys';
import {
  createPost,
  deletePost,
  getPosts,
  getSavedPosts,
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from './post.requests';

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [POSTS_PREFIX_KEY],
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming 10 items per page. If less, we reached the end.
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_POSTS_KEY] });
    },
  });
};

export const useGetSavedPosts = () => {
  return useInfiniteQuery({
    queryKey: [POSTS_PREFIX_KEY, 'saved'],
    queryFn: ({ pageParam }) => getSavedPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_POSTS_KEY] });
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_POSTS_KEY] });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
      queryClient.invalidateQueries({
        queryKey: [POSTS_PREFIX_KEY, 'saved'],
      });
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_POSTS_KEY] });
    },
  });
};

export const useUnsavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unsavePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
      queryClient.invalidateQueries({
        queryKey: [POSTS_PREFIX_KEY, 'saved'],
      });
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_POSTS_KEY] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_PREFIX_KEY] });
      queryClient.invalidateQueries({ queryKey: [INSTITUTION_POSTS_KEY] });
    },
  });
};