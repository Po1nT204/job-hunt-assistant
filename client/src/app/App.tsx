import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
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
  VacancyEditPage,
} from '../pages';
import { Footer, Header } from '../widgets/index';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoute } from './providers/ProtectedRoute';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
          <CssBaseline />
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
              <Route
                path='/vacancies/:id/edit'
                element={
                  <ProtectedRoute>
                    <VacancyEditPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Footer />
        </Box>
        <ToastContainer position='bottom-right' autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};
