import api from '../api';
import {
  AddCommentData,
  GetPostCommentsParams,
  GetPostCommentsResponse,
} from './types';

export const getPostComments = async ({
  postId,
  pageParam,
}: GetPostCommentsParams & { pageParam: number }) => {
  const { data } = await api.get<GetPostCommentsResponse>(
    `/post/${postId}/comments?page=${pageParam}`
  );
  return data;
};

export const addComment = async ({ postId, content }: AddCommentData) => {
  return await api.post<void>(`/post/${postId}/comment`, { body: content });
};
