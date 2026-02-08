import { BackendErrorCodes } from '@/types/errors';

export class ReappException extends Error {
  public readonly code: BackendErrorCodes;
  public readonly data?: Record<string, unknown>;
  public readonly status?: number;

  constructor(
    code: BackendErrorCodes,
    message: string,
    status?: number,
    data?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ReappException';
    this.code = code;
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, ReappException.prototype);
  }

  static isReappException(error: unknown): error is ReappException {
    return error instanceof ReappException;
  }

  static isCode(error: unknown, code: BackendErrorCodes): boolean {
    return ReappException.isReappException(error) && error.code === code;
  }
}
