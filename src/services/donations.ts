import { Donation } from 'src/types/IDonation';

import api from './api';

const DONATIONS_LIST_LIMIT = 10;

export const getDonationsByDonor = async (
  donorId: number,
  page: number = 1,
  token: string
): Promise<Donation[]> => {
  try {
    const response = await api.get(
      `/donation/donor/${donorId}?page=${page}&limit=${DONATIONS_LIST_LIMIT}`,
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
  token: string
): Promise<Donation[]> => {
  try {
    const response = await api.get(
      `/donation/institution?page=${page}&limit=${DONATIONS_LIST_LIMIT}`,
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
