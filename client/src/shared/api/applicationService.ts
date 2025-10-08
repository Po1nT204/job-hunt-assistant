import api from './axios';
import { IApplication, IApplicationData } from '../index';

// Мы ожидаем, что в ответ придет созданный отклик
// (хотя мы его пока не будем использовать, тип лучше определить)
interface IApplicationResponse {
  _id: string;
  vacancy: string;
  applicant: string;
  status: string;
  // ... и другие поля
}

export const createApplication = async (
  applicationData: IApplicationData
): Promise<IApplicationResponse> => {
  const { data } = await api.post<IApplicationResponse>(
    '/applications',
    applicationData
  );
  return data;
};

export const getMyApplications = async (): Promise<IApplication[]> => {
  const { data } = await api.get<IApplication[]>('/applications/my');
  return data;
};
