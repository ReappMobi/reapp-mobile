export class ApiResponseError extends Error {
  error: string;
  statusCode: number;
  constructor(error: string, message: string | string[], statusCode: number) {
    super(Array.isArray(message) ? message.join('\n') : message);
    this.error = error;
    this.statusCode = statusCode;
  }
}
