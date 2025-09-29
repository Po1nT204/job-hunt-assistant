import api from './axios';
import { IApplicationData } from '../types/types';

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
