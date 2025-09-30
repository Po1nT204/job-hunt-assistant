import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  VacanciesPage,
  VacancyCreatePage,
  VacancyDetailPage,
} from '../pages';
import { Header } from '../widgets/Header';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoute } from './providers/ProtectedRoute';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Container component='main' sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/vacancies' element={<VacanciesPage />} />
            <Route path='/vacancies/:id' element={<VacancyDetailPage />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/vacancies/new'
              element={
                <ProtectedRoute>
                  <VacancyCreatePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
        {/* Здесь будет Footer */}
        <ToastContainer position='bottom-right' autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};
