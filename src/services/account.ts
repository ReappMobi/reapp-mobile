import api from './api';

export type RequestMedia = {
  uri: string;
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
};

type UpdateAccountRequest = {
  name?: string;
  email?: string;
  note?: string;
  category?: string;
  fields?: Record<string, string>;
  password?: string;
  passwordConfirmation?: string;
};

export const updateAccount = async (
  accountId: number,
  token: string,
  media: RequestMedia | null,
  requestData: UpdateAccountRequest
) => {
  try {
    const formData = new FormData();
    for (const key in requestData) {
      if (requestData[key]) {
        formData.append(key, requestData[key]);
      }
    }

    if (media) {
      formData.append('media', media as any);
    }

    const response = await api.put(`/account/${accountId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Erro ao atualizar perfil');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
