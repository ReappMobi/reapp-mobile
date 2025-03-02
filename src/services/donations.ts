import api from './api';

const DONATIONS_LIST_LIMIT = 10;

export const getDonationsByDonor = async (
  donorId: number,
  page: number = 1,
  token: string,
  period: string
) => {
  try {
    const response = await api.get(
      `/donation/donor/${donorId}?page=${page}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Erro ao buscar doações');
    }

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getInstitutionDonations = async (
  page: number = 1,
  period: string,
  token: string
) => {
  try {
    const response = await api.get(
      `/donation/institution?page=${page}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Erro ao buscar doações');
    }

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getGeneralDonations = async (
  page: number = 1,
  period: string,
  token: string
) => {
  try {
    const response = await api.get(
      `/donation/institution/general?page=${page}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Erro ao buscar doações');
    }

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new error(error.message);
  }
};

export const getProjectDonations = async (
  page: number = 1,
  period: string,
  token: string
) => {
  try {
    const response = await api.get(
      `/donation/institution/projects?page=${page}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Erro ao buscar doações');
    }

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new error(error.message);
  }
};
