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



export const deletePost = async (postId: number) => {



  const { data } = await api.delete(`/post/${postId}`);



  return data;



};







export const getSavedPosts = async ({ pageParam }: { pageParam: number }) => {







  const { data } = await api.get<GetPostsResponse>(







    `/post/saved?page=${pageParam}`







  );







  return data;







};















export const createPost = async (postData: {







  content: string;







  media: string;







}) => {







  const formData = new FormData();







  formData.append('content', postData.content);







  if (postData.media) {







    const timestamp = Date.now();







    formData.append('media', {







      uri: postData.media,







      name: `${timestamp}.jpg`,







      type: 'image/jpeg',







    } as any);







  }















  const { data } = await api.post('/post', formData, {







    headers: {







      'Content-Type': 'multipart/form-data',







    },







  });







  return data;







};














