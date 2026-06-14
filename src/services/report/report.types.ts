export type ReportReason =
  | 'SPAM'
  | 'INAPPROPRIATE'
  | 'HARASSMENT'
  | 'MISINFORMATION'
  | 'OTHER';

export interface ReportContentData {
  targetType: 'POST' | 'COMMENT' | 'ACCOUNT';
  targetId: number;
  reason: ReportReason;
  details?: string;
}

export interface ReportContentResponse {
  message: string;
}
