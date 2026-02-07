import api from './api';

type ReportContentParams = {
  targetType: 'POST' | 'COMMENT' | 'ACCOUNT';
  targetId: number;
  reason: string;
  token: string;
};

export const reportContent = async ({
  targetType,
  targetId,
  reason,
  token,
}: ReportContentParams) => {
  const response = await api.post(
    '/report',
    { targetType, targetId, reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
