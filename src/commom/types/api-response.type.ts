export interface ApiResponse<T = object> {
  status: 'success' | 'error';
  data?: T | null;
  message?: string;
}
