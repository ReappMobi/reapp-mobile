import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { reportContent } from './report.requests';
import type { ReportContentData, ReportContentResponse } from './report.types';

export function useReportContent(
  options?: UseMutationOptions<ReportContentResponse, Error, ReportContentData>
) {
  return useMutation({
    mutationFn: (data: ReportContentData) => reportContent(data),
    ...options,
  });
}
