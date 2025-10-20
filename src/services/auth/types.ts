export interface SendEmailRequest {
  email: string;
}

export interface SendEmailResponse {
  message: string;
  token: string;
}

export interface SendRecoveryCodeRequest {
  token: string;
  code: string;
}

export interface SendRecoveryCodeResponse {
  token: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResetPasswordResponse {
  message: string;
}
