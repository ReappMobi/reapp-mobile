import api from '../api';

export const blockUser = async (userId: number) => {
  const response = await api.post(`/account/block/${userId}`, {});
  return response.data;
};

export const unblockUser = async (userId: number) => {
  const response = await api.delete(`/account/unblock/${userId}`);
  return response.data;
};
