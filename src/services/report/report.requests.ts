import api from '../api';
import type { ReportContentData, ReportContentResponse } from './report.types';

export const reportContent = async (data: ReportContentData) => {
  const response = await api.post<ReportContentResponse>('/report', data);
  return response.data;
};
