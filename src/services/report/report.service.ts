import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { reportContent } from './report.requests';
import type { ReportContentData, ReportContentResponse } from './report.types';

type ReportContentParams = {
  data: ReportContentData;
  token: string;
};

export function useReportContent(
  options?: UseMutationOptions<
    ReportContentResponse,
    Error,
    ReportContentParams
  >
) {
  return useMutation({
    mutationFn: ({ data, token }: ReportContentParams) =>
      reportContent(data, token),
    ...options,
  });
}
