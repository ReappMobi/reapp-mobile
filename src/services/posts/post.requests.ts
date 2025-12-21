import { IPost } from 'src/types/IPost';
import api from '../api';

export type GetPostsResponse = IPost[];

export const getPosts = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await api.get<GetPostsResponse>(`/post?page=${pageParam}`);

  return data;
};

export const likePost = async (postId: number) => {
  const { data } = await api.post(`/post/${postId}/like`);

  return data;
};

export const unlikePost = async (postId: number) => {
  const { data } = await api.delete(`/post/${postId}/like`);

  return data;
};

export const savePost = async (postId: number) => {
  const { data } = await api.post(`/post/${postId}/save`);

  return data;
};

export const unsavePost = async (postId: number) => {
  const { data } = await api.delete(`/post/${postId}/save`);

  return data;
};
