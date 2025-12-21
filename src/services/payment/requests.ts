import api from '../api';

export const requestPaymentUrl = async (data: {
  amount: number;
  institutionId?: number;
  description?: string;
  projectId?: number;
}) => {
  const response = await api.post('/donation/request', data);
  return response.data;
};
