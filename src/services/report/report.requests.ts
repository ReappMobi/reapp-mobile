import api from '../api';
import type { ReportContentData, ReportContentResponse } from './report.types';

export const reportContent = async (
  data: ReportContentData,
  token: string
) => {
  const response = await api.post<ReportContentResponse>('/report', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
