import { AxiosError } from 'axios';

interface ApiErrorResponse {
  msg: string;
}

export const handleApiError = (err: unknown): string => {
  const error = err as AxiosError<ApiErrorResponse>;
  return (
    error.response?.data?.msg ||
    'Произошла неизвестная ошибка. Попробуйте снова.'
  );
};
