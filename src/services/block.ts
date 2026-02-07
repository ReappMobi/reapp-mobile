import api from './api';

export const blockUser = async (userId: number, token: string) => {
  const response = await api.post(
    `/account/block/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const unblockUser = async (userId: number, token: string) => {
  const response = await api.delete(`/account/unblock/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
