import api from './axios';
import { IVacancy, IVacancyData } from '../types/types';

export const getVacancyById = async (id: string): Promise<IVacancy> => {
  const { data } = await api.get<IVacancy>(`/vacancies/${id}`);
  return data;
};

export const getVacancies = async (): Promise<IVacancy[]> => {
  const { data } = await api.get<IVacancy[]>('/vacancies');
  return data;
};

export const createVacancy = async (
  vacancyData: IVacancyData
): Promise<IVacancy> => {
  const { data } = await api.post<IVacancy>('/vacancies', vacancyData);
  return data;
};
