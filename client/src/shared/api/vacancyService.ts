import api from './axios';
import { IVacancy, IVacancyData } from '../index';

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

export const updateVacancy = async (
  id: string,
  vacancyData: IVacancyData
): Promise<IVacancy> => {
  const { data } = await api.put<IVacancy>(`/vacancies/${id}`, vacancyData);
  return data;
};

export const deleteVacancy = async (id: string): Promise<void> => {
  await api.delete(`/vacancies/${id}`);
};
