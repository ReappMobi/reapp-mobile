import api from '../api';
import {
  AddCommentData,
  GetPostCommentsParams,
  GetPostCommentsResponse,
} from './types';

export const getPostComments = async ({
  token,
  postId,
  page,
}: GetPostCommentsParams) => {
  const { data } = await api.get<GetPostCommentsResponse>(
    `/post/${postId}/comments?page=${page}`
  );
  return data;
};

export const addComment = async ({
  token,
  postId,
  content,
}: AddCommentData) => {
  return await api.post<void>(`/post/${postId}/comment`, { body: content });
};
