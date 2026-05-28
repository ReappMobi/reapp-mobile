import type {
  ReportContentData,
  ReportReason,
} from '@/services/report/report.types';

export const REPORT_REASONS: { label: string; value: ReportReason }[] = [
  { label: 'Simplesmente não gostei', value: 'OTHER' },
  { label: 'Bullying ou contato indesejado', value: 'HARASSMENT' },
  {
    label: 'Suicídio, automutilação ou distúrbios alimentares',
    value: 'INAPPROPRIATE',
  },
  { label: 'Violência, ódio ou exploração', value: 'INAPPROPRIATE' },
  { label: 'Venda ou promoção de itens restritos', value: 'INAPPROPRIATE' },
  { label: 'Nudez ou atividade sexual', value: 'INAPPROPRIATE' },
  { label: 'Golpe, fraude ou spam', value: 'SPAM' },
  { label: 'Informação falsa', value: 'MISINFORMATION' },
  { label: 'Propriedade intelectual', value: 'OTHER' },
];

export const TARGET_NOUN: Record<ReportContentData['targetType'], string> = {
  POST: 'esse post',
  COMMENT: 'esse comentário',
  ACCOUNT: 'essa conta',
};

export const TARGET_NOUN_GENITIVE: Record<
  ReportContentData['targetType'],
  string
> = {
  POST: 'desse post',
  COMMENT: 'desse comentário',
  ACCOUNT: 'dessa conta',
};

export type ReportStep = 'reasons' | 'details' | 'submitting' | 'success';
