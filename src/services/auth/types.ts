export const SEND_EMAIL_KEY = 'sendEmail';

export interface SendEmailRequest {
  email: string;
}

export interface SendEmailResponse {
  message: string;
  token: string;
}
