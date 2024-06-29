import api from './api';

export const requestPaymentUrl = async (data) => {
  try {
    const response = await api.post('/payment/request', data, {
      headers: {
        'Content-Type': 'application/json',
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
