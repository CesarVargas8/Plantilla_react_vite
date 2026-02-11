export interface ErrorResponse {
  error: true;
  message: string;
  type?: number;
  data?: unknown;
}

export interface SuccessResponse<T> {
  error: false;
  message?: string;
  mensaje?: string;
  datos: T;
  data: T;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
