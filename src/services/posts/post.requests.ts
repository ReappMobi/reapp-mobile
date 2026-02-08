import api from '@/services/api';
import { IPost } from '@/types';

export const getPosts = async (page: number) => {
  const { data } = await api.get(`/post?page=${page}`);
  return data;
};

export const getPostsByInstitution = async (institutionId: number): Promise<IPost[]> => {
  const { data } = await api.get(`/post/institution/${institutionId}`);
  return data;
};

export const deletePost = async (id: number): Promise<{ message: string }> => {
  const { data } = await api.delete(`/post/${id}`);
  return data;
};