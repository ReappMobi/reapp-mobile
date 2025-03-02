import api from './api';

export const requestPaymentUrl = async (
  data: {
    amount: number;
    institutionId?: number;
    description?: string;
    projectId?: number;
  },
  token: string
) => {
  try {
    const response = await api.post('/donation/request', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      validateStatus() {
        return true;
      },
    });

    return response.data;
  } catch (error) {
    console.log('Erro: ', error.message);
  }
};
