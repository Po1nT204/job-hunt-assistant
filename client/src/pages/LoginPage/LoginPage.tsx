import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../../app/providers/AuthProvider';
import { login } from '../../shared/api/authService';
import { ILoginData } from '../../shared/types/types';
import api from '../../shared/api/axios';
import { AxiosError } from 'axios';

export const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = async (formData) => {
    try {
      const { token } = await login(formData);
      localStorage.setItem('token', token);

      const { data: userData } = await api.get('/users/me');
      setUser(userData);

      toast.success('Вы успешно вошли!');
      navigate('/vacancies');
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      const errorMessage =
        error.response?.data?.msg || 'Произошла ошибка при входе';
      toast.error(errorMessage);
      console.error(err);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Вход
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            autoComplete='email'
            autoFocus
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Некорректный формат email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
            {...register('password', {
              required: 'Пароль обязателен',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Link component={RouterLink} to='/register' variant='body2'>
            {'Нет аккаунта? Зарегистрироваться'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
