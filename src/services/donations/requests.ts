import api from '../api';
import { GetDonationsParams, GetDonationsResponse } from './types';

const DONATIONS_LIST_LIMIT = 10;

export const getDonationsByDonor = async ({
  donorId,
  pageParam = 1,
  period,
}: GetDonationsParams) => {
  const { data } = await api.get<GetDonationsResponse>(
    `/donation/donor/${donorId}?page=${pageParam}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`
  );
  return data;
};

export const getInstitutionDonations = async ({
  pageParam = 1,
  period,
}: GetDonationsParams) => {
  const { data } = await api.get<GetDonationsResponse>(
    `/donation/institution?page=${pageParam}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`
  );
  return data;
};

export const getGeneralDonations = async ({
  pageParam = 1,
  period,
}: GetDonationsParams) => {
  const { data } = await api.get<GetDonationsResponse>(
    `/donation/institution/general?page=${pageParam}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`
  );
  return data;
};

export const getProjectDonations = async ({
  pageParam = 1,
  period,
}: GetDonationsParams) => {
  const { data } = await api.get<GetDonationsResponse>(
    `/donation/institution/projects?page=${pageParam}&limit=${DONATIONS_LIST_LIMIT}&period=${period}`
  );
  return data;
};
