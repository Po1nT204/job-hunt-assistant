import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  VacanciesPage,
  VacancyDetailPage,
} from '../pages';

export const App = () => {
  return (
    <BrowserRouter>
      {/* Здесь будут Header и Footer из widgets */}
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/vacancies' element={<VacanciesPage />} />
          <Route path='/vacancies/:id' element={<VacancyDetailPage />} />
          {/* Добавь здесь остальные роуты для созданных страниц */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};
