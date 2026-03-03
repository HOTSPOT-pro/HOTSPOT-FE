export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number; // 추후 status로 변경 예정
  code: string;
  message: string;
}
