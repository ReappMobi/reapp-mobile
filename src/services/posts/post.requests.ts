import { buildFormData } from '@/utils/form-data';
import api from '@/services/api';
import { IPost } from '@/types';

export interface CreatePostData {
  content: string;
  media?: string | null;
}

export const getPosts = async (page: number) => {
  const { data } = await api.get(`/post?page=${page}`);
  return data;
};

export const getPostsByInstitution = async (
  institutionId: number
): Promise<IPost[]> => {
  const { data } = await api.get(`/post/institution/${institutionId}`);
  return data;
};

export const deletePost = async (id: number): Promise<{ message: string }> => {
  const { data } = await api.delete(`/post/${id}`);
  return data;
};

export const createPost = async (data: CreatePostData): Promise<IPost> => {
  const formData = buildFormData(data as unknown as Record<string, unknown>);

  // Special handling for media in React Native
  if (data.media) {
    formData.delete('media');
    const timestamp = Date.now();
    formData.append('media', {
      uri: data.media,
      name: `${timestamp}.jpg`,
      type: 'image/jpeg',
    } as any);
  }

  const response = await api.postForm('/post', formData);
  return response.data;
};