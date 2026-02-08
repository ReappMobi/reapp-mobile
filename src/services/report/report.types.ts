export interface ReportContentData {
  targetType: 'POST' | 'COMMENT' | 'ACCOUNT';
  targetId: number;
  reason: string;
}

export interface ReportContentResponse {
  message: string;
}
