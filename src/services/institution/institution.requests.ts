import api from '@/services/api';
import { InstitutionResponse } from './institution.types';

export const getInstitutionByAccountId = async (
  accountId: number
): Promise<InstitutionResponse> => {
  const response = await api.get(`/account/institution/${accountId}`);
  return response.data;
};
