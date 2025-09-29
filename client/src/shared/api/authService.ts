import api from './axios';
import { IRegisterData, IUser } from '../types/types';

interface AuthResponse {
  token: string;
  user: IUser; // Предполагаем, что бэкенд вернет и пользователя
}

export const register = async (
  userData: IRegisterData
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', userData);
  return data;
};
