import api from './axios';
import { IVacancy } from '../types/types';

export const getVacancyById = async (id: string): Promise<IVacancy> => {
  const { data } = await api.get<IVacancy>(`/vacancies/${id}`);
  return data;
};
