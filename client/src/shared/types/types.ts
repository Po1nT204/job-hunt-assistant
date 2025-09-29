export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'employer';
}

export interface IVacancy {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  company: IUser; // Работодатель
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'employer';
}

export interface ILoginData {
  email: string;
  password: string;
}
