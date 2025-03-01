import api from './api';

export const addComment = async (
  postId: number,
  token: string,
  content: string
) => {
  try {
    const response = await api.post(
      `/post/${postId}/comment`,
      { body: content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error(
        response.data?.message || 'Erro ao adicionar um comentário.'
      );
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostComments = async (
  postId: number,
  token: string,
  page: number
) => {
  try {
    const response = await api.get(`/post/${postId}/comments?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        response.data?.message || 'Erro ao buscar os comentários da postagem.'
      );
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
