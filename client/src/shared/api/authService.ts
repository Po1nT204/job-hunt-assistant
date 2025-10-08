import api from './axios';
import { IRegisterData, ILoginData } from '../index';

interface AuthResponse {
  token: string;
}

export const register = async (
  userData: IRegisterData
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', userData);
  return data;
};

export const login = async (userData: ILoginData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', userData);
  return data;
};
